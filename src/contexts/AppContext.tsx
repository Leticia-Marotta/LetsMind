import { IJogos, INomeacaoBoston, ITestePalavras } from "@api/jogo-interface";
import React, { useEffect, useState } from "react";

type AppContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  jogos: IJogos[];
  nomeacaoBoston: INomeacaoBoston[];
  selectedJogo: IJogos;
  setSelectedJogo: React.Dispatch<React.SetStateAction<IJogos>>;
  nivel: string;
  setNivel: React.Dispatch<React.SetStateAction<string>>;
  testeListaPalavras: ITestePalavras[];
};

const initialState: AppContextType = {
  isLoading: false,
  setIsLoading: () => {},
  jogos: [],
  nomeacaoBoston: [],
  selectedJogo: {} as IJogos,
  setSelectedJogo: () => {},
  nivel: "",
  setNivel: () => {},
  testeListaPalavras: [],
};

export const AppContext = React.createContext<AppContextType>(initialState);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJogo, setSelectedJogo] = useState<IJogos>({} as IJogos);
  const [nivel, setNivel] = useState<string>("");

  const jogos = [
    {
      id: 1,
      nome: "Teste de Trilhas",
      logo: require("../assets/TesteTrilhas.png"),
      path: "/teste-trilhas",
      niveis: [
        {
          nivel: "facil",
          sobre:
            "O Teste de Trilhas consiste em conectar, em ordem alfabética, as letras dispostas na tela. \n Para utilizar o teste, clique na letra desejada e arraste até a próxima letra desejada.\n Exemplo: A -> B ...",
        },
        {
          nivel: "medio",
          sobre:
            "O Teste de Trilhas consiste em conectar, em ordem alfabética e numérica, as letras dispostas na tela. \n Para utilizar o teste, clique na letra desejada e arraste até o próximo número desejado.\n Exemplo: A -> 1 -> B -> 2 ...",
        },
        {
          nivel: "dificil",
          sobre:
            "O Teste de Trilhas consiste em conectar, em ordem alfabética e numérica, as letras dispostas na tela. \n Para utilizar o teste, clique na letra desejada e arraste até o próximo número desejado.\n Exemplo: A -> 1 -> B -> 2 ...",
        },
      ],
    },
    {
      id: 2,
      nome: "Nomeação de Boston",
      logo: require("../assets/NomeacaoBoston.png"),
      path: "/nomeacao-boston",
      niveis: [
        {
          nivel: "facil",
          sobre:
            "A nomeação de Boston é um teste neuropsicológico avaliar a capacidade de nomear objetos por meio da apresentação de figuras. No nível fácil as figuras selecionadas são itens do cotidiano, que você tem ao seu redor com facilidade. Caso você não reconheça a figura, você pode solicitar uma dica semântica ou uma dica fonética!",
        },
        {
          nivel: "facil",
          sobre:
            "A nomeação de Boston é um teste neuropsicológico avaliar a capacidade de nomear objetos por meio da apresentação de figuras. No nível médio as figuras selecionadas são itens mais complexos, mas ainda com fácil escrita. Caso você não reconheça a figura, você pode solicitar uma dica semântica ou uma dica fonética!",
        },
        {
          nivel: "dificil",
          sobre:
            "A nomeação de Boston é um teste neuropsicológico avaliar a capacidade de nomear objetos por meio da apresentação de figuras. No nível difícil as figuras selecionadas são itens de difícil acesso mas ainda conhecidas. Caso você não reconheça a figura, você pode solicitar uma dica semântica ou uma dica fonética!",
        },
      ],
    },
    {
      id: 3,
      nome: "Teste de Lista de Palavras",
      logo: require("../assets/ListaPalavras.png"),
      path: "/teste-lista-palavras",
      niveis: [
        {
          nivel: "facil",
          sobre:
            "O Teste de Lista de Palavras avalia recordação imediata, recordação tardia e reconhecimento. Serão exibidas 10 palavras na tela, cada uma por 2s, seu objetivo no final é conseguir escrever o máximo de palavras que conseguir lembrar, a cada palavra que você digitar, aperte enter para confiar o envio. No nível fácil as palavras serão coisas do cotidiano e palavras curtas.",
        },
        {
          nivel: "medio",
          sobre:
            "O Teste de Lista de Palavras avalia recordação imediata, recordação tardia e reconhecimento. Serão exibidas 10 palavras na tela, cada uma por 2s, seu objetivo no final é conseguir escrever o máximo de palavras que conseguir lembrar, a cada palavra que você digitar, aperte enter para confiar o envio. No nível médio as palavras serão maiores mas de conhecimento geral.",
        },
        {
          nivel: "dificil",
          sobre:
            "O Teste de Lista de Palavras avalia recordação imediata, recordação tardia e reconhecimento. Serão exibidas 10 palavras na tela, cada uma por 2s, seu objetivo no final é conseguir escrever o máximo de palavras que conseguir lembrar, a cada palavra que você digitar, aperte enter para confiar o envio. No nível difícil as palavras serão mais complexas e maiores.",
        },
      ],
    },
    {
      id: 4,
      nome: "Reprodução de linhas",
      logo: require("../assets/Quadrado.png"),
      path: "/linhas-quadrado",
      niveis: [
        {
          nivel: "facil",
          sobre:
            "A reprodução de linhas consiste em interligar os pontos do quadrado com linhas. Ele ajuda a treinar memória, concentração, rganização do pensamento, também estimula a coordenação entre visão e movimento. Para jogar você deve selecionar o ponto desejado e arrastar a linha vermelha até o próximo ponto, e assim em diante. No nível fácil são 4 linhas criadas",
        },
        {
          nivel: "medio",
          sobre:
            "A reprodução de linhas consiste em interligar os pontos do quadrado com linhas. Ele ajuda a treinar memória, concentração, rganização do pensamento, também estimula a coordenação entre visão e movimento. Para jogar você deve selecionar o ponto desejado e arrastar a linha vermelha até o próximo ponto, e assim em diante. No nível médio são 6 linhas criadas",
        },
        {
          nivel: "dificil",
          sobre:
            "A reprodução de linhas consiste em interligar os pontos do quadrado com linhas. Ele ajuda a treinar memória, concentração, rganização do pensamento, também estimula a coordenação entre visão e movimento. Para jogar você deve selecionar o ponto desejado e arrastar a linha vermelha até o próximo ponto, e assim em diante. No nível dificil são 8 linhas criadas",
        },
      ],
    },
  ] as IJogos[];

  const nomeacaoBoston = [
    {
      palavra: "cama",
      imagem: "https://openmoji.org/data/black/svg/1F6CF.svg",
      nivel: "facil",
      dicaSemantica: "Um móvel",
      dicaFonetica: "Ca...",
    },
    {
      palavra: "arvore",
      imagem: "https://openmoji.org/data/black/svg/1F332.svg",
      nivel: "facil",
      dicaSemantica: "Algo que cresce ao ar livre",
      dicaFonetica: "Ar...",
    },
    {
      palavra: "lapis",
      imagem: "https://openmoji.org/data/black/svg/270F.svg",
      nivel: "facil",
      dicaSemantica: "Usado para escrever",
      dicaFonetica: "La...",
    },
    {
      palavra: "casa",
      imagem: "https://openmoji.org/data/black/svg/1F3E0.svg",
      nivel: "facil",
      dicaSemantica: "Um tipo de construção",
      dicaFonetica: "Ca...",
    },
    {
      palavra: "tesoura",
      imagem: "https://openmoji.org/data/black/svg/1F3B6.svg",
      nivel: "facil",
      dicaSemantica: "Usado para cortar",
      dicaFonetica: "Te...",
    },
    {
      palavra: "pente",
      imagem: "https://openmoji.org/data/black/svg/1FAAE.svg",
      nivel: "facil",
      dicaSemantica: "Usado para arrumar o cabelo",
      dicaFonetica: "Pe...",
    },
    {
      palavra: "flor",
      imagem: "https://openmoji.org/data/black/svg/1F33C.svg",
      nivel: "facil",
      dicaSemantica: "Cresce em jardins",
      dicaFonetica: "Flo...",
    },
    {
      palavra: "serra",
      imagem: "https://openmoji.org/data/black/svg/1FA9A1.svg",
      nivel: "facil",
      dicaSemantica: "Usado por carpinteiros",
      dicaFonetica: "Se...",
    },
    {
      palavra: "unicornio",
      imagem: "https://openmoji.org/data/black/svg/1F984.svg",
      nivel: "facil",
      dicaSemantica: "Um animal místico",
      dicaFonetica: "Uni...",
    },
    {
      palavra: "escova de dentes",
      imagem: "https://openmoji.org/data/black/svg/1FAA5.svg",
      nivel: "facil",
      dicaSemantica: "Usado para limpar os dentes",
      dicaFonetica: "Es...",
    },
    //medio
    {
      palavra: "helicóptero",
      imagem: "https://openmoji.org/data/black/svg/1F681.svg",
      nivel: "medio",
      dicaSemantica: "Um meio de transporte aéreo",
      dicaFonetica: "He...",
    },
    {
      palavra: "vassoura",
      imagem: "https://openmoji.org/data/black/svg/1F9F9.svg",
      nivel: "medio",
      dicaSemantica: "Usada para limpar",
      dicaFonetica: "Vas...",
    },
    {
      palavra: "polvo",
      imagem: "https://openmoji.org/data/black/svg/1F419.svg",
      nivel: "medio",
      dicaSemantica: "Um animal marinho",
      dicaFonetica: "Pol...",
    },
    {
      palavra: "cogumelo",
      imagem: "https://openmoji.org/data/black/svg/1F344.svg",
      nivel: "medio",
      dicaSemantica: "Algo comestível",
      dicaFonetica: "Co...",
    },
    {
      palavra: "cadeira de rodas",
      imagem: "https://openmoji.org/data/black/svg/E237.svg",
      nivel: "medio",
      dicaSemantica: "Econtrado em hospitais",
      dicaFonetica: "Ca...",
    },
    {
      palavra: "camelo",
      imagem: "https://openmoji.org/data/black/svg/1F42B.svg",
      nivel: "medio",
      dicaSemantica: "Um animal",
      dicaFonetica: "Ca...",
    },
    {
      palavra: "masacara",
      imagem: "https://openmoji.org/data/black/svg/E145.svg",
      nivel: "medio",
      dicaSemantica: "Parte de fantasia",
      dicaFonetica: "Ma...",
    },
    {
      palavra: "lesma",
      imagem: "https://openmoji.org/data/black/svg/1F40C.svg",
      nivel: "medio",
      dicaSemantica: "Um animal",
      dicaFonetica: "Le...",
    },
    {
      palavra: "canoa",
      imagem: "https://openmoji.org/data/black/svg/1F6F6.svg",
      nivel: "medio",
      dicaSemantica: "Usado na água",
      dicaFonetica: "Ca...",
    },
    {
      palavra: "globo",
      imagem: "https://openmoji.org/data/black/svg/1F30E.svg",
      nivel: "medio",
      dicaSemantica: "Representa a Terra",
      dicaFonetica: "Glo...",
    },
    //dificil
    {
      palavra: "esquilo",
      imagem: "https://openmoji.org/data/black/svg/1F9AB.svg",
      nivel: "dificil",
      dicaSemantica: "Um animal",
      dicaFonetica: "Es...",
    },
    {
      palavra: "rinoceronte",
      imagem: "https://openmoji.org/data/black/svg/1F98F.svg",
      nivel: "dificil",
      dicaSemantica: "Um grande animal",
      dicaFonetica: "Ri...",
    },
    {
      palavra: "cacto",
      imagem: "https://openmoji.org/data/black/svg/1F335.svg",
      nivel: "dificil",
      dicaSemantica: "Uma coisa que cresce",
      dicaFonetica: "Ca...",
    },
    {
      palavra: "harpa",
      imagem: "https://openmoji.org/data/black/svg/1FA89.svg",
      nivel: "dificil",
      dicaSemantica: "Um instrumento musical",
      dicaFonetica: "Ha...",
    },
    {
      palavra: "estetoscopio",
      imagem: "https://openmoji.org/data/black/svg/1FA7A.svg",
      nivel: "dificil",
      dicaSemantica: "Usado por médicos e enfermeiras",
      dicaFonetica: "Est...",
    },
    {
      palavra: "piramide",
      imagem: "https://openmoji.org/data/black/svg/E20F.svg",
      nivel: "dificil",
      dicaSemantica: "Encontrada no egito",
      dicaFonetica: "Pi...",
    },
    {
      palavra: "bussola",
      imagem: "https://openmoji.org/data/black/svg/1F9ED.svg",
      nivel: "dificil",
      dicaSemantica: "Usada para se localizar",
      dicaFonetica: "Bu...",
    },
    {
      palavra: "abaco",
      imagem: "https://openmoji.org/data/black/svg/1F9ED.svg",
      nivel: "dificil",
      dicaSemantica: "Usado para contar",
      dicaFonetica: "Aba...",
    },
    {
      palavra: "paleta",
      imagem: "https://openmoji.org/data/black/svg/1FA8.svg",
      nivel: "dificil",
      dicaSemantica: "Artistas usam",
      dicaFonetica: "Pa...",
    },
    {
      palavra: "transferidor",
      imagem: "https://openmoji.org/data/black/svg/1FD0.svg",
      nivel: "dificil",
      dicaSemantica: "Usado para medir ângulos",
      dicaFonetica: "Tran...",
    },
  ] as INomeacaoBoston[];

  const testeListaPalavras: ITestePalavras[] = [
    {
      nivel: "facil",
      palavras: [
        "casa",
        "bola",
        "gato",
        "árvore",
        "livro",
        "janela",
        "carro",
        "praia",
        "computador",
        "telefone",
        "caneta",
        "mesa",
        "cadeira",
        "sol",
        "lua",
      ],
    },
    { nivel: "medio", palavras: [] },
    { nivel: "dificil", palavras: [] },
  ];

  const reproducaoDeQuadrados = [
    {
      nivel: "fácil",
    },
  ];
  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        jogos,
        nomeacaoBoston,
        selectedJogo,
        setSelectedJogo,
        nivel,
        setNivel,
        testeListaPalavras,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
