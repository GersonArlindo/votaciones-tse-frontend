export interface roofRes{
  roof: roof[]
}
//se obtiene la información
export interface roof{
  roof_id : number;
  roof_nombre: string;
  description_roof : string;
  date_created : string;
  date_modify	: string
}

export interface roofMsg{
  msg : string;
}

//se envia la infor
export interface roofRequest{
  roof_nombre: string;
}
 export interface roofRequestMsg{
  msg : string;
  id: number;
}
