"use client";
import { Box, Card, colors, TextField, Typography } from "@mui/material";
import loginBackground from "../../public/loginBackground.png";
import React, { useContext } from "react";
import Link from "next/link";
import { AppContext } from "../contexts/AppContext";

const LoginScreen = () => {
  const { userName, setUserName } = useContext(AppContext);

  const saveName = () => {
    // Salva o nome do usuário no localStorage
    localStorage.setItem("userName", userName);
  };
  return (
    <Box sx={style.box}>
      <Card sx={style.card}>
        <Typography variant="h6" align="center">
          Bem vindo de volta!
        </Typography>
        <Typography variant="body1" align="center">
          Digite seu nome de usuário para entrar no Let's Mind e continuar sua
          jornada de treinamento e diversão!
        </Typography>
        <TextField
          label="Nome do usuário"
          sx={style.input}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Link style={style.button} href="/home" onClick={saveName}>
          Entrar
        </Link>
      </Card>
    </Box>
  );
};

const style: { [key: string]: React.CSSProperties } = {
  box: {
    height: "100vh",
    width: "100%",
    backgroundImage: `url(${loginBackground.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: "5%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: "28%",
    padding: 2,
    gap: 1,
    borderRadius: 8,
  },
  button: {
    backgroundColor: colors.deepPurple[400],
    color: colors.common.white,
    borderRadius: 8,
    textAlign: "center",
    padding: 2,
  },
};

export default LoginScreen;
