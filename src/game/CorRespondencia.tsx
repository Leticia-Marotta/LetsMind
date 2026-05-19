import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { AppContext } from "@contexts/AppContext";
import Toast from "@commons/Toast";
import ModalInfoJogos from "@commons/modals/ModalInfoJogo";
import ModalFimJogos from "@commons/modals/ModalFimJogo";

type ColorType = "black" | "yellow" | "red" | "blue";

interface RoundItem {
  left: ColorType;
  word: ColorType;
  color: ColorType;
  isMatch: boolean;
}

const COLORS: ColorType[] = ["black", "yellow", "red", "blue"];

const getRandom = () => COLORS[Math.floor(Math.random() * COLORS.length)];
const CorRespondencia = () => {
  const { nivel, setNivel, selectedJogo } = useContext(AppContext);
  const [round, setRound] = useState<RoundItem[]>([]);
  const [index, setIndex] = useState(0);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openFinishModal, setOpenFinishModal] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [errors, setErrors] = useState<number>(0);

  // ===== GERAR RODADA =====

  const translate = (color: string) => {
    switch (color) {
      case "black":
        return "preto";
      case "yellow":
        return "amarelo";
      case "red":
        return "vermelho";
      case "blue":
        return "azul";
    }
  };

  const generateRound = () => {
    const selectedLevel: Record<string, number> = {
      facil: 4,
      medio: 6,
      dificil: 8,
    };
    const size = selectedLevel[nivel];

    const newRound: RoundItem[] = [];

    for (let i = 0; i < size; i++) {
      const left = getRandom();
      const word = getRandom();
      const color = getRandom();

      newRound.push({
        left,
        word,
        color,
        isMatch: left === color,
      });
    }

    setRound(newRound);
    setIndex(0);
  };

  useEffect(() => {
    setStartDate(new Date())
    generateRound();
  }, [nivel]);

  const current = round[index];

  // ===== RESPOSTA =====
  const handleAnswer = (answer: boolean) => {
    if (!current) return;

    if (answer !== current.isMatch) {
      setShowAlert(true);
      setErrors((prev) => prev + 1);
    }

    // próxima palavra
    if (index < round.length - 1) {
      setIndex(index + 1);
    } else {
      if (nivel === "facil") {
        setOpenModal(true);
        setNivel("medio");
      } else if (nivel === "medio") {
        setOpenModal(true);
        setNivel("dificil");
      } else if (nivel === "dificil") {
        setOpenFinishModal(true);
        setEndDate(new Date());
      }

      generateRound();
    }
  };

  if (!current) return null;

  return (
    <Box sx={style.container}>
      <Box sx={style.title}>
        <Typography variant="h4">Cor - respondência - {nivel}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          mb: 5,
        }}
      >
        {/* ESQUERDA */}
        <Typography variant="h3" color="black">
          {translate(current.left)?.toUpperCase()}
        </Typography>

        {/* DIREITA */}
        <Typography variant="h3" sx={{ color: current.color }}>
          {translate(current.word)?.toUpperCase()}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleAnswer(true)}
        >
          Correto
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => handleAnswer(false)}
        >
          Errado
        </Button>
      </Box>
      <Toast
        open={showAlert}
        text={"Ops, resposta incorreta!"}
        onClose={() => setShowAlert(false)}
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
};

const style = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  title: {
    backgroundColor: "#cb6ce6",
    p: 2,
    color: "white",
    borderRadius: 8,
  },
};

export default CorRespondencia;
