"use client";

import React from "react";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  Divider,
} from "@mui/material";

import {
  HomeRounded,
  SportsEsportsRounded,
  AssignmentRounded,
  InfoRounded,
  LogoutRounded,
  ArrowForwardRounded,
} from "@mui/icons-material";

import games from "../data/games.json";

import { SxProps, Theme } from "@mui/material/styles";

const HomeScreen = () => {
  return (
    <Box sx={style.page}>
      <Box sx={style.content}>
        <Box sx={style.header}>
          <Typography sx={style.title}>Olá!</Typography>
          <Typography sx={style.subtitle}>
            Divirta-se enquanto trabalha habilidades como memória, atenção,
            percepção e linguagem.
          </Typography>
        </Box>

        <Box sx={style.sectionHeader}>
          <SportsEsportsRounded sx={style.sectionIcon} />
          <Typography sx={style.sectionTitle}>Jogos disponíveis</Typography>
        </Box>

        <Grid container spacing={2.5}>
          {games.map((jogo) => (
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 4,
              }}
              key={jogo.id}
            >
              <Card sx={style.card}>
                <CardActionArea
                  sx={style.cardAction}
                  onClick={() => {
                    // setSelectedJogo(jogo);
                    // setOpenModalInfo(true);
                  }}
                >
                  <Box sx={style.imageContainer}>
                    <CardMedia
                      component="img"
                      image={jogo.logo}
                      alt={jogo.nome}
                      sx={style.gameImage}
                    />
                  </Box>

                  <CardContent sx={style.cardContent}>
                    <Typography sx={style.gameTitle}>{jogo.nome}</Typography>

                    <Typography sx={style.gameDescription}>
                      {jogo.descricao}
                    </Typography>

                    <Box sx={style.cardFooter}>
                      <Typography sx={style.playText}>Começar</Typography>

                      <Box sx={style.playButton}>
                        <ArrowForwardRounded />
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={style.footer}>
          <Typography>
            Pequenos avanços também são grandes conquistas! 💜
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

/* =====================================================
   ESTILOS
===================================================== */

const style: Record<string, SxProps<Theme>> = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    backgroundColor: "#F8F7FC",
  },

  content: {
    flex: 1,
    minWidth: 0,
    padding: 3,

    "@media (max-width: 600px)": {
      padding: 2,
    },
  },

  header: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    mb: 2,
  },

  title: {
    fontSize: {
      xs: 38,
      sm: 44,
    },

    fontWeight: 800,
    color: "#18295C",
    mb: 1,
  },

  subtitle: {
    fontSize: {
      xs: 19,
      sm: 22,
    },
    fontWeight: 600,
    color: "#263D78",
    mb: 1,
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mb: 2.5,
  },

  sectionTitleContainer: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    flexShrink: 0,
  },

  sectionIcon: {
    color: "#5B65A8",
    fontSize: 30,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: "#18295C",
  },

  sectionLine: {
    height: 1,
    flex: 1,
    backgroundColor: "#DDD9E8",
  },

  card: {
    height: "100%",
    minHeight: 340,
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0px 5px 18px rgba(39, 47, 85, 0.08)",
    transition: "all 0.2s ease",

    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0px 10px 25px rgba(39, 47, 85, 0.14)",
    },
  },

  cardAction: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },

  imageContainer: {
    height: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 2,
  },

  gameImage: {
    width: "55%",
    height: "100%",
    objectFit: "contain",
    transition: "transform 0.2s ease",

    "&:hover": {
      transform: "scale(1.05)",
    },
  },

  cardContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    px: 2,
    pb: 2,
    pt: 1,
  },

  gameTitle: {
    fontSize: 17,
    fontWeight: 800,
    color: "#18295C",
    mb: 0.8,
  },

  gameDescription: {
    fontSize: 13.5,
    color: "#5E6C8E",
    lineHeight: 1.5,
  },

  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    mt: "auto",
    pt: 2,
    gap: 1,
  },

  playText: {
    fontSize: 13,
    fontWeight: 700,
    color: "#65749A",
  },

  playButton: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    backgroundColor: "#8D7AE8",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& svg": {
      fontSize: 20,
    },
  },

  footer: {
    textAlign: "center",
    mt: 5,
    mb: 2,
    color: "#7A83A2",
    fontSize: 14,
    fontWeight: 600,
  },
};

export default HomeScreen;
