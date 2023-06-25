export interface personaNaturalRes{
    personaNatural: personaNatural[]
  }
  //se obtiene la información
  export interface personaNatural{
    id_persona:number,
    dui_persona:string,
    nombre_persona:string,
    apellidos_persona:string,
    genero:string,
    departamento:string,
    municipio:string,
    direccion_persona:string,
    fecha_nacimiento:string
  }

  export interface personaNaturalMsg{
    msg : string;
  }
  //se envia la infor
  export interface personaNaturalRequest{
    dui_persona:string,
    nombre_persona:string,
    apellidos_persona:string,
    genero:string,
    departamento:string,
    municipio:string,
    direccion_persona:string,
    fecha_nacimiento:string
  }
   export interface personaNaturalRequestMsg{
    msg : string;
    id_persona:number,
  }
