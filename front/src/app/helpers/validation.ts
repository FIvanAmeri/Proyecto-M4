import validator from "validator";

export const validateEmail = (e: string) => {
    let validation = "";
    if(!validator.isEmail(e)) validation = "El email no se encuentra registrado";
     return validation;
}

export const validatePassword = (p: string) => {
    let validation = "";
    if(!validator.isLength(p, {min:4, max:8})) validation = "El password debe contener un mínimo de 4 caracteres y un máximo de 8 caracteres";
    return validation;
} 