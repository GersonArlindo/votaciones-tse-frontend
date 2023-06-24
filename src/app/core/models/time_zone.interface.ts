export interface time_zoneRes{
  timeZone: timeZone[]
  }
  //se obtiene la información
  export interface timeZone{
    time_zone_id : number;
    time_zone_name: string;
    date_created: string;
    date_modify: string;
  }
  
  export interface time_zoneMsg{
    msg : string;
  }
  //se envia la infor
  export interface time_zoneRequest{
    time_zone_name: string;
  }
  
   export interface time_zoneRequestMsg{
    msg : string;
    id: number;
  }