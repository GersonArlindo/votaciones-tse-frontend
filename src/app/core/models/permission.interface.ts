export interface permissionsRes{
    permission: permissionsRes[];
}

export interface permission{
    per_id: number;
    mod_id: number;
    rol_id: number;
    create: number;
    read: number;
    update: number;
    deleted: number;
    status: number;
    tbl_modulo: {
        mod_id: number;
        mod_nombre: string;
    };
    tbl_role: {
        rol_id: number;
        rol_rol: string
        rol_descripcion: string;
    }
}

export interface addEditPermission{
    per_nombre: string;
    mod_id: number;
}

export interface permissionMsg{
    msg: string;
    id: number;
}

export interface permissionGlobalMsg{
    msg: string;
}

export interface permissionByModuleRes{
    permission: permissionByModule[];
}

export interface permissionByModule{
    per_id: number;
    per_nombre: string;
    mod_id: number;
}