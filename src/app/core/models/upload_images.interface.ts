export interface upload_imagesResponse{
    resources: resourcesImages[];
}

export interface resourcesImages{
    id_image: number;
    appointment_id: any;
    ruta_image: any;
    type_img: any;
}

export interface ResGloblal{
    msg: string;
}