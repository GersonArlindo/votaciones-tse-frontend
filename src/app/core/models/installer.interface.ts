export interface installersRes{
    installers: installers[];
}

export interface installers{
    installer_id: number;
    epc_name: string;
    installers_images: string;
    state_id: number;
    contact_email: string;
    installers_phone: string;
    date_created: string;
    created_by: string;
    date_modify: string;
    tbl_state: {
        state_id: number;
        name_state: string;
        covered_virtually: string;
        covered_inperson: string;
        status: string;
    }
}

export interface addEditInstaller{
    epc_name: string;
    installers_images: string;
    state_id: number; 
    contact_email: string; 
    installers_phone: string;
}

export interface installersMsg{
    msg: string;
    id: number;
}

export interface installersGlobalMsg{
    msg: string;
}