import { AppContext } from "@contexts/AppContext";
import { Modal, Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigateToPage } from "src/hooks/useNavigateToPage";
import { generateGamePDF } from "src/utils/generatePdf";

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
  const navigate = useNavigateToPage();
  const { selectedJogo } = useContext(AppContext);
  return (
    <Modal open={isOpen} onClose={onClose} component="div">
      <Box sx={style.container}>
        <Box sx={style.header}>
          <Typography variant="h5">Fim de jogo!</Typography>
        </Box>
        <Typography variant="h6">
          Parabéns, você completou o jogo! Clique no botão abaixo para baixar o
          seu relatório de desempenho.
        </Typography>
        <Button
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
        >
          <Typography color="#cb6ce6" style={{ fontWeight: "bold" }}>
            Baixar relatório
          </Typography>
        </Button>
        <Box sx={style.row}>
          <Button
            sx={style.confirmButton}
            onClick={() => {
              onClose();
              navigate("/");
            }}
          >
            Confirmar
          </Button>
          <Button
            onClick={() => {
              onClose();
              navigate("/");
            }}
            sx={style.cancelButton}
          >
            Fechar
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
    bgcolor: "white",
    p: 2,
    boxShadow: 24,
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  row: {
    with: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 3,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  cancelButton: {
    border: "1px solid red",
    color: "red",
    borderRadius: 2,
    p: 1,
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: "green",
    color: "white",
    borderRadius: 2,
    p: 1,
    fontSize: 14,
  },
};

export default ModalFimJogos;
