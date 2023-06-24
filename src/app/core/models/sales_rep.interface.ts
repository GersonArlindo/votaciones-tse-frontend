
export interface salesRepRes {
  salesRep: salesRep[];
}
//se obtiene la información
export interface salesRep {
  sales_rep_id: number;
  user_id: number;
  state_id: number;
  appointment_type_availability: string;
  appt_status: string;
  color_appt: string;
  date_created: string;
  created_by: string;
  date_modify: string;
  tbl_user: {
      user_id: number;
      first_name: string;
      last_name: string;
      username: string;
      user_images: string;
      email: string
      phone_number: string;
      tbl_language: {
          language_id: number;
          language_name: string;
      }
  },
  tbl_state: {
      state_id: number;
      name_state: string;
      covered_virtually: string;
      covered_inperson: string;
      status: string;
  }
}

export interface salesRepMsg {
  msg: string;
}
//se envia la infor
export interface salesRepRequest {
  user_id: number;
  state_id: number;
  appointment_type_availability: string;
  appt_status: string;
}
export interface salesRepRequestMsg {
  msg: string;
  id: number;
}


export interface salesRepRes{
  salesRep: salesRep[]
  }
  //se obtiene la información
  export interface salesRep{
    sales_rep_id: number;
    user_id: number;
    state_id: number;
    appointment_type_availability: string;
    appt_status: string;
    color_appt: string;
    date_created: string;
    created_by: string;
    date_modify: string;
    tbl_user: {
        user_id: number;
        first_name: string;
        last_name: string;
        username: string;
        user_images: string;
        email: string
        phone_number: string;
        tbl_language: {
            language_id: number;
            language_name: string;
        }
    },
    tbl_state: {
        state_id: number;
        name_state: string;
        covered_virtually: string;
        covered_inperson: string;
        status: string;
    }
  }
  
  export interface salesRepMsg{
    msg : string;
  }
  //se envia la infor
  export interface salesRepRequest{
    user_id: number;
    state_id: number;
    appointment_type_availability: string;
    appt_status: string;
  }
   export interface salesRepRequestMsg{
    msg : string;
    id: number;
  }
  

export interface salesRepRes {
  salesRep: salesRep[];
}
//se obtiene la información
export interface salesRep {
  sales_rep_id: number;
  user_id: number;
  state_id: number;
  appointment_type_availability: string;
  appt_status: string;
  color_appt: string;
  date_created: string;
  created_by: string;
  date_modify: string;
  tbl_user: {
      user_id: number;
      first_name: string;
      last_name: string;
      username: string;
      user_images: string;
      email: string
      phone_number: string;
      tbl_language: {
          language_id: number;
          language_name: string;
      }
  },
  tbl_state: {
      state_id: number;
      name_state: string;
      covered_virtually: string;
      covered_inperson: string;
      status: string;
  }
}

export interface salesRepMsg {
  msg: string;
}
//se envia la infor
export interface salesRepRequest {
  user_id: number;
  state_id: number;
  appointment_type_availability: string;
  appt_status: string;
}
export interface salesRepRequestMsg {
  msg: string;
  id: number;
}

