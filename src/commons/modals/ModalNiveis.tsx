import { Modal, Box, Button, Typography } from "@mui/material";
import { useNavigateToPage } from "src/hooks/useNavigateToPage";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import ModalInfoJogos from "./ModalInfoJogo";
import { useContext, useState } from "react";
import { AppContext } from "@contexts/AppContext";
const ModalNiveis = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: any;
}) => {
  const navigate = useNavigateToPage();

  const { selectedJogo, setNivel, nivel } = useContext(AppContext);
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Modal open={isOpen} onClose={onClose} component="div">
      <Box sx={style.container}>
        <Typography variant="h4">Selecione o nível de dificuldade</Typography>
        <Box sx={style.row}>
          <Button
            onClick={() => {
              setNivel("facil");
              setOpenModal(true);
            }}
          >
            <Typography sx={{ ...style.nivel, bgcolor: "#acdeffff", color: "blue" }}>
              Fácil
            </Typography>
          </Button>
          <Button
            onClick={() => {
              setNivel("medio");
              setOpenModal(true);
            }}
          >
            <Typography sx={{ ...style.nivel, bgcolor: "#98f37dff", color: "green" }}>
              Médio
            </Typography>
          </Button>
          <Button
            onClick={() => {
              setNivel("dificil");
              setOpenModal(true);
            }}
          >
            <Typography sx={{ ...style.nivel, bgcolor: "#fd898fff", color: "red"  }}>
              Difícil
            </Typography>
          </Button>
        </Box>

        <ModalInfoJogos
          isOpen={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
          path={selectedJogo?.path ?? ""}
          sobre={
            selectedJogo?.niveis?.find((item) => item.nivel === nivel)?.sobre ??
            ""
          }
        />
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
    p: 5,
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
  nivel: {
    padding: 3,
    borderRadius: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default ModalNiveis;
