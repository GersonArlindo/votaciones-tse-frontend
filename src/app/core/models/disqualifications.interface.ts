export interface disqualificationsRes{
    disqualification: disqualification[]
  }
  //se obtiene la información
  export interface disqualification{
    disqualification_id : number;
    disqualification_name: string;
    date_created: string;
    date_modify: string;
  }
  
  export interface disqualificationMsg{
    msg : string;
  }
  //se envia la infor
  export interface disqualificationRequest{
    disqualification_name: string;
  }
   export interface disqualificationRequestMsg{
    msg : string;
    id: number;
  }
  