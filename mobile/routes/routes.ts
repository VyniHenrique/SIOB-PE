export const API_URl_POST = `http:${process.env.EXPO_PUBLIC_IP_LOCAL}:8080/ocorrencia`;

export const API_URl_FIND_ALL_INCIDENTS= `https://siobpe-api.onrender.com/ocorrencia`;

export const API_URl_UPDATE = (id: string) => `https://siobpe-api.onrender.com/ocorrencia/${id}`;

export const API_LOGIN  = "https://siobpe-api.onrender.com/usuario";