export interface providerRes{
  provider: provider[]
}
//se obtiene la información
export interface provider{
  provider_id : number;
  provider_name: string;
  status: string;
  description_provider: string;
  date_created: string;
  date_modify: string
}

export interface providerMsg{
  msg : string;
}
//se envia la infor
export interface providerRequest{
  provider_name: string;
  status: string;
  description_provider: string;
}
 export interface providerRequestMsg{
  msg : string;
  id: number;
}
