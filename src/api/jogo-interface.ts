export interface INiveis {
  nivel: "facil" | "medio" | "dificil";
  sobre: string;
}

export interface IJogos {
  id: number;
  nome: string;
  logo: string;
  path: string;
  sobre: string;
  niveis: INiveis[];
}

export interface INomeacaoBoston {
  id: number;
  palavra: string;
  imagem: string;
  nivel: string;
  dicaSemantica: string;
  dicaFonetica: string;
}

export interface ITestePalavras {
  nivel: string;
  palavras: string[];
}
