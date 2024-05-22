export interface Empleado {
    id:number,
    primer_apellido:string,
    primer_nombre:string,
    segundo_apellido:string,
    otro_nombre:string,    
    paise_id:number,
    tipo_identificacion_id:number,
    numero_identificacion:string,
    email:string,
    fecha_ingreso:string,
    area_id:number,
    estado:string,
    created_at:string,
    updated_at:string
}

export interface EmpleadoCreate {
    primer_apellido:string,
    primer_nombre:string,
    segundo_apellido:string,
    otro_nombre:string,    
    paise_id:number,
    tipo_identificacion_id:number,
    numero_identificacion:string,
    fecha_ingreso:string,
    area_id:number,
    estado:string
}