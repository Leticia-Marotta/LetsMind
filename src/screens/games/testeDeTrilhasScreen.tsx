// import ModalFimJogos from "@commons/modals/ModalFimJogo";
// import ModalInfoJogos from "@commons/modals/ModalInfoJogo";
"use client";
import { Box, Button, Typography } from "@mui/material";

import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

import { useEffect, useState, useRef, useContext } from "react";

import { Stage, Layer, Text, Line } from "react-konva";
import { AppContext } from "@/src/contexts/AppContext";
import { ArrowBack } from "@mui/icons-material";
import Link from "next/link";

type Point = {
  x: number;
  y: number;
};

const TesteTrilhas = () => {
  const { nivel, setNivel } = useContext(AppContext);

  const [points, setPoints] = useState<Point[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lines, setLines] = useState<[Point, Point][]>([]);
  const [tempLine, setTempLine] = useState<Point[]>([]);
  const [order, setOrder] = useState<string[]>(["A"]);
  const [letters, setLetters] = useState<string[]>([]);
  const stageRef = useRef<any>(null);
  // usar para gerar relatório
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [erros, setErros] = useState<number>(0);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openFinishModal, setOpenFinishModal] = useState<boolean>(false);

  const generatePoints = () => {
    const minDistance = 60;
    const maxAttempts = 100;

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

        if (!isTooClose) {
          return newPoint;
        }

        attempts++;
      }

      return {
        x: Math.random() * 600 + 50,
        y: Math.random() * 400 + 50,
      };
    };

    const newPoints: Point[] = [];

    letters.forEach(() => {
      newPoints.push(generatePoint(newPoints));
    });

    setPoints(newPoints);
  };

  // Preciso corrigir essa função
  const clear = () => {
    setCurrentIndex(0);
    setLines([]);
    setOrder(["A"]);

    generatePoints();

    setStartTime(new Date());
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
    setStartTime(new Date());
    generatePoints();
  }, [letters]);

  const startLine = (idx: number) => {
    if (idx === currentIndex) {
      setTempLine([points[idx]]);
    }
  };

  const moveLine = () => {
    if (!stageRef.current || tempLine.length === 0) {
      return;
    }

    const pos = stageRef.current.getPointerPosition();

    if (!pos) {
      return;
    }

    setTempLine([
      tempLine[0],
      {
        x: pos.x,
        y: pos.y,
      },
    ]);
  };

  const endLine = (idx: number) => {
    if (tempLine.length === 0) {
      return;
    }

    if (idx === currentIndex + 1) {
      setLines([...lines, [tempLine[0], points[idx]]]);

      setCurrentIndex(currentIndex + 1);

      setOrder([...order, letters[idx].toString()]);
    } else {
      setErros((prev) => prev + 1);
    }

    setTempLine([]);
  };

  return (
    <Box sx={style.page}>
      <Box sx={style.header}>
        <Link href="/home">
          <Box sx={style.returnButton}>
            <ArrowBack sx={{ color: "#cb6ce6" }} />
            <Typography sx={style.levelText}>Voltar</Typography>
          </Box>
        </Link>
        <Typography sx={style.title}>Teste de Trilhas</Typography>
        <Box sx={style.levelBadge}>
          <Typography sx={style.levelText}>Nível {nivel}</Typography>
        </Box>
      </Box>

      <Box sx={style.instructionCard}>
        <Typography sx={style.instructionTitle}>Como jogar?</Typography>

        <Typography sx={style.instructionText}>
          Conecte os elementos na ordem correta, seguindo a sequência alfabética
          ou alfanumérica.
        </Typography>
      </Box>

      <Box sx={style.gameCard}>
        <Box sx={style.gameHeader}>
          <Typography sx={style.gameTitle}>Conecte as letras</Typography>

          <Button
            onClick={clear}
            startIcon={<RestartAltRoundedIcon />}
            sx={style.restartButton}
          >
            Reiniciar
          </Button>
        </Box>

        <Box sx={style.canvasWrapper}>
          <Box sx={style.canvasContainer}>
            <Stage
              ref={stageRef}
              width={800}
              height={500}
              onPointerMove={moveLine}
              style={{
                display: "block",
              }}
            >
              <Layer listening>
                {lines.map(([p1, p2], i) => (
                  <Line
                    key={i}
                    points={[p1.x, p1.y, p2.x, p2.y]}
                    stroke="#cb6ce6"
                    strokeWidth={4}
                    tension={0.3}
                    lineCap="round"
                    lineJoin="round"
                  />
                ))}

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

                {points.map((pt, i) => (
                  <Text
                    key={i}
                    text={letters[i]}
                    x={pt.x}
                    y={pt.y}
                    fontSize={34}
                    fontStyle={i === currentIndex ? "bold" : "normal"}
                    fill={i === currentIndex ? "#cb6ce6" : "#222222"}
                    offsetX={12}
                    offsetY={12}
                    onPointerDown={() => startLine(i)}
                    onPointerUp={() => endLine(i)}
                    listening
                  />
                ))}
              </Layer>
            </Stage>
          </Box>
        </Box>
      </Box>

      {/*
      <ModalInfoJogos
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        path={selectedJogo.path}
      />


      <ModalFimJogos
        endTime={endTime}
        startTime={startTime}
        isOpen={openFinishModal}
        onClose={() => {
          setOpenFinishModal(false);
        }}
        erros={erros}
        dicaFonetica={0}
        dicaSemantica={0}
      /> */}
    </Box>
  );
};

const style = {
  page: {
    minHeight: "100vh",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#F3EEFA",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: {
      xs: 2,
      sm: 3,
      md: 4,
    },
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1.5,
    flexWrap: "wrap",
    marginBottom: 2.5,
  },

  title: {
    backgroundColor: "#cb6ce6",
    color: "#FFFFFF",
    padding: "10px 30px",
    borderRadius: "8px",
    fontSize: {
      xs: "26px",
      sm: "30px",
      md: "34px",
    },
    fontWeight: 600,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
  },

  returnButton: {
    display: "flex",
    gap: 1,
    backgroundColor: "#FFFFFF",
    border: "1px solid #D8C5E8",
    borderRadius: "8px",
    padding: "9px 18px",
    boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.08)",
  },

  levelBadge: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #D8C5E8",
    borderRadius: "8px",
    padding: "9px 18px",
    boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.08)",
  },

  levelText: {
    color: "#cb6ce6",
    fontSize: {
      xs: "14px",
      sm: "16px",
    },
    fontWeight: 600,
  },

  instructionCard: {
    width: "100%",
    maxWidth: "900px",
    boxSizing: "border-box",
    backgroundColor: "#FFFFFF",
    border: "1px solid #D8C5E8",
    borderRadius: "12px",
    padding: {
      xs: 2,
      sm: 2.5,
    },
    marginBottom: 2.5,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)",
  },

  instructionTitle: {
    color: "#cb6ce6",
    fontSize: "17px",
    fontWeight: 600,
    marginBottom: 0.5,
  },

  instructionText: {
    color: "#444",
    fontSize: {
      xs: "14px",
      sm: "15px",
    },
    lineHeight: 1.5,
  },

  gameCard: {
    width: "100%",
    maxWidth: "900px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #D8C5E8",
    borderRadius: "16px",
    padding: {
      xs: 1.5,
      sm: 2,
      md: 2.5,
    },
    boxSizing: "border-box",
    boxShadow: "0px 5px 12px rgba(0, 0, 0, 0.12)",
  },

  gameHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    marginBottom: 1.5,
    paddingLeft: 0.5,
    paddingRight: 0.5,
  },

  gameTitle: {
    color: "#222",
    fontSize: {
      xs: "17px",
      sm: "19px",
    },
    fontWeight: 600,
  },

  restartButton: {
    color: "#cb6ce6",
    border: "1px solid #cb6ce6",
    borderRadius: "8px",
    textTransform: "none",
    fontSize: "14px",
    padding: "6px 12px",
    "&:hover": {
      backgroundColor: "#F8EEFC",
    },
  },

  canvasWrapper: {
    width: "100%",
    overflowX: "auto",
    overflowY: "hidden",
    borderRadius: "12px",
    backgroundColor: "#FCFAFE",
    border: "1px solid #EEE5F5",
    display: "flex",
    justifyContent: "center",
  },

  canvasContainer: {
    width: "800px",
    minWidth: "800px",
    height: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default TesteTrilhas;
