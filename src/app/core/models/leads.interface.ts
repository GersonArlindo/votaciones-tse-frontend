export interface leadsRes{
    lead: leads[]
  }
  //se obtiene la información
  export interface leads{
    id_l : number;
    lead_id : string;
    first_name: string;
    last_name : string;
    phone_number : string;
    email : string;
    st_address : string;
    city: string;
    state : string;
    zip_code : string;
    full_address : string;
    source : string;
    campaign_name : string;
    ad_set_name : string;
    ad_name : string;
    ad_account_id : string;
    agent_assigned : string;
    outcome : string;
    tags : string;
    notes : string;
    home_owner: string;
    bill_amount: string;
    date_create: string;
    date_modify: string
    modification_by : string;
  }
  
  export interface leadsMsg{
    msg : string;
  }
  //se envia la infor
  export interface leadsRequest{
    id_l : number;
    first_name : string;
    last_name : string;
    phone_number : string;
    email : string;
    st_address : string;
    city: string;
    state : string;
    zip_code : string;
    full_address : string;
    source : string;
    campaign_name : string;
    ad_set_name : string;
    ad_name : string;
    ad_account_id : string;
    outcome : string;
    tags : string;
    notes : string;
    home_owner: string;
    bill_amount: string;
  }

   export interface leadsRequestMsg{
    msg : string;
    id: number;
  }
  
  