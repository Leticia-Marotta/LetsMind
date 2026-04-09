import { IJogos, INomeacaoBoston, ITestePalavras } from "@api/jogo-interface";
import React, { useState } from "react";

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
            "O Teste de Trilhas estimula a atenção, a memória de trabalho e a flexibilidade mental. Ao exigir que o usuário conecte elementos em uma sequência específica o cérebro é incentivado a se adaptar e organizar informações de forma eficiente. Essa prática contribui para melhorar o raciocínio, a concentração e o controle executivo, habilidades fundamentais para a realização de tarefas do dia a dia. \n Para utilizar o teste, clique na letra desejada e arraste até a próxima letra desejada.\n Exemplo: A -> B ...",
        },
        {
          nivel: "medio",
          sobre:
            "O Teste de Trilhas estimula a atenção, a memória de trabalho e a flexibilidade mental. Ao exigir que o usuário conecte elementos em uma sequência específica o cérebro é incentivado a se adaptar e organizar informações de forma eficiente. Essa prática contribui para melhorar o raciocínio, a concentração e o controle executivo, habilidades fundamentais para a realização de tarefas do dia a dia. \n Para utilizar o teste, clique na letra desejada e arraste até a próxima letra desejada.\n Exemplo: A -> B ...",
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
      logo: require("../assets/LinhasQuadrado.png"),
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
    {
      id: 4,
      nome: "Colorindo Quadrados",
      logo: require("../assets/ColorirQuadrado.png"),
      path: "/colorir-quadrados",
      niveis: [
        {
          nivel: "facil",
          sobre:
            "O colorir quadrados estimula a memória visual e a atenção, já que o usuário precisa observar e reproduzir corretamente o padrão de cores. Ele também trabalha o raciocínio espacial e o planejamento, ao exigir que a pessoa organize mentalmente onde cada cor deve ser aplicada. Além disso, a interação de arrastar e soltar contribui para a coordenação visuomotora, importante para diversas atividades do dia a dia. No nível fácil, é necessário colorir apenas 4 quadrados",
        },
        {
          nivel: "medio",
          sobre:
            "O colorir quadrados estimula a memória visual e a atenção, já que o usuário precisa observar e reproduzir corretamente o padrão de cores. Ele também trabalha o raciocínio espacial e o planejamento, ao exigir que a pessoa organize mentalmente onde cada cor deve ser aplicada. Além disso, a interação de arrastar e soltar contribui para a coordenação visuomotora, importante para diversas atividades do dia a dia. No nível médio, é necessário colorir 6 quadrados.",
        },
        {
          nivel: "dificil",
          sobre:
            "O colorir quadrados estimula a memória visual e a atenção, já que o usuário precisa observar e reproduzir corretamente o padrão de cores. Ele também trabalha o raciocínio espacial e o planejamento, ao exigir que a pessoa organize mentalmente onde cada cor deve ser aplicada. Além disso, a interação de arrastar e soltar contribui para a coordenação visuomotora, importante para diversas atividades do dia a dia. No nível difícil, é necessário colorir 8 quadrados.",
        },
      ],
    },
    {
      id: 5,
      nome: "Cor-respondência",
      logo: require("../assets/CorRespondencia.png"),
      path: "/cor-respondencia",
      niveis: [
        {
          nivel: "facil",
          sobre:
            "Cor-respondência trabalha com a sua inibição de respostas, que é a capacidade de suprimir respostas automáticas e incorretas. O controle inibitório é um componente essencial da função executiva, ou seja, da capacidade que o cérebro possui de controlar ações e coordenar processos mentais para ajudar você a realizar seus objetivos. No nível fácil, são apresentadas 4 cores para correspondência.",
        },
        {
          nivel: "medio",
          sobre:
            "Cor-respondência trabalha com a sua inibição de respostas, que é a capacidade de suprimir respostas automáticas e incorretas. O controle inibitório é um componente essencial da função executiva, ou seja, da capacidade que o cérebro possui de controlar ações e coordenar processos mentais para ajudar você a realizar seus objetivos. No nível médio, são apresentadas 6 cores para correspondência.",
        },
        {
          nivel: "dificil",
          sobre:
            "Cor-respondência trabalha com a sua inibição de respostas, que é a capacidade de suprimir respostas automáticas e incorretas. O controle inibitório é um componente essencial da função executiva, ou seja, da capacidade que o cérebro possui de controlar ações e coordenar processos mentais para ajudar você a realizar seus objetivos. No nível difícil, são apresentadas 8 cores para correspondência.",
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
      palavras: ["casa", "bola", "gato", "árvore", "livro"],
    },
    { nivel: "medio", palavras: [] },
    { nivel: "dificil", palavras: [] },
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
