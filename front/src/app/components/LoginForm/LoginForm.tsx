"use client";

import { AuthContext } from "@/app/contexts/authContext";
import { validateEmail, validatePassword } from "@/app/helpers/validation";
import { login } from "@/app/services/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import swal from "sweetalert";

const LoginForm = () => {

  const {setUser}= useContext(AuthContext);

  const router = useRouter();
  const initialData = { email: "", password: "" };
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [session, setSession]=useState(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const res = await login(data);
    
    if (res.statusCode) {
      swal("Error", res.message, "error");
    } else {
      swal({
        title: "¡Login exitoso!",
        text: "Bienvenido!! ¡Esperamos que disfrutes tu experiencia!",
        icon: "success",
        buttons: ["Continuar"],
      });
      setUser(res);
      router.push("/"); 
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const canSubmit = () => {
    return !validateEmail(data.email) && !validatePassword(data.password);
  };

  useEffect(() => {
    setErrors({
      email: validateEmail(data.email),
      password: validatePassword(data.password),
    });
  }, [data]);

  return (
    <form
      className="login-container flex flex-col gap-5 bg-primary border border-black custom-shadow rounded-xl mt-8"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 text-center mt-4">
          Usuario
        </label>
        <input
  className={`bg-tertiary border text-gray-900 text-sm rounded-lg block w-80 p-2.5 mx-auto hover:bg-customHover ${
    touched.email && errors.email ? "bg-red-700" : ""
  } ${
    touched.email && !errors.email && data.email ? "bg-green-500" : ""
  }`.trim()}
  placeholder="name@flowbite.com"
  type="text"
  name="email"
  onChange={handleChange}
  value={data.email}
  onBlur={handleBlur}
/>

        {touched.email && <p className="text-red-700">{errors.email}</p>}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 text-center">
          Contraseña
        </label>
        <input
          className={`bg-tertiary border text-gray-900 text-sm rounded-lg block w-80 p-2.5 mx-auto hover:bg-customHover
            ${touched.password && errors.password ? "bg-red-700" : ""}
            ${touched.password && !errors.password && data.password ? "bg-green-500" : ""}
          `}
          placeholder="Ingresá tu contraseña"
          type="password"
          name="password"
          onChange={handleChange}
          value={data.password}
          onBlur={handleBlur}
        />
        {touched.password && <p className="text-red-700">{errors.password}</p>}
      </div>
      <button
        className={`text-white
          bg-purple-300
          hover:bg-blue-800
          focus:ring-4 
          focus:outline-none
          focus:ring-blue-300
          font-medium 
          rounded-lg 
          text-sm
          w-full
          sm:w-[10rem]
          mx-auto
          px-5 py-2.5
          text-center
          ${errors.email || errors.password || !data.email || !data.password ? "pointer-events-none opacity-50 text-red-400" : ""}
        `}
        disabled={!canSubmit()}
        type="submit"
      >
        Ingresar
      </button>

      <p className="ml-10">¿No tienes cuenta?</p>
      <Link
        href={"/register"}
        className="text-black -mt-12 font-bold  rounded-lg text-lg mx-auto text-center underline"
      >
        Registrate
      </Link>
    </form>
  );
};

export default LoginForm;
