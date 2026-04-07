import { Modal, Box, Button, Typography } from "@mui/material";
import { useNavigateToPage } from "src/hooks/useNavigateToPage";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
const ModalInfoJogos = ({
  isOpen,
  onClose,
  sobre,
  path,
}: {
  isOpen: boolean;
  onClose: any;
  sobre: string;
  path: string;
}) => {
  const navigate = useNavigateToPage();
  return (
    <Modal open={isOpen} onClose={onClose} component="div">
      <Box sx={style.container}>
        <Box sx={style.header}>
          <InfoOutlineIcon />
          <Typography variant="h5">Sobre</Typography>
        </Box>
        <Typography variant="h6">{sobre}</Typography>
        <Box sx={style.row}>
          <Button
            onClick={() => {
              onClose();
              navigate("/");
            }}
            sx={style.cancelButton}
          >
            Fechar
          </Button>
          <Button
            sx={style.confirmButton}
            onClick={() => {
              onClose();
              navigate(path as any);
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

export default ModalInfoJogos;
