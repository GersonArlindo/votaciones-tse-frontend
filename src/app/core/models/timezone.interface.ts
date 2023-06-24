export interface timezoneRes{
  timezone: timezone[]
}

//se obtiene la información
export interface timezone{
  time_zone_id : number;
  time_zone_name: string;
  date_created: string;
  date_modify: string
}

export interface timezoneMsg{
  msg : string;
}

//se envia la infor-
export interface timezoneRequest{
  time_zone_name: string;
}

 export interface timezoneRequestMsg{
  msg : string;
  id: number;
}
