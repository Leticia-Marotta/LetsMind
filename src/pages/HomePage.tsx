import ModalNiveis from "@commons/modals/ModalNiveis";
import { AppContext } from "@contexts/AppContext";
import {
  Box,
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigateToPage } from "src/hooks/useNavigateToPage";

const HomePage = () => {
  const { jogos, setSelectedJogo } = useContext(AppContext);
  const navigate = useNavigateToPage();
  const [openMenuNiveis, setOpenMenuNiveis] = useState<boolean>(false);

  return (
    <Box sx={style.container}>
      <img src={require("../assets/logo.png")} alt="Logo" width={"20%"} />
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        {jogos.map((jogo) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={jogo.id}>
            <Card
              sx={style.card}
              onClick={() => {
                setSelectedJogo(jogo);
                setOpenMenuNiveis(true);
              }}
            >
              <CardActionArea sx={style.cardContent}>
                <CardMedia
                  component="img"
                  sx={{ height: 150, width: 150, aspectRatio: 1 }}
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
      <ModalNiveis
        isOpen={openMenuNiveis}
        onClose={() => setOpenMenuNiveis(false)}
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
    p: 1,
    flexDirection: "column",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 220,
  },
};

export default HomePage;
