export interface roleRes{
    role: role[]
  }
  //se obtiene la información
  export interface role{
    rol_id : number;
    rol_rol: string;
    rol_descripcion: string;
    rol_created: string;
    rol_modify: string
  }
  
  export interface roleMsg{
    msg : string;
  }
  //se envia la infor
  export interface roleRequest{
    role_name: string;
  }
   export interface roleRequestMsg{
    msg : string;
    id: number;
  }
  