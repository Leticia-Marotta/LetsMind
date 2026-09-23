"use client";
import React, { useEffect, useState } from "react";
import { IJogos } from "../interfaces/jogoInterface";

type TNiveis = "facil" | "medio" | "dificil";

type AppContextType = {
  userName: string;
  setUserName: (name: string) => void;
  nivel: TNiveis;
  setNivel: (nivel: TNiveis) => void;
  selectedJogo: IJogos;
  setSelectedJogo: (jogo: IJogos) => void;
};

const initialState: AppContextType = {
  userName: "",
  setUserName: () => {},
  nivel: "facil",
  setNivel: () => {},
  selectedJogo: {} as IJogos,
  setSelectedJogo: () => {},
};

export const AppContext = React.createContext<AppContextType>(initialState);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUserName] = useState<string>("");
  const [nivel, setNivel] = useState<TNiveis>("facil");
  const [selectedJogo, setSelectedJogo] = useState<IJogos>({} as IJogos);

  useEffect(() => {
    // Recupera o nome do usuário do localStorage ao montar o componente
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
        nivel,
        setNivel,
        selectedJogo,
        setSelectedJogo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
