export interface loginRes{
    token: string;
}

export interface login{
    email: string;
    password: string;
}

export interface reponseGlobalAuth{
    msg: string;
}

export interface reponseUserMsg{
    msg: string;
}

export interface getUserResponse{
    users: users[];
}

export interface getUserResponseData{
    users: users[];
}

export interface users{
    user_id: number;
    first_name: string;
    last_name: string;
    username: string;
    user_images: string;
    email: string;
    password: string;
    phone_number: string;
    language_id: number;
    rol_id: number;
    manager: number;
    status: string;
    date_created: string;
    date_modify: string;
    tbl_language: {
        language_id: number;
        language_name: string;
    },
    tbl_role: {
        rol_id: number;
        rol_rol: string;
        rol_descripcion: string;
    }
}

