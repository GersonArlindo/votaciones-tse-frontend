export interface moduleRes{
  module: module[]
}
//se obtiene la información
export interface module{
  mod_id : number;
  mod_nombre: string;
}

export interface moduleMsg{
  msg : string;
}
//se envia la infor
export interface moduleRequest{
  mod_nombre: string;
}

export interface moduleRequestMsg{
  msg : string;
  id: number;
}
