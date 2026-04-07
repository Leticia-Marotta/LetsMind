import { Modal, Box, Button, Typography } from "@mui/material";
import { useNavigateToPage } from "src/hooks/useNavigateToPage";
const ModalFimJogos = ({
  isOpen,
  onClose,
  texto,
  startTime,
  endTime,
}: {
  isOpen: boolean;
  onClose: any;
  texto: string;
  startTime: string,
  endTime: string,
}) => {
  const navigate = useNavigateToPage();
  return (
    <Modal open={isOpen} onClose={onClose} component="div">
      <Box sx={style.container}>
        <Box sx={style.header}>
          <Typography variant="h5">Fim de jogo!</Typography>
        </Box>
        <Typography variant="h6">{texto}</Typography>
        <Box sx={style.row}>
          <Button
            onClick={() => {
              onClose();
            }}
            sx={style.cancelButton}
          >
            Fechar
          </Button>
          <Button
            sx={style.confirmButton}
            onClick={() => {
              onClose();
              navigate("/");
            }}
          >
            Confirmar
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
