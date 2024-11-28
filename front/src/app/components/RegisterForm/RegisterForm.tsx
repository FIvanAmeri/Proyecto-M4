"use client";

import React, { useState, ChangeEvent, FormEvent, FocusEvent } from "react";
import { validateRegisterForm } from "../../helpers/validateRegister";
import swal from "sweetalert";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { register } from "@/app/services/auth";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    address: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateRegisterForm(data);

    if (
      validationErrors.nameError ||
      validationErrors.emailError ||
      validationErrors.addressError ||
      validationErrors.phoneError ||
      validationErrors.passwordError ||
      validationErrors.confirmPasswordError
    ) {
      setErrors({
        name: validationErrors.nameError,
        email: validationErrors.emailError,
        address: validationErrors.addressError,
        phone: validationErrors.phoneError,
        password: validationErrors.passwordError,
        confirmPassword: validationErrors.confirmPasswordError,
      });
      swal("Error", "Por favor, revisa los campos y corrige los errores.", "error");
      return;
    }

    setIsSubmitting(true);
    setErrors({ name: "", email: "", address: "", phone: "", password: "", confirmPassword: "" });

    try {
      const res = await register(data);

      if (res.statusCode) {
        const customMessage = res.message.includes("El usuario ya existe")
          ? "El usuario ya está registrado, intenta con otro email."
          : res.message;

        swal("Tenemos un problema", customMessage, "error");
      } else {
        swal("¡Registro exitoso!", "Te has registrado correctamente.", "success");
        setData({
          name: "",
          email: "",
          address: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        router.push("/login");
      }
    } catch (error) {
      console.error("Error en el registro", error);
      swal("Error", "Ocurrió un problema durante el registro. Inténtalo de nuevo.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    const validationErrors = validateRegisterForm(data);
    setErrors({
      name: name === "name" ? validationErrors.nameError : errors.name,
      email: name === "email" ? validationErrors.emailError : errors.email,
      address: name === "address" ? validationErrors.addressError : errors.address,
      phone: name === "phone" ? validationErrors.phoneError : errors.phone,
      password: name === "password" ? validationErrors.passwordError : errors.password,
      confirmPassword:
        name === "confirmPassword"
          ? validationErrors.confirmPasswordError
          : errors.confirmPassword,
    });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
    const validationErrors = validateRegisterForm(data);
    setErrors({
      name: validationErrors.nameError,
      email: validationErrors.emailError,
      address: validationErrors.addressError,
      phone: validationErrors.phoneError,
      password: validationErrors.passwordError,
      confirmPassword: validationErrors.confirmPasswordError,
    });
  };

  const isFormValid =
    !errors.name &&
    !errors.email &&
    !errors.address &&
    !errors.phone &&
    !errors.password &&
    !errors.confirmPassword &&
    Boolean(data.name) &&
    Boolean(data.email) &&
    Boolean(data.password) &&
    Boolean(data.confirmPassword);

  return (
    <form
      className="register-container flex flex-col gap-5 bg-primary border border-black custom-shadow rounded-xl mt-8"
      onSubmit={handleSubmit}
    >
      <InputField
        id="name"
        label="Nombre y apellido"
        type="text"
        name="name"
        value={data.name}
        error={errors.name}
        touched={touched.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Pedro Gomez"
      />
      <InputField
        id="email"
        label="Email"
        type="email"
        name="email"
        value={data.email}
        error={errors.email}
        touched={touched.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="usuario@correo.com"
      />
      <InputField
        id="address"
        label="Dirección"
        type="text"
        name="address"
        value={data.address}
        error={errors.address}
        touched={touched.address}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Calle Falsa 123"
      />
      <InputField
        id="phone"
        label="Teléfono"
        type="text"
        name="phone"
        value={data.phone}
        error={errors.phone}
        touched={touched.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="341-8888888"
      />
      <InputField
        id="password"
        label="Contraseña"
        type="password"
        name="password"
        value={data.password}
        error={errors.password}
        touched={touched.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Poroto123!"
      />
      <InputField
        id="confirmPassword"
        label="Confirmar contraseña"
        type="password"
        name="confirmPassword"
        value={data.confirmPassword}
        error={errors.confirmPassword}
        touched={touched.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Poroto123!"
      />
      {submitMessage && (
        <p
          className={`text-sm ${submitMessage.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
        >
          {submitMessage}
        </p>
      )}
      <SubmitButton isSubmitting={isSubmitting} isFormValid={isFormValid} />
    </form>
  );
};

export default RegisterForm;
