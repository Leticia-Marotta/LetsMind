import { useContext, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  Card,
} from "@mui/material";
import { AppContext } from "@contexts/AppContext";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import AbcIcon from "@mui/icons-material/Abc";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Toast from "@commons/Toast";

const NomeacaoBoston = () => {
  const { nivel, setNivel, selectedJogo, nomeacaoBoston } =
    useContext(AppContext);
  const [index, setIndex] = useState<number>(0);
  const [resposta, setResposta] = useState<string>("");
  const [showDicaSemantica, setShowDicaSemantica] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [errors, setErrors] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openFinishModal, setOpenFinishModal] = useState<boolean>(false);

  const item = nomeacaoBoston.filter((item) => {
    return item.nivel === nivel;
  })[index];

  const speak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(item.dicaFonetica);
      utterance.lang = "pt-BR";
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Seu navegador não suporta a Web Speech API");
    }
  };

  const validar = () => {
    const correto =
      resposta.trim().toLowerCase() === item.palavra.toLowerCase();

    if (correto) {
      setShowAlert(true);
      setFeedback("Nomeação correta!");
      setTimeout(() => {
        setFeedback("");
        setResposta("");
        setShowDicaSemantica(false);
        setIndex(index + 1);
      }, 2000);
      return;
    } else {
      setErrors((prev) => prev + 1);
      setShowAlert(true);
      setFeedback("Não foi dessa vez, tente novamente!");
    }
  };

  if (index >= nomeacaoBoston.length) {
    return <Typography variant="h5">✅ Teste concluído!</Typography>;
  }

  return (
    <Box sx={style.container}>
      <Box sx={style.title}>
        <Typography variant="h4">Teste de Trilhas - Nível {nivel}</Typography>
      </Box>
      <Card sx={style.card}>
        <img
          src={item.imagem}
          alt="figura"
          style={{ width: 160, height: 160 }}
        />
      </Card>
      <Box sx={style.row}>
        <Box sx={style.inputBox}>
          <Typography>Qual o nome do objeto acima?</Typography>
          <TextField
            label="Nome"
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
          />
        </Box>
        <Button sx={style.buttonSend} onClick={validar}>
          Enviar
        </Button>
      </Box>
      {showDicaSemantica && (
        <Typography variant="h5">
          Dica semantica: {item.dicaSemantica}
        </Typography>
      )}
      <Divider variant="fullWidth" style={{ width: "30%" }} />
      <Box sx={style.row}>
        <Button
          sx={style.dicasButton}
          onClick={() => {
            setShowDicaSemantica(true);
          }}
        >
          <AbcIcon sx={{ fontSize: "35px" }} />
          <Typography>Dica semântica</Typography>
        </Button>
        <Button sx={style.dicasButton} onClick={() => speak()}>
          <VolumeUpIcon sx={{ fontSize: "25px" }} />
          <Typography>Dica fonética</Typography>
        </Button>
      </Box>
      <Toast
        open={showAlert}
        text={feedback}
        onClose={() => setShowAlert(false)}
        backgroundColor="#FFE55D"
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
  inputBox: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 3,
  },
  dicasButton: {
    border: "2px solid #cb6ce6",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    align: "center",
    color: "black",
    height: "70px",
    width: "180px",
  },
  buttonSend: {
    backgroundColor: "#9dd5f1",
    color: "black",
    height: "50px",
    width: "100px",
    borderRadius: "100px",
  },
  card: {
    p: 2,
    borderRadius: 8,
    width: 180,
    height: 180,
    display: "flex",
    justifyContent: "center",
    align: "center",
  },
};
export default NomeacaoBoston;
