import ModalFimJogos from "@commons/modals/ModalFimJogo";
import ModalInfoJogos from "@commons/modals/ModalInfoJogo";
import Toast from "@commons/Toast";
import { AppContext } from "@contexts/AppContext";

import {
  Box,
  Typography,
  Button,
} from "@mui/material";

import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Stage,
  Layer,
  Line,
  Circle,
} from "react-konva";

const SIZE = 250;
const GAP = 100;

const STAGE_WIDTH = 900;
const STAGE_HEIGHT = SIZE + 150;

type Point = {
  x: number;
  y: number;
};

export default function SquareLineGame() {
  const {
    nivel,
    setNivel,
    selectedJogo,
  } = useContext(AppContext);

  const [showAlert, setShowAlert] =
    useState<boolean>(false);

  const [openModal, setOpenModal] =
    useState<boolean>(false);

  const [startDate, setStartDate] =
    useState<Date>(new Date());

  const [endDate, setEndDate] =
    useState<Date>(new Date());

  const [errors, setErrors] =
    useState<number>(0);

  const [
    openFinishModal,
    setOpenFinishModal,
  ] = useState<boolean>(false);

  const stageRef = useRef<any>(null);

  // ===== NÍVEIS =====
  const levelMap: Record<
    string,
    number
  > = {
    facil: 4,
    medio: 6,
    dificil: 8,
  };

  const CONNECTED_LINES =
    levelMap[nivel] ?? 4;

  const POINTS_PER_SIDE = 6;

  // ===== CENTRALIZAÇÃO =====
  const TOTAL_WIDTH =
    SIZE * 2 + GAP;

  const START_X =
    (STAGE_WIDTH - TOTAL_WIDTH) / 2;

  const START_Y =
    (STAGE_HEIGHT - SIZE) / 2;

  // ===== GERAR PONTOS =====
  const generateBorderPoints = (
    x: number,
    y: number,
    pointsPerSide: number,
  ): Point[] => {
    const step =
      SIZE / (pointsPerSide - 1);

    const pts: Point[] = [];

    // topo
    for (
      let i = 0;
      i < pointsPerSide;
      i++
    ) {
      pts.push({
        x: x + i * step,
        y,
      });
    }

    // direita
    for (
      let i = 1;
      i < pointsPerSide - 1;
      i++
    ) {
      pts.push({
        x: x + SIZE,
        y: y + i * step,
      });
    }

    // baixo
    for (
      let i = pointsPerSide - 1;
      i >= 0;
      i--
    ) {
      pts.push({
        x: x + i * step,
        y: y + SIZE,
      });
    }

    // esquerda
    for (
      let i = pointsPerSide - 2;
      i > 0;
      i--
    ) {
      pts.push({
        x,
        y: y + i * step,
      });
    }

    return pts;
  };

  const modelPoints =
    generateBorderPoints(
      START_X,
      START_Y,
      POINTS_PER_SIDE,
    );

  const playPoints =
    generateBorderPoints(
      START_X + SIZE + GAP,
      START_Y,
      POINTS_PER_SIDE,
    );

  // ===== GERAR LINHAS =====
  const generateConnectedLines = (
    points: Point[],
  ): [number, number][] => {
    const lines: [
      number,
      number,
    ][] = [];

    const used = new Set<number>();

    let current = Math.floor(
      Math.random() * points.length,
    );

    used.add(current);

    let attempts = 0;

    while (
      lines.length < CONNECTED_LINES &&
      attempts < 1000
    ) {
      let next = Math.floor(
        Math.random() * points.length,
      );

      if (used.has(next)) {
        attempts++;
        continue;
      }

      lines.push([current, next]);

      used.add(next);

      current = next;
    }

    return lines;
  };

  const [
    modelLines,
    setModelLines,
  ] = useState<[number, number][]>(
    [],
  );

  const [lines, setLines] = useState<
    [number, number][]
  >([]);

  const [tempLine, setTempLine] =
    useState<{
      startIndex: number;
      start: Point;
      current?: Point;
    } | null>(null);

  // ===== RESET / NOVO DESENHO =====
  const generateNewGame = () => {
    setModelLines(
      generateConnectedLines(
        modelPoints,
      ),
    );

    setLines([]);
    setTempLine(null);
  };

  useEffect(() => {
    setStartDate(new Date());

    generateNewGame();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nivel]);

  // ===== INTERAÇÃO =====
  const startLine = (
    idx: number,
  ) => {
    setTempLine({
      startIndex: idx,
      start: playPoints[idx],
    });
  };

  const moveLine = () => {
    if (
      !stageRef.current ||
      !tempLine
    )
      return;

    const pos =
      stageRef.current.getPointerPosition();

    if (!pos) return;

    setTempLine({
      ...tempLine,
      current: {
        x: pos.x,
        y: pos.y,
      },
    });
  };

  const endLine = (
    idx: number,
  ) => {
    if (!tempLine) return;

    // não permite mesma bolinha
    if (idx === tempLine.startIndex) {
      setTempLine(null);
      return;
    }

    // evita linhas duplicadas
    const normalizedNew =
      normalizeLine([
        tempLine.startIndex,
        idx,
      ]);

    const alreadyExists =
      lines.some(
        (line) =>
          normalizeLine(line) ===
          normalizedNew,
      );

    if (alreadyExists) {
      setTempLine(null);

      setShowAlert(true);

      return;
    }

    setLines((prev) => [
      ...prev,
      [tempLine.startIndex, idx],
    ]);

    setTempLine(null);
  };

  // ===== NORMALIZAÇÃO =====
  const normalizeLine = (
    [a, b]: [number, number],
  ) => {
    return a < b
      ? `${a}-${b}`
      : `${b}-${a}`;
  };

  // ===== VALIDAÇÃO =====
  const validateLines = () => {
    let localErrors = 0;

    // quantidade diferente
    if (
      lines.length !==
      modelLines.length
    ) {
      localErrors++;
    }

    const modelSet = new Set(
      modelLines.map(normalizeLine),
    );

    const userSet = new Set(
      lines.map(normalizeLine),
    );

    // compara tamanho
    if (
      modelSet.size !== userSet.size
    ) {
      localErrors++;
    }

    // compara linhas
    Array.from(modelSet).forEach(
      (item) => {
        if (!userSet.has(item)) {
          localErrors++;
        }
      },
    );

    // contabiliza
    if (localErrors > 0) {
      setErrors(
        (prev) =>
          prev + localErrors,
      );

      setShowAlert(true);

      return;
    }

    // níveis
    if (nivel === "facil") {
      setOpenModal(true);
      setNivel("medio");
    } else if (
      nivel === "medio"
    ) {
      setOpenModal(true);
      setNivel("dificil");
    } else {
      setEndDate(new Date());
      setOpenFinishModal(true);
    }
  };

  // ===== LIMPAR =====
  const handleClear = () => {
    setLines([]);

    setTempLine(null);

    setErrors((prev) => prev + 1);
  };

  // ===== REFRESH =====
  const handleRefresh = () => {
    generateNewGame();
    setErrors((prev) => prev + 1);
  };

  return (
    <Box sx={style.container}>
      <Box sx={style.title}>
        <Typography variant="h4">
          Reprodução de Padrão -
          {nivel}
        </Typography>
      </Box>

      <Stage
        ref={stageRef}
        width={STAGE_WIDTH}
        height={STAGE_HEIGHT}
        onPointerMove={moveLine}
      >
        <Layer>
          {/* MODELO */}
          {modelLines.map(
            ([a, b], i) => (
              <Line
                key={i}
                points={[
                  modelPoints[a].x,
                  modelPoints[a].y,
                  modelPoints[b].x,
                  modelPoints[b].y,
                ]}
                stroke="red"
                strokeWidth={3}
              />
            ),
          )}

          {modelPoints.map(
            (p, i) => (
              <Circle
                key={i}
                x={p.x}
                y={p.y}
                radius={5}
                fill="black"
              />
            ),
          )}

          {/* JOGO */}
          {lines.map(
            ([a, b], i) => (
              <Line
                key={i}
                points={[
                  playPoints[a].x,
                  playPoints[a].y,
                  playPoints[b].x,
                  playPoints[b].y,
                ]}
                stroke="red"
                strokeWidth={3}
              />
            ),
          )}

          {/* TEMP */}
          {tempLine &&
            tempLine.current && (
              <Line
                points={[
                  tempLine.start.x,
                  tempLine.start.y,
                  tempLine.current.x,
                  tempLine.current.y,
                ]}
                stroke="red"
                strokeWidth={3}
                dash={[6, 4]}
              />
            )}

          {/* PONTOS */}
          {playPoints.map(
            (p, i) => (
              <Circle
                key={i}
                x={p.x}
                y={p.y}
                radius={6}
                fill="black"
                onPointerDown={() =>
                  startLine(i)
                }
                onPointerUp={() =>
                  endLine(i)
                }
              />
            ),
          )}
        </Layer>
      </Stage>

      <Box sx={style.buttons}>
        <Button
          variant="contained"
          color="warning"
          onClick={handleRefresh}
        >
          Refresh
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleClear}
        >
          Limpar
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={validateLines}
        >
          Enviar
        </Button>
      </Box>

      <Toast
        open={showAlert}
        text={
          "Ops, os padrões estão diferentes!"
        }
        onClose={() =>
          setShowAlert(false)
        }
        backgroundColor="#FFE55D"
      />

      <ModalInfoJogos
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        path={selectedJogo.path}
      />

      <ModalFimJogos
        isOpen={openFinishModal}
        onClose={() => {
          setOpenFinishModal(false);
        }}
        endTime={endDate}
        startTime={startDate}
        erros={errors}
        dicaFonetica={0}
        dicaSemantica={0}
      />
    </Box>
  );
}

const style = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  title: {
    backgroundColor: "#cb6ce6",
    p: 2,
    color: "white",
    borderRadius: 8,
  },

  buttons: {
    display: "flex",
    gap: 2,
  },
};