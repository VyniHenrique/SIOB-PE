export type InputsOcorrencia = {
  id: string;
  diretoria: string;
  viatura: string;
  numeroViatura: string;
  numeroAviso: string;
  codigoLocalOcorrencia: string;
  grupamento: string;
  dataHoraAcionamento: Date;
  pontoBase: string;
  formaAcionamento: string;
  localAcionamento: string;
  regiaoAcionamento: string;
  ais: string;
  municipio: string;
  bairro: string;
  tipoLogradouro: string;
  logradouro: string;
  naturezaOcorrencia: string;
  subgrupoOcorrencia: string;
  situacaoOcorrencia: "ATENDIDA" | "EM_ANDAMENTO" | "NAO_ATENDIDA";
};

export type InputsLogin = {
  login: string;
  senha: string;
}