export const validateRegisterForm = (data: {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
}) => {
  const errors = {
    nameError: "",
    emailError: "",
    addressError: "",
    phoneError: "",
    passwordError: "",
    confirmPasswordError: "",
  };

  if (!data.name) {
    errors.nameError = "El nombre y apellido es requerido.";
  }

  if (!data.email) {
    errors.emailError = "El email es requerido.";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.emailError = "Dirección de email inválida.";
  }

  if (!data.address) {
    errors.addressError = "La dirección es requerido.";
  } else if (data.address.length > 75) {
    errors.addressError = "No se permite más de 75 caracteres.";
  } else if (/[^a-zA-Z0-9\s.,-]/.test(data.address)) {
    errors.addressError = "La dirección no debe contener caracteres especiales.";
  }
  if (!data.phone) {
    errors.phoneError = "El número de teléfono es requerido.";
  } else if (!/^\d+$/.test(data.phone)) {
    errors.phoneError = "El número de teléfono solo puede contener números.";
  } else if (data.phone.length > 10) {
    errors.phoneError = "No se permiten más de 10 números.";
  }

  if (!data.password) {
    errors.passwordError = "La contraseña es requerido.";
  } else if (data.password.length < 6) {
    errors.passwordError = "La contraseña debe tener al menos 6 caracteres.";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPasswordError = "La contraseña no coincide.";
  }

  return errors;
};
