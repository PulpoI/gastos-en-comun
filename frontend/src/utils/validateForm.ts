import * as yup from "yup";

export const LoginValidate = yup.object().shape({
  email: yup.string().email().required("El email es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});
