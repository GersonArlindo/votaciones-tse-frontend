export interface assign_appmtRes{
  assignAppointment: assignAppointment[]
}
  //se obtiene la información
  export interface assignAppointment{
    appointment_id: number, 
    id_provider: number,
    lead_id: number,
    id_sales_rep: number,
    user_id: number,
    id_language: number,
    bill_amount: string,
    credit_score: string,
    bankrupcy: string,
    id_energy_provider: number,
    anual_usage: string,
    id_roof: number,
    roof_age: number,
    replace_roof: string,
    meter_location: string,
    meter_number: number,
    account_number: number,    
    appointment_type: string,
    appointment_datetime: string,
    id_timezone: number,
    state_id: number,
    status: string,
    attendance_confirmed: string,
    attendance_confirmed_date_time: string,
    design_lead: string,
    design_notes: string,
    approved_by: string,
    doc_pending: string,
    client_think: string,
    appt_outcome_id: number,
    disqualification_id: number,
    crc_date: string,
    financier: string,
    date_created: string,
    created_by: number,
    date_modify: string,
    modify_by: number,
    tbl_sales_rep: {
      sales_rep_id: number;
      user_id: number;
      state_id: number;
      appointment_type_availability: string;
      appt_status: string;
      tbl_user: {
          user_id: number;
          first_name: string;
          last_name: string;
          username: string;
          user_images: string;
          email: string;
          phone_number: string;
        }
    }
  }
  
  export interface assign_appmtMsg{
    msg : string;
  }
  //se envia la infor
  export interface assign_appmtRequest{ 
    id_provider: number,
    lead_id: number,
    id_sales_rep: number,
    user_id: number,
    id_language: number,
    bill_amount: string,
    credit_score: string,
    bankrupcy: string,
    id_energy_provider: number,
    anual_usage: string,
    id_roof: number,
    roof_age: number,
    replace_roof: string,
    meter_location: string,
    meter_number: number,
    account_number: number,    
    appointment_type: string,
    appointment_datetime: string,
    id_timezone: number,
    state_id: number,
    status: string,
    attendance_confirmed: string,
    attendance_confirmed_date_time: string,
    design_lead: string,
    design_notes: string,
    approved_by: string,
    doc_pending: string,
    client_think: string,
    appt_outcome_id: number,
    disqualification_id: number,
    crc_date: string,
    financier: string,
    created_by: number,
    modify_by: number,
    tbl_sales_rep: {
      sales_rep_id: number;
      user_id: number;
      state_id: number;
      appointment_type_availability: string;
      appt_status: string;
      tbl_user: {
          user_id: number;
          first_name: string;
          last_name: string;
          username: string;
          user_images: string;
          email: string;
          phone_number: string;
        }
    }
  }

  export interface assign_appmtGlobalMsg{
    msg: string;
  }

   export interface assign_appmtRequestMsg{
    msg : string;
    id: number;
  }
  