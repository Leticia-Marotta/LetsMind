import { useContext, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  Button,
} from "@mui/material";

import { AppContext } from "@contexts/AppContext";
import ModalInfoJogos from "@commons/modals/ModalInfoJogo";
import ModalFimJogos from "@commons/modals/ModalFimJogo";

type Phase = "idle" | "showing" | "answering";

const WORDS_PER_GAME = 5;

const TesteListaPalavras = () => {
  const { testeListaPalavras, nivel, setNivel } = useContext(AppContext);

  const [phase, setPhase] = useState<Phase>("idle");

  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [openFimJogo, setOpenFimJogo] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>("");

  const [answers, setAnswers] = useState<string[]>([]);

  const [startDate, setStartDate] = useState<Date>(new Date());

  const [endDate, setEndDate] = useState<Date>(new Date());

  const [errors, setErrors] = useState<number>(0);

  /**
   * Embaralha array
   */
  const shuffleArray = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  /**
   * Remove acentos
   */
  const normalizeText = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  };

  /**
   * Seleciona 5 palavras aleatórias
   */
  const generateWords = () => {
    const palavrasObj = testeListaPalavras.find((item) => item.nivel === nivel);

    if (!palavrasObj) return;

    const shuffled = shuffleArray(palavrasObj.palavras);

    const randomWords = shuffled.slice(0, WORDS_PER_GAME);

    setSelectedWords(randomWords);

    // reset
    setCurrentIndex(0);
    setAnswers([]);
    setInputValue("");
    setPhase("idle");
  };

  /**
   * Gera palavras ao trocar nível
   */
  useEffect(() => {
    generateWords();
  }, [nivel]);

  /**
   * Iniciar jogo
   */
  const startGame = () => {
    setStartDate(new Date());
    setCurrentIndex(0);
    setPhase("showing");
  };

  /**
   * Exibição das palavras
   */
  useEffect(() => {
    if (selectedWords.length === 0) return;

    if (phase !== "showing") return;

    if (currentIndex >= selectedWords.length) {
      setPhase("answering");
      return;
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentIndex, phase, selectedWords]);

  /**
   * ENTER
   */
  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addAnswer();
    }
  };

  /**
   * Adiciona resposta
   */
  const addAnswer = () => {
    if (!inputValue.trim()) return;

    const normalizedInput = normalizeText(inputValue);

    const alreadyAnswered = answers.some(
      (item) => normalizeText(item) === normalizedInput,
    );

    if (alreadyAnswered) {
      setInputValue("");
      return;
    }

    setAnswers((prev) => [...prev, inputValue.trim()]);

    setInputValue("");
  };

  /**
   * Palavra correta
   */
  const isCorrect = (word: string) => {
    return selectedWords.some(
      (item) => normalizeText(item) === normalizeText(word),
    );
  };

  /**
   * Finalizar tentativa
   */
  const finishGame = () => {
    setEndDate(new Date());

    let currentErrors = 0;

    // respostas erradas
    answers.forEach((answer) => {
      if (!isCorrect(answer)) {
        currentErrors++;
      }
    });

    // palavras faltando
    const correctAnswers = answers.filter((answer) => isCorrect(answer)).length;

    const missingWords = selectedWords.length - correctAnswers;

    currentErrors += missingWords;

    setErrors((prev) => prev + currentErrors);

    // níveis
    if (nivel === "facil") {
      setOpenModal(true);
      setNivel("medio");
    } else if (nivel === "medio") {
      setOpenModal(true);
      setNivel("dificil");
    } else {
      setOpenFimJogo(true);
    }
  };

  return (
    <Box sx={style.container}>
      <Box sx={style.title}>
        <Typography variant="h4">
          Teste Lista de Palavras - Nível {nivel}
        </Typography>
      </Box>

      {/* ===== INÍCIO ===== */}
      {phase === "idle" && (
        <Button variant="contained" onClick={startGame} sx={style.button}>
          Iniciar
        </Button>
      )}

      {/* ===== MOSTRANDO ===== */}
      {phase === "showing" && currentIndex < selectedWords.length && (
        <Typography variant="h3" fontWeight="bold">
          {selectedWords[currentIndex]}
        </Typography>
      )}

      {/* ===== RESPOSTAS ===== */}
      {phase === "answering" && (
        <>
          <Typography variant="h6">
            Restam {selectedWords.length - answers.length} palavras
          </Typography>

          <TextField
            fullWidth
            label="Digite as palavras lembradas"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleSubmit}
            sx={{
              mb: 2,
              maxWidth: 500,
            }}
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

          <Box sx={style.buttonsRow}>
            <Button variant="contained" color="info" onClick={addAnswer}>
              Adicionar
            </Button>

            <Button variant="contained" color="success" onClick={finishGame}>
              Enviar
            </Button>
          </Box>
        </>
      )}

      <ModalInfoJogos
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        path={"/teste-lista-palavras"}
      />

      <ModalFimJogos
        isOpen={openFimJogo}
        onClose={() => setOpenFimJogo(false)}
        erros={errors}
        endTime={endDate}
        startTime={startDate}
        dicaFonetica={0}
        dicaSemantica={0}
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
    gap: 2,
  },

  title: {
    backgroundColor: "#cb6ce6",
    p: 2,
    color: "white",
    borderRadius: 8,
  },

  buttonsRow: {
    display: "flex",
    gap: 2,
    mb: 2,
  },

  button: {
    backgroundColor: "#9dd5f1",
    color: "black",
    height: "50px",
    width: "100px",
    borderRadius: "100px",
  },

  listItem: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: 700,
  },

  correct: {
    border: "1px solid green",
    borderRadius: "16px",
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
    width: "fit-content",
  },

  wrong: {
    border: "1px solid red",
    borderRadius: "16px",
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
    width: "fit-content",
  },
};

export default TesteListaPalavras;
