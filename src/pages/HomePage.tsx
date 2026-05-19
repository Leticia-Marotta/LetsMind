import ModalInfoJogos from "@commons/modals/ModalInfoJogo";
import { AppContext } from "@contexts/AppContext";
import {
  Box,
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  colors,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

const HomePage = () => {
  const { jogos, setSelectedJogo, selectedJogo, nivel, setNivel } =
    useContext(AppContext);
  const [openModalInfo, setOpenModalInfo] = useState<boolean>(false);

  useEffect(() => {
    setNivel("facil");
  }, [nivel]);


  return (
    <Box sx={style.container}>
      <img src={require("../assets/logo.png")} alt="Logo" width={"20%"} style={{minWidth: '150px'}}/>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        {jogos.map((jogo) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={jogo.id}>
            <Card
              sx={style.card}
              onClick={() => {
                setSelectedJogo(jogo);
                setOpenModalInfo(true);
              }}
            >
              <CardActionArea sx={style.cardContent}>
                <CardMedia
                  component="img"
                  sx={{ width: '40%', aspectRatio: 1 }}
                  image={jogo.logo}
                  alt={jogo.nome}
                />
                <CardContent>
                  <Typography sx={{ textAlign: "center", fontSize: 16 }}>
                    {jogo.nome}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ModalInfoJogos
        isOpen={openModalInfo}
        onClose={() => setOpenModalInfo(false)}
        path={selectedJogo?.path ?? ""}
      />
    </Box>
  );
};

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  card: {
    display: "flex",
    borderRadius: 8,
    flexDirection: "column",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
    border: `1px solid ${colors.deepPurple[100]}`
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default HomePage;
