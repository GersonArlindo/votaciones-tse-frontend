export interface partidosPoliticos{
    id_partido_politico: number,
    nombre: string,
    siglas: string,
    logo: string,
    estado: string,
    creado_en: string,
    modificado_en: string,
    candidatos: [
      {
        id_candidato: number,
        informacion_personal: {
          nombres: string,
          apellidos: string,
          fecha_nacimiento: string,
          dui: string,
          genero: string
        }
      }]
}

export interface partidosPoliticosMsg{
  msg: string;
  id_partido_politico: number;
}

export interface partidosPoliticosGlobalMsg{
  msg: string;
}
