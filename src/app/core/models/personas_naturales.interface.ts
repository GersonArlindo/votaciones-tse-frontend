  //se obtiene la información
  export interface personaNatural{
    id_persona_natural: number
    dui: string
    nombres: string
    apellidos: string
    genero: string
    detalle_direccion: string
    fecha_nacimiento: string
    id_municipio: number
    fecha_vencimiento_dui: string
    creado_en: string
  }

  export interface personaNaturalMsg{
    msg : string;
  }
  //se envia la infor
  export interface personaNaturalRequest{
    dui: string
    nombres: string
    apellidos: string
    genero: string
    detalle_direccion: string
    fecha_nacimiento: string
    id_municipio: number
    fecha_vencimiento_dui: string
  }
   export interface personaNaturalRequestMsg{
    msg : string;
    id_persona_natural:number,
  }
