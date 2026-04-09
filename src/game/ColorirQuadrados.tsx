import React, { useContext, useEffect, useState } from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";
import { Box, Button, Typography } from "@mui/material";
import Toast from "@commons/Toast";
import ModalInfoJogos from "../commons/modals/ModalInfoJogo";
import { AppContext } from "@contexts/AppContext";
import ModalFimJogos from "@commons/modals/ModalFimJogo";

const CELL_SIZE = 50;
const OFFSET_X = 50;
const OFFSET_Y = 50;

const colors = ["yellow", "red", "blue", "green"];

const ColorirQuadrados = () => {
  const { selectedJogo, nivel, setNivel } = useContext(AppContext);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openFinishModal, setOpenFinishModal] = useState<boolean>(false);
  const [model, setModel] = useState<(string | null)[][]>([]);
  const [grid, setGrid] = useState<(string | null)[][]>([]);
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [errors, setErrors] = useState<number>(0);
  const [dragColor, setDragColor] = useState<string | null>(null);

  const clearGrid = () => {
    setErrors((prev) => prev + 1);
    setGrid(
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => null),
      ),
    );
  };

  const generateRandomModel = () => {
    const colors = ["yellow", "red", "blue", "green"];

    const newModel: (string | null)[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => null),
    );

    const blocks = Math.floor(rows + Math.random() * rows);
    let startRow = Math.floor(Math.random() * rows);
    let startCol = Math.floor(Math.random() * cols);

    const used = new Set<string>();
    const queue: [number, number][] = [[startRow, startCol]];

    used.add(`${startRow}-${startCol}`);

    newModel[startRow][startCol] =
      colors[Math.floor(Math.random() * colors.length)];

    while (used.size < blocks && queue.length > 0) {
      const [r, c] = queue[Math.floor(Math.random() * queue.length)];

      const neighbors = [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1],
      ];

      const validNeighbors = neighbors.filter(([nr, nc]) => {
        return (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          !used.has(`${nr}-${nc}`)
        );
      });

      if (validNeighbors.length === 0) continue;

      const [nr, nc] =
        validNeighbors[Math.floor(Math.random() * validNeighbors.length)];

      used.add(`${nr}-${nc}`);

      newModel[nr][nc] = colors[Math.floor(Math.random() * colors.length)];

      queue.push([nr, nc]);
    }

    setModel(newModel);
    setGrid(
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => null),
      ),
    );
  };

  // ===== DROP =====
  const handleDrop = (row: number, col: number) => {
    if (!dragColor) return;

    // 🚫 impede pintar fora do modelo
    if (!model[row] || model[row][col] === null) setErrors((prev) => prev + 1);

    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] = dragColor;

    setGrid(newGrid);
  };

  const validate = () => {
    let errors = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const modelCell = model[r][c];
        const userCell = grid[r][c];

        if (modelCell !== null) {
          if (userCell !== modelCell) {
            errors++;
            setMessage("Ops, os padrões estão diferentes!");
            setShowAlert(true);
            return false;
          }
        }

        if (modelCell === null && userCell !== null) {
          errors++;
          setMessage("Ops, os padrões estão diferentes!");
          setShowAlert(true);
          return false;
        }
      }
    }

    if (nivel === "facil") {
      setOpenModal(true);
      setNivel("medio");
      generateRandomModel();
      clearGrid();
    } else if (nivel === "medio") {
      setOpenModal(true);
      setNivel("dificil");
      generateRandomModel();
      clearGrid();
    } else if (nivel === "dificil") {
      setErrors(errors);
      setEndTime(new Date());
      setOpenFinishModal(true);
    }

    return true;
  };

  useEffect(() => {
    const selectedLevel: Record<string, number> = {
      facil: 4,
      medio: 6,
      dificil: 8,
    };

    const rows = selectedLevel[nivel] || 4;
    const cols = selectedLevel[nivel] || 4;
    setRows(rows);
    setCols(cols);
    if (rows > 0 && cols > 0) {
      setStartTime(new Date());
      generateRandomModel();
    }
  }, []);

  return (
    <Box sx={style.container}>
      <Box sx={style.title}>
        <Typography variant="h4">Colorindo Quadrados - {nivel}</Typography>
      </Box>

      <Stage width={550} height={400}>
        <Layer>
          {/* ===== MODELO ===== */}
          {model.map((row, r) =>
            row.map((color, c) => (
              <Rect
                key={`model-${r}-${c}`}
                x={OFFSET_X + c * CELL_SIZE}
                y={OFFSET_Y + r * CELL_SIZE}
                width={CELL_SIZE}
                height={CELL_SIZE}
                fill={color || "white"} // 👈 aqui está o segredo
                stroke="black"
              />
            )),
          )}

          {/* ===== GRID VAZIO ===== */}
          {grid.map((row, r) =>
            row.map((color, c) => (
              <Rect
                key={`play-${r}-${c}`}
                x={OFFSET_X + 250 + c * CELL_SIZE}
                y={OFFSET_Y + r * CELL_SIZE}
                width={CELL_SIZE}
                height={CELL_SIZE}
                fill={color || "white"}
                stroke="black"
                onMouseUp={() => handleDrop(r, c)}
              />
            )),
          )}

          {/* ===== PALETA ===== */}
          {colors.map((color, i) => (
            <Circle
              key={color}
              x={150 + i * 80}
              y={350}
              radius={20}
              fill={color}
              draggable
              onDragStart={() => setDragColor(color)}
              onDragEnd={(e) => {
                const pos = e.target.position();

                const gridX = pos.x - (OFFSET_X + 250);
                const gridY = pos.y - OFFSET_Y;

                const col = Math.floor(gridX / CELL_SIZE);
                const row = Math.floor(gridY / CELL_SIZE);

                if (row >= 0 && row < rows && col >= 0 && col < cols) {
                  handleDrop(row, col);
                }

                // volta o círculo pro lugar
                e.target.position({ x: 150 + i * 80, y: 350 });
                setDragColor(null);
              }}
            />
          ))}
        </Layer>
      </Stage>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="success" onClick={() => validate()}>
          Enviar
        </Button>
        <Button variant="contained" color="error" onClick={() => clearGrid()}>
          Limpar
        </Button>
      </Box>
      <Toast
        open={showAlert}
        text={message}
        onClose={() => setShowAlert(false)}
        backgroundColor="#FFE55D"
      />
      <ModalInfoJogos
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        path={selectedJogo.path}
        sobre={
          selectedJogo.niveis.find((item) => item.nivel === nivel)?.sobre ?? ""
        }
      />
      <ModalFimJogos
        isOpen={openFinishModal}
        onClose={() => {
          setOpenFinishModal(false);
        }}
        endTime={endTime}
        startTime={startTime}
        erros={errors}
        gameName={selectedJogo.nome}
      />
    </Box>
  );
};

const style = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    backgroundColor: "#cb6ce6",
    p: 2,
    color: "white",
    borderRadius: 8,
  },
};

export default ColorirQuadrados;
