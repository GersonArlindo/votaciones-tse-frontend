export interface languageRes{
    lenguage: lenguage[]
  }
  //se obtiene la información
  export interface lenguage{
    language_id : number;
    language_name: string;
    date_created: string;
    date_modify: string
  }
  
  export interface lenguageMsg{
    msg : string;
  }
  //se envia la infor
  export interface lenguageRequest{
    language_name: string;
  }
   export interface lenguageRequestMsg{
    msg : string;
    id: number;
  }
  