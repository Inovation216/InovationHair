import * as yup from "yup";

export const signupSchema = yup.object({
  email: yup.string().email("Email inválido").required("O email é obrigatório"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("A senha é obrigatória"),
});

export type SignupFormData = yup.InferType<typeof signupSchema>;