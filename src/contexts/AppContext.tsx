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
  const [nivel, setNivel] = useState<string>("facil");

  const jogos = [
    {
      id: 1,
      nome: "Teste de Trilhas",
      logo: require("../assets/TesteTrilhas.png"),
      path: "/teste-trilhas",
      sobre:
        "O Teste de Trilhas estimula a atenção, a memória de trabalho e a flexibilidade mental. Ao exigir que o usuário conecte elementos em uma sequência específica o cérebro é incentivado a se adaptar e organizar informações de forma eficiente. Essa prática contribui para melhorar o raciocínio, a concentração e o controle executivo, habilidades fundamentais para a realização de tarefas do dia a dia.",
      niveis: [
        {
          nivel: "facil",
          sobre:
            "Conecte as letras em ordem alfabética. Comece pela letra A, clique sobre ela e arraste a linha até a letra B. Em seguida, continue para C, D e assim por diante até completar toda a sequência.",
        },
        {
          nivel: "medio",
          sobre:
            "Conecte os elementos alternando entre letras e números. Comece pela letra A, depois siga para o número 1, em seguida para a letra B, depois para o número 2, continuando nesse padrão até finalizar a sequência.",
        },
        {
          nivel: "dificil",
          sobre:
            "Siga a mesma lógica do nível médio, alternando entre letras e números na ordem correta. Neste nível, haverá uma quantidade maior de caracteres na tela, exigindo mais atenção e concentração para encontrar os próximos elementos da sequência.",
        },
      ],
    },
    {
      id: 2,
      nome: "Nomeação de Boston",
      logo: require("../assets/NomeacaoBoston.png"),
      path: "/nomeacao-boston",
      sobre:
        "A teste Nomeação de Boston estimula a linguagem, a memória e a capacidade de associação entre imagens e palavras, exercitando o acesso ao vocabulário e a recuperação de palavras armazenadas na memória. O uso de dicas semânticas e fonéticas ajuda a fortalecer conexões cognitivas relacionadas à compreensão, reconhecimento e produção da fala, contribuindo para melhorar a comunicação e a fluência verbal no dia a dia.",
      niveis: [
        {
          nivel: "facil",
          sobre:
            "Observe a imagem exibida na tela e diga o nome do objeto correspondente. Neste nível, serão apresentadas imagens do cotidiano e de fácil reconhecimento, como objetos comuns e elementos presentes no dia a dia. Caso tenha dificuldade, você poderá solicitar uma dica semântica ou fonética para auxiliar na resposta.",
        },
        {
          nivel: "medio",
          sobre:
            "Observe cada imagem e tente nomeá-la corretamente. As figuras apresentadas neste nível possuem um grau maior de detalhe e especificidade, exigindo mais atenção e associação de memória. Sempre que necessário, você poderá pedir uma dica semântica ou fonética para ajudar na identificação da palavra.",
        },
        {
          nivel: "dificil",
          sobre:
            "Neste nível, as imagens representam objetos e elementos com nomes mais complexos e menos frequentes no cotidiano. O objetivo é estimular a recuperação de palavras e o acesso ao vocabulário de forma mais desafiadora. Caso encontre dificuldade, você poderá solicitar dicas semânticas ou fonéticas para auxiliar na recordação da resposta correta.",
        },
      ],
    },
    {
      id: 3,
      nome: "Teste de Lista de Palavras",
      logo: require("../assets/ListaPalavras.png"),
      path: "/teste-lista-palavras",
      sobre:
        "O Teste de Lista de Palavras ajuda a estimular a memória, a atenção e a capacidade de concentração. Ao observar e recordar palavras apresentadas na tela, o cérebro é treinado para armazenar, organizar e recuperar informações com mais eficiência. A atividade também auxilia no fortalecimento da memória de curto prazo e da memória verbal, habilidades importantes para tarefas do dia a dia, como lembrar recados, nomes, listas e informações recentes.",
      niveis: [
        {
          nivel: "facil",
          sobre:
            "Palavras serão exibidas uma de cada vez na tela. Leia e tente memorizar cada palavra apresentada. Ao final da sequência, digite no campo de resposta todas as palavras que conseguir lembrar, pressionando Enter após cada resposta.",
        },
        {
          nivel: "medio",
          sobre:
            "Neste nível, uma quantidade maior de palavras será apresentada. Preste atenção na ordem e tente memorizar o máximo possível. Depois que todas aparecerem na tela, escreva as palavras lembradas no campo de resposta, confirmando cada uma com a tecla Enter.",
        },
        {
          nivel: "dificil",
          sobre:
            "No nível difícil, mais palavras serão exibidas e o tempo de memorização se torna mais desafiador. Observe atentamente cada palavra e tente recordar o maior número possível ao final da sequência. Digite suas respostas uma por vez e pressione Enter para registrá-las.",
        },
      ],
    },
    {
      id: 4,
      nome: "Reprodução de linhas",
      logo: require("../assets/LinhasQuadrado.png"),
      path: "/linhas-quadrado",
      sobre:
        "O jogo de Reprodução de Linhas ajuda a estimular a atenção, a memória visual e a coordenação motora. Ao observar e reproduzir os padrões corretamente, o jogador exercita o foco, a percepção espacial e o planejamento, habilidades importantes para a reabilitação cognitiva e para o dia a dia.",
      niveis: [
        {
          nivel: "facil",
          sobre:
            "No nível fácil, serão exibidas 4 linhas conectando diferentes pontos do quadrado. Observe o modelo apresentado e reproduza o desenho no quadro ao lado. Para jogar, selecione um ponto e arraste a linha até o próximo ponto desejado.",
        },
        {
          nivel: "medio",
          sobre:
            "No nível médio, o desafio aumenta para 6 linhas conectadas. Preste atenção no posicionamento das linhas e tente reproduzir o padrão corretamente, selecionando um ponto e arrastando até o outro.",
        },
        {
          nivel: "dificil",
          sobre:
            "No nível difícil, o jogador deverá reproduzir um padrão com 8 linhas conectadas. O exercício exige mais atenção, planejamento e percepção visual para copiar todas as conexões corretamente. Selecione um ponto e arraste a linha até o ponto correspondente para formar o desenho.",
        },
      ],
    },
    {
      id: 5,
      nome: "Colorindo Quadrados",
      logo: require("../assets/ColorirQuadrado.png"),
      path: "/colorir-quadrados",
      sobre:
        "O jogo Colorindo Quadrados ajuda a estimular a atenção, a memória visual e a percepção espacial. O objetivo é observar o desenho colorido apresentado e reproduzir o mesmo padrão no quadro ao lado, utilizando as cores disponíveis. Durante a atividade, o jogador exercita concentração, organização visual e coordenação motora ao arrastar as cores para os locais corretos.",
      niveis: [
        {
          nivel: "facil",
          sobre:
            "No nível fácil, o desenho possui menos quadrados coloridos e padrões mais simples. Observe as cores do modelo e arraste os círculos coloridos para preencher os quadrados corretamente.",
        },
        {
          nivel: "medio",
          sobre:
            "No nível médio, o número de quadrados coloridos aumenta e os padrões ficam mais desafiadores. Preste atenção na posição de cada cor para reproduzir o desenho corretamente.",
        },
        {
          nivel: "dificil",
          sobre:
            "No nível difícil, o desenho possui mais quadrados coloridos e combinações mais complexas. O jogador deverá utilizar atenção, memória visual e planejamento para copiar o padrão exatamente como o modelo apresentado.",
        },
      ],
    },
    {
      id: 6,
      nome: "Cor-respondência",
      logo: require("../assets/CorRespondencia.png"),
      path: "/cor-respondencia",
      sobre:
        "O jogo Cor-respondência trabalha atenção, concentração e controle cognitivo. O objetivo é observar o nome das cores e identificar rapidamente se a cor exibida corresponde ao texto apresentado. Durante a atividade, o cérebro precisa interpretar a palavra e também analisar a cor visual mostrada na tela, estimulando velocidade de raciocínio, foco e flexibilidade mental. Esse exercício pode auxiliar no treinamento da atenção seletiva, memória operacional e controle inibitório, ajudando o usuário a manter o foco mesmo diante de informações conflitantes.",
      niveis: [
        {
          nivel: "facil",
          sobre:
            "No nível fácil, serão exibidas 4 palavras na tela. O usuário deve observar o nome da cor e verificar se a cor apresentada corresponde corretamente ao texto mostrado. Exemplo: a palavra “VERMELHO” pode aparecer escrita na cor vermelha ou em outra cor diferente.",
        },
        {
          nivel: "medio",
          sobre:
            "No nível médio, serão exibidas 6 palavras. A atividade funciona da mesma maneira, porém com uma quantidade maior de estímulos, exigindo mais atenção, rapidez e concentração durante a identificação das cores.",
        },
        {
          nivel: "dificil",
          sobre:
            "No nível difícil, serão exibidas 8 palavras. O usuário deverá analisar rapidamente todas as combinações entre texto e cor, mantendo foco e precisão durante toda a atividade. Esse nível exige maior controle da atenção e velocidade de processamento cognitivo.",
        },
      ],
    },
  ] as IJogos[];

  const nomeacaoBoston = [
    {
      palavra: "cama",
      imagem: "https://openmoji.org/data/color/svg/1F6CF.svg",
      nivel: "facil",
      dicaSemantica: "Um móvel",
      dicaFonetica: "Ca...",
    },
    {
      palavra: "arvore",
      imagem: "https://openmoji.org/data/color/svg/1F332.svg",
      nivel: "facil",
      dicaSemantica: "Algo que cresce ao ar livre",
      dicaFonetica: "Ar...",
    },
    {
      palavra: "lapis",
      imagem: "https://openmoji.org/data/color/svg/270F.svg",
      nivel: "facil",
      dicaSemantica: "Usado para escrever",
      dicaFonetica: "La...",
    },
    {
      palavra: "casa",
      imagem: "https://openmoji.org/data/color/svg/1F3E0.svg",
      nivel: "facil",
      dicaSemantica: "Um tipo de construção",
      dicaFonetica: "Ca...",
    },
    {
      palavra: "faca",
      imagem: "https://openmoji.org/data/color/svg/1F52A.svg",
      nivel: "facil",
      dicaSemantica: "Usado para cortar",
      dicaFonetica: "Fa...",
    },
    {
      palavra: "pente",
      imagem: "https://openmoji.org/data/color/svg/1FAAE.svg",
      nivel: "facil",
      dicaSemantica: "Usado para arrumar o cabelo",
      dicaFonetica: "Pe...",
    },
    {
      palavra: "flor",
      imagem: "https://openmoji.org/data/color/svg/1F33C.svg",
      nivel: "facil",
      dicaSemantica: "Cresce em jardins",
      dicaFonetica: "Flo...",
    },
    {
      palavra: "serra",
      imagem: "https://openmoji.org/data/color/svg/E348.svg",
      nivel: "facil",
      dicaSemantica: "Usado por carpinteiros",
      dicaFonetica: "Ser...",
    },
    {
      palavra: "unicornio",
      imagem: "https://openmoji.org/data/color/svg/1F984.svg",
      nivel: "facil",
      dicaSemantica: "Um animal místico",
      dicaFonetica: "Uni...",
    },
    {
      palavra: "escova de dente",
      imagem: "https://openmoji.org/data/color/svg/1FAA5.svg",
      nivel: "facil",
      dicaSemantica: "Usado para limpar os dentes",
      dicaFonetica: "Es...",
    },
    //medio
    {
      palavra: "helicóptero",
      imagem: "https://openmoji.org/data/color/svg/1F681.svg",
      nivel: "medio",
      dicaSemantica: "Um meio de transporte aéreo",
      dicaFonetica: "He...",
    },
    {
      palavra: "vassoura",
      imagem: "https://openmoji.org/data/color/svg/1F9F9.svg",
      nivel: "medio",
      dicaSemantica: "Usada para limpar",
      dicaFonetica: "Vas...",
    },
    {
      palavra: "polvo",
      imagem: "https://openmoji.org/data/color/svg/1F419.svg",
      nivel: "medio",
      dicaSemantica: "Um animal marinho",
      dicaFonetica: "Pol...",
    },
    {
      palavra: "cogumelo",
      imagem: "https://openmoji.org/data/color/svg/1F344.svg",
      nivel: "medio",
      dicaSemantica: "Algo comestível",
      dicaFonetica: "Co...",
    },
    {
      palavra: "cadeira de rodas",
      imagem: "https://openmoji.org/data/color/svg/E327.svg",
      nivel: "medio",
      dicaSemantica: "Econtrado em hospitais",
      dicaFonetica: "Ca...",
    },
    {
      palavra: "camelo",
      imagem: "https://openmoji.org/data/color/svg/1F42B.svg",
      nivel: "medio",
      dicaSemantica: "Um animal",
      dicaFonetica: "Ca...",
    },
    {
      palavra: "máscara",
      imagem: "https://openmoji.org/data/color/svg/E145.svg",
      nivel: "medio",
      dicaSemantica: "Parte de fantasia",
      dicaFonetica: "Ma...",
    },
    {
      palavra: "lesma",
      imagem: "https://openmoji.org/data/color/svg/1F40C.svg",
      nivel: "medio",
      dicaSemantica: "Um animal",
      dicaFonetica: "Le...",
    },
    {
      palavra: "canoa",
      imagem: "https://openmoji.org/data/color/svg/1F6F6.svg",
      nivel: "medio",
      dicaSemantica: "Usado na água",
      dicaFonetica: "Ca...",
    },
    {
      palavra: "globo",
      imagem: "https://openmoji.org/data/color/svg/1F30E.svg",
      nivel: "medio",
      dicaSemantica: "Representa a Terra",
      dicaFonetica: "Glo...",
    },
    //dificil
    {
      palavra: "esquilo",
      imagem: "https://openmoji.org/data/color/svg/1F9AB.svg",
      nivel: "dificil",
      dicaSemantica: "Um animal",
      dicaFonetica: "Es...",
    },
    {
      palavra: "rinoceronte",
      imagem: "https://openmoji.org/data/color/svg/1F98F.svg",
      nivel: "dificil",
      dicaSemantica: "Um grande animal",
      dicaFonetica: "Ri...",
    },
    {
      palavra: "cacto",
      imagem: "https://openmoji.org/data/color/svg/1F335.svg",
      nivel: "dificil",
      dicaSemantica: "Uma coisa que cresce",
      dicaFonetica: "Ca...",
    },
    {
      palavra: "harpa",
      imagem: "https://openmoji.org/data/color/svg/1FA89.svg",
      nivel: "dificil",
      dicaSemantica: "Um instrumento musical",
      dicaFonetica: "Ha...",
    },
    {
      palavra: "estetoscopio",
      imagem: "https://openmoji.org/data/color/svg/1FA7A.svg",
      nivel: "dificil",
      dicaSemantica: "Usado por médicos e enfermeiras",
      dicaFonetica: "Est...",
    },
    {
      palavra: "piramides",
      imagem: "https://openmoji.org/data/color/svg/E20F.svg",
      nivel: "dificil",
      dicaSemantica: "Encontrada no egito",
      dicaFonetica: "Pi...",
    },
    {
      palavra: "bussola",
      imagem: "https://openmoji.org/data/color/svg/1F9ED.svg",
      nivel: "dificil",
      dicaSemantica: "Usada para se localizar",
      dicaFonetica: "Bu...",
    },
    {
      palavra: "abaco",
      imagem: "https://openmoji.org/data/color/svg/1F9EE.svg",
      nivel: "dificil",
      dicaSemantica: "Usado para contar",
      dicaFonetica: "Aba...",
    },
    {
      palavra: "paleta",
      imagem: "https://openmoji.org/data/color/svg/1F3A8.svg",
      nivel: "dificil",
      dicaSemantica: "Artistas usam",
      dicaFonetica: "Pa...",
    },
    {
      palavra: "transferidor",
      imagem: "https://openmoji.org/data/color/svg/1F4D0.svg",
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
        "mesa",
        "janela",
        "banana",
        "carro",
        "sapato",
        "flor",
        "cadeira",
      ],
    },
    {
      nivel: "medio",
      palavras: [
        "escada",
        "relógio",
        "computador",
        "travesseiro",
        "mercado",
        "bicicleta",
        "telefone",
        "garrafa",
        "hospital",
        "almofada",
      ],
    },
    {
      nivel: "dificil",
      palavras: [
        "laboratório",
        "helicóptero",
        "paralelepípedo",
        "microscópio",
        "astronauta",
        "biblioteca",
        "termômetro",
        "arqueologia",
        "metamorfose",
        "extraordinário",
      ],
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
