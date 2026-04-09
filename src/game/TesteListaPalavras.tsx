import { useContext, useEffect, useState } from "react";
import { Box, TextField, Typography, List, ListItem } from "@mui/material";
import { AppContext } from "@contexts/AppContext";
// import ModalFimJogos from "@commons/modals/ModalFimJogo";

type Phase = "showing" | "answering";

const TesteListaPalavras = () => {
  const [phase, setPhase] = useState<Phase>("showing");
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // const [openModal, setOpenModal] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const { testeListaPalavras, nivel } =
    useContext(AppContext);
  // const [startDate, setStartDate] = useState<Date>(new Date());
  // const [endDate, setEndDate] = useState<Date>(new Date());
  // const [errors, setErrors] = useState<number>(0);
  // const [openFinishModal, setOpenFinishModal] = useState<boolean>(false);

  useEffect(() => {
    const palavrasObj = testeListaPalavras.filter(
      (item) => item.nivel === nivel,
    )[0];
    setSelectedWords(palavrasObj ? palavrasObj.palavras : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Controla a exibição das palavras (2 segundos cada)
  useEffect(() => {
    if (selectedWords.length > 0) {
      if (phase !== "showing") return;

      if (currentIndex >= selectedWords.length) {
        setPhase("answering");
        return;
      }

      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, phase, selectedWords]);

  // useEffect(() => {
  //   if (answers.length === 10) {
  //     if (nivel === "facil") {
  //       setOpenModal(true);
  //       setNivel("medio");
  //     } else if (nivel === "medio") {
  //       setOpenModal(true);
  //       setNivel("dificil");
  //     } else if (nivel === "dificil") {
  //       // setOpenFinishModal(true);
  //     }
  //   }
  // }, [answers]);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setAnswers((prev) => [...prev, inputValue.trim().toLowerCase()]);
      setInputValue("");
    }
  };

  const isCorrect = (word: string) =>
    selectedWords.includes(word.toLowerCase());

  return (
    <Box sx={style.container}>
      <Box sx={style.title}>
        <Typography variant="h4">
          Teste Lista de Palavras - Nível {nivel}
        </Typography>
      </Box>
      {phase === "showing" && (
        <Typography variant="h4">{selectedWords[currentIndex]}</Typography>
      )}

      {phase === "answering" && (
        <>
          <TextField
            fullWidth
            label="Digite as palavras lembradas"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleSubmit}
            sx={{ mb: 2 }}
          />

          <List sx={style.listItem}>
            {answers.map((answer, index) => (
              <ListItem
                key={index}
                sx={isCorrect(answer) ? style.correct : style.wrong}
              >
                {answer}
              </ListItem>
            ))}
          </List>
        </>
      )}
      {/* <ModalFimJogos
        isOpen={openFinishModal}
        onClose={() => setOpenFinishModal(false)}
        endTime={endDate}
        startTime={startDate}
        gameName={selectedJogo.nome}
        erros={errors}
      /> */}
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
    gap: 2,
  },
  title: {
    backgroundColor: "#cb6ce6",
    p: 2,
    color: "white",
    borderRadius: 8,
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
  correct: {
    border: "1px solid green",
    borderRadius: "16px",
    color: "green",
    fontWeight: "bold",
    fontsize: 16,
  },
  wrong: {
    border: "1px solid red",
    borderRadius: "16px",
    color: "red",
    fontWeight: "bold",
    fontsize: 16,
  },
};

export default TesteListaPalavras;
