export interface energy_providerRes{
  energy_provider: energy_provider[]
}

//se obtiene la información
export interface energy_provider{
  energy_provider_id : number;
  energy_provider_name: string;
  energy_provider_description: string;
  date_created: string;
  date_modify: string;
}

export interface energy_providerMsg{
  msg : string;
}

//se envia la infor
export interface energy_providerRequest{
  energy_provider_name: string;
  energy_provider_description: string;
}

export interface energy_providerRequestMsg{
  msg : string;
  id: number;
}
