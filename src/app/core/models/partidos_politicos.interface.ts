export interface partidosPoliticosRes{
    partidosPoliticos: partidosPoliticos[];
}

export interface partidosPoliticos{
    id_partido : number;
    nombre: string;
    sigla: string;
    direccion: number;
    telefono: string;
    representante_legal: string;
    estado: string;
    imagen: string;
}

export interface addEditPartidosPoliticos{
    nombre: string;
    sigla: string;
    direccion: number;
    telefono: string;
    representante_legal: string;
    estado: string;
    imagen: string;
}

export interface partidosPoliticosMsg{
    msg: string;
    id: number;
}

export interface partidosPoliticosGlobalMsg{
    msg: string;
}