export interface appointmentOutcomeRes{
  appointmentOutcome: appointmentOutcome []
}
//se obtiene la información
export interface appointmentOutcome{
  apptm_outcome_id  : number;
  apptm_outcome_name: string;
  date_created: string;
  date_modify: string
}

export interface appointmentOutcomeMsg{
  msg : string;
}
//se envia la infor
export interface appointmentOutcomeRequest{
  apptm_outcome_name: string;
}
 export interface appointmentOutcomeRequestMsg{
  msg : string;
  id: number;
}
