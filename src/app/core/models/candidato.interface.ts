

    //se obtiene la información
    export interface candidato{
        id_candidato: number,
        estado: string,
        foto_candidato: string,
        creado_en: string,
        modificado_en: string,
        id_partido_politico: number,
        id_persona_natural: number,
        partido_politico: {
          nombre: string,
          logo: string,
          siglas: string
        },
        informacion_personal: {
          nombres: string,
          apellidos: string,
          fecha_nacimiento: string,
          dui: string,
          genero: string
        }
      }
      
    
      export interface candidatoMsg{
        msg : string;
      }
      
      //se envia la infor
      export interface candidatoRequest{
        estado: string,
        foto_candidato: string,
        creado_en: string,
        modificado_en: string,
        id_partido_politico: number,
        id_persona_natural: number,
      }
       export interface candidatoRequestMsg{
        msg : string;
        id_candidato:number,
      }
    