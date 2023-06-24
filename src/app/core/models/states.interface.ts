export interface statesRes{
    states: states[]
  }
  //se obtiene la información
  export interface states{
    state_id : number;
    name_state: string;
    abbreviation: string;
    covered_virtually: number;
    covered_inperson: number;
    status: string;
    date_created: string;
    date_modify: string;
  }
  
  export interface statesMsg{
    msg : string;
  }
  //se envia la infor
  export interface statesRequest{
    name_state: string;
    abbreviation: string;
    covered_virtually: number;
    covered_inperson: number;
    status: string;
  }
  
   export interface statesRequestMsg{
    msg : string;
    id: number;
  }