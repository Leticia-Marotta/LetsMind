import ModalFimJogos from "@commons/modals/ModalFimJogo";
import ModalInfoJogos from "@commons/modals/ModalInfoJogo";
import Toast from "@commons/Toast";
import { AppContext } from "@contexts/AppContext";
import { Box, Typography } from "@mui/material";
import { useEffect, useState, useRef, useContext } from "react";
import { Stage, Layer, Text, Line } from "react-konva";

type Point = { x: number; y: number };

const TesteTrilhas = () => {
  const { nivel, setNivel, selectedJogo } = useContext(AppContext);
  const [points, setPoints] = useState<Point[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lines, setLines] = useState<[Point, Point][]>([]);
  const [tempLine, setTempLine] = useState<Point[]>([]);
  const [order, setOrder] = useState<string[]>(["A"]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [erros, setErros] = useState<number>(0);
  const [letters, setLetters] = useState<string[]>([]);
  const stageRef = useRef<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openFinishModal, setOpenFinishModal] = useState<boolean>(false);
  const [path, setPath] = useState<string>(selectedJogo.path);

  const clear = () => {
    setCurrentIndex(0);
    setLines([]);
    setPoints([]);
    setOrder(["A"]);
  };

  useEffect(() => {
    if (order.toString() === letters.toString()) {
      clear();
      setEndTime(new Date());
      if (nivel === "facil") {
        setOpenModal(true);
        setNivel("medio");
      } else if (nivel === "medio") {
        setOpenModal(true);
        setNivel("dificil");
      } else if (nivel === "dificil") {
        setEndTime(new Date());
        setOpenFinishModal(true);
      }
    }
  }, [order]);

  useEffect(() => {
    switch (nivel) {
      case "facil":
        setLetters(["A", "B", "C", "D", "E", "F", "G", "H"]);
        break;
      case "medio":
        setLetters(["A", "1", "B", "2", "C", "3", "D", "4", "E", "5"]);
        break;
      case "dificil":
        setLetters([
          "A",
          "1",
          "B",
          "2",
          "C",
          "3",
          "D",
          "4",
          "E",
          "5",
          "F",
          "6",
          "G",
          "7",
          "H",
          "8",
          "I",
          "9",
          "J",
          "10",
        ]);
        break;
    }
  }, [nivel]);

  useEffect(() => {
    const minDistance = 60;
    const maxAttempts = 100;
    setStartTime(new Date());
    const generatePoint = (existing: Point[]) => {
      let attempts = 0;

      while (attempts < maxAttempts) {
        const newPoint = {
          x: Math.random() * 600 + 50,
          y: Math.random() * 400 + 50,
        };

        const isTooClose = existing.some((p) => {
          const dx = p.x - newPoint.x;
          const dy = p.y - newPoint.y;
          return Math.sqrt(dx * dx + dy * dy) < minDistance;
        });

        if (!isTooClose) return newPoint;
        attempts++;
      }

      return { x: Math.random() * 600 + 50, y: Math.random() * 400 + 50 };
    };

    const newPoints: Point[] = [];
    letters.forEach(() => {
      newPoints.push(generatePoint(newPoints));
    });

    setPoints(newPoints);
  }, [letters]);

  const startLine = (idx: number) => {
    if (idx === currentIndex) {
      setTempLine([points[idx]]);
    }
  };

  const moveLine = () => {
    if (!stageRef.current || tempLine.length === 0) return;

    const pos = stageRef.current.getPointerPosition();
    if (!pos) return;

    setTempLine([tempLine[0], { x: pos.x, y: pos.y }]);
  };

  const endLine = (idx: number) => {
    if (tempLine.length === 0) return;
    if (idx === currentIndex + 1) {
      setLines([...lines, [tempLine[0], points[idx]]]);
      setCurrentIndex(currentIndex + 1);
      setOrder([...order, letters[idx].toString()]);
    } else {
      setShowAlert(true);
      setErros((prev) => prev + 1);
    }
    setTempLine([]);
  };

  return (
    <Box sx={style.container}>
      <Box sx={style.title}>
        <Typography variant="h4">Teste de Trilhas - Nível {nivel}</Typography>
      </Box>
      <Stage
        ref={stageRef}
        width={800}
        height={500}
        onPointerMove={moveLine}
        style={{ alignContent: "center" }}
      >
        <Layer listening>
          {/* Linhas permanentes */}
          {lines.map(([p1, p2], i) => (
            <Line
              key={i}
              points={[p1.x, p1.y, p2.x, p2.y]}
              stroke="#cb6ce6"
              strokeWidth={4}
              tension={0.3}
            />
          ))}

          {/* Linha temporária durante o arraste */}
          {tempLine.length === 2 && (
            <Line
              points={[
                tempLine[0].x,
                tempLine[0].y,
                tempLine[1].x,
                tempLine[1].y,
              ]}
              stroke="#cb6ce6"
              strokeWidth={3}
              lineCap="round"
              lineJoin="round"
              tension={0.5}
            />
          )}

          {/* Letras */}
          {points.map((pt, i) => (
            <Text
              key={i}
              text={letters[i]}
              x={pt.x}
              y={pt.y}
              fontSize={34}
              fill={i === currentIndex ? "#cb6ce6" : "black"}
              offsetX={12}
              offsetY={12}
              onPointerDown={() => startLine(i)}
              onPointerUp={() => endLine(i)}
              listening
            />
          ))}
        </Layer>
      </Stage>
      <Toast
        open={showAlert}
        text={`Parece que você escolheu a letra errada, vamos tentar de novo? Que letra vem depois da ${letters[currentIndex]}?`}
        onClose={() => setShowAlert(false)}
        backgroundColor="#FFE55D"
      />
      <ModalInfoJogos
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        path={path}
        sobre={
          selectedJogo.niveis.find((item) => item.nivel === nivel)?.sobre ?? ""
        }
      />
      <ModalFimJogos
        endTime={endTime}
        startTime={startTime}
        isOpen={openFinishModal}
        onClose={() => {
          setOpenFinishModal(false);
        }}
        gameName={selectedJogo.nome}
        erros={erros}
      />
    </Box>
  );
};

const style = {
  container: {
    justifyContent: "center",
    alignContent: "center",
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

export default TesteTrilhas;
