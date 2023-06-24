export interface rolpermissionRes{
    rolpermission: rolpermission[];
}

export interface rolpermission{
    rol_permiso_id: number;
    rol_id: number;
    permission_id: number;
    tbl_permiso: {
        per_id: number
        per_nombre: string;
    },
    tbl_role: {
        rol_id: number;
        rol_rol: string;
        rol_descripcion: string;
    }
}

export interface rolpermissionAdd{
    rol_id: number;
    permission_id: number;
}

export interface rolpermissionUpdate{
    rol_id: number;
    permission_id: number;
}

export interface rolpermissionGlobalRes{
    msg: string;
    id: number;
}