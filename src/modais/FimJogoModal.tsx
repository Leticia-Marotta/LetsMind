import { Modal, Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { useRouter } from "next/compat/router";
import { generateGamePDF } from "../utils/generatePdf";

const ModalFimJogos = ({
  dicaSemantica,
  dicaFonetica,
  isOpen,
  onClose,
  startTime,
  endTime,
  erros,
}: {
  isOpen: boolean;
  onClose: any;
  startTime: Date;
  endTime: Date;
  erros: number;
  dicaSemantica: number;
  dicaFonetica: number;
}) => {
  const { selectedJogo } = useContext(AppContext);
  const route = useRouter();

  const close = () => {
    onClose();
    route?.push("/");
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-fim-jogo">
      <Box sx={style.container}>
        <Box sx={style.header}>
          <Box sx={style.icon}>
            <Typography sx={style.iconText}>✓</Typography>
          </Box>

          <Box>
            <Typography id="modal-fim-jogo" sx={style.title}>
              Fim de jogo!
            </Typography>

            <Typography sx={style.subtitle}>
              Parabéns! Você concluiu a atividade.
            </Typography>
          </Box>
        </Box>

        {/* Conteúdo */}
        <Box sx={style.content}>
          <Typography sx={style.description}>
            Seu desempenho foi registrado. Você pode baixar o relatório completo
            da atividade clicando no botão abaixo.
          </Typography>

          <Button
            fullWidth
            onClick={async () => {
              await generateGamePDF({
                startTime,
                endTime,
                erros,
                selectedJogo,
                dicaSemantica,
                dicaFonetica,
              });
            }}
            sx={style.reportButton}
          >
            Baixar relatório
          </Button>
        </Box>

        <Box sx={style.row}>
          <Button onClick={close} sx={style.confirmButton}>
            Voltar ao início
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const style = {
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "calc(100% - 32px)",
      sm: 480,
    },
    bgcolor: "#ffffff",
    borderRadius: 4,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    p: {
      xs: 3,
      sm: 4,
    },
    display: "flex",
    flexDirection: "column",
    gap: 3,
    outline: "none",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  icon: {
    width: 48,
    height: 48,
    minWidth: 48,
    borderRadius: "50%",
    backgroundColor: "#00b34d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  iconText: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: 700,
    lineHeight: 1,
  },

  title: {
    fontSize: {
      xs: 22,
      sm: 24,
    },
    fontWeight: 700,
    color: "#333333",
    lineHeight: 1.2,
  },

  subtitle: {
    mt: 0.5,
    fontSize: 14,
    color: "#777777",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  description: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "#555555",
  },

  reportButton: {
    backgroundColor: "#cb6ce6",
    color: "#ffffff",
    borderRadius: 2,
    py: 1.3,
    px: 2,
    fontSize: 14,
    fontWeight: 700,
    textTransform: "none",

    "&:hover": {
      backgroundColor: "#b957d3",
    },
  },

  row: {
    width: "100%",
    display: "flex",
    flexDirection: {
      xs: "column-reverse",
      sm: "row",
    },
    gap: 1.5,
    justifyContent: "flex-end",
  },

  cancelButton: {
    border: "1px solid #dddddd",
    color: "#666666",
    borderRadius: 2,
    px: 2.5,
    py: 1,
    fontSize: 14,
    fontWeight: 600,
    textTransform: "none",

    "&:hover": {
      backgroundColor: "#f7f7f7",
      borderColor: "#cccccc",
    },
  },

  confirmButton: {
    backgroundColor: "#00b34d",
    color: "#ffffff",
    borderRadius: 2,
    px: 2.5,
    py: 1,
    fontSize: 14,
    fontWeight: 600,
    textTransform: "none",

    "&:hover": {
      backgroundColor: "#009b43",
    },
  },
};

export default ModalFimJogos;
