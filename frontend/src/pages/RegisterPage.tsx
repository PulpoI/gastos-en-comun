import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { signup } = useAuth();

  const onSubmit = handleSubmit((values) => {
    signup(values);
  });

  return (
    <div>
      <h2>RegisterPage</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("name")}
          placeholder="Nombre de usuario"
          required
        />
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          required
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Contraseña"
          required
        />

        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
};

export default RegisterPage;
