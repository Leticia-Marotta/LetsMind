import { JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { AppProvider } from "./contexts/AppContext";
import TesteTrilhas from "./game/TesteTrilhas";
import NomeacaoBoston from "./game/NomeacaoBoston";
import TesteListaPalavras from "./game/TesteListaPalavras";
import LinhasQuadrado from "./game/LinhasQuadrados";

type TRouterType = {
  title: string;
  path: string;
  element: JSX.Element;
};

const SCREENS: TRouterType[] = [
  { title: "Home Page", path: "/", element: <HomePage /> },
  { title: "Teste Trilhas", path: "/teste-trilhas", element: <TesteTrilhas /> },
  {
    title: "Nomeação Boston",
    path: "/nomeacao-boston",
    element: <NomeacaoBoston />,
  },
  {
    title: "Teste Lista Palavras",
    path: "/teste-lista-palavras",
    element: <TesteListaPalavras />,
  },
  {
    title: "Linhas Quadrado",
    path: "/linhas-quadrado",
    element: <LinhasQuadrado />,
  },
];

export type TValidPaths =
  | "/"
  | "/teste-trilhas"
  | "/nomeacao-boston"
  | "/teste-lista-palavras";

const Router = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {SCREENS.map(({ title, path, element }) => (
            <Route id={title} path={path} element={element} />
          ))}
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default Router;
