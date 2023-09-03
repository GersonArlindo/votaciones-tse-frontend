  //se obtiene la información
  export interface jrv{
    id_jrv: number,
    id_centro_votacion: number,
    codigo: string,
    estado: string,
    creado_en: string,
    modificado_en: string,
    centro_votacion: {
      id_centro_votacion: number,
      id_municipio: number,
      nombre: string,
      direccion: string,
      estado: string,
      creado_en: string,
      modificado_en: string
    },
    jrv_miembros: []
  }

  export interface jrvMsg{
    msg : string;
  }
  //se envia la infor
  export interface jrvRequest{
    id_centro_votacion: number,
    codigo: string,
    estado: string,
    creado_en: string,
    modificado_en: string,
    centro_votacion: {
      id_centro_votacion: number,
      id_municipio: number,
      nombre: string,
      direccion: string,
      estado: string,
      creado_en: string,
      modificado_en: string
    },
    jrv_miembros: []
  }
   export interface jrvRequestMsg{
    msg : string;
    id_jrv:number,
  }
