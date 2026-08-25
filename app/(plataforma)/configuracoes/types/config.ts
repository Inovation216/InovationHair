import * as yup from 'yup'
import { Database } from "@/types/database"

export type Profissional = Database['public']['Tables']['profissionais']['Row']
export type ProfissionalInsert = Database['public']['Tables']['profissionais']['Insert']
export type ProfissionalUpdate = Database['public']['Tables']['profissionais']['Update']

// Tipo para o Profile
export type Profile = Database['public']['Tables']['profiles']['Row']

export const professionalSchema = yup.object({
  nome: yup.string().required('O nome completo é obrigatório'),
  tipo: yup.string().required('O tipo é obrigatório'),
  area: yup.string().oneOf(['salao', 'terapia']).required('A área de atendimento é obrigatória'),
  comissao_percentual: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, 'A comissão mínima é 0%')
    .max(100, 'A comissão máxima é 100%')
    .required('A comissão é obrigatória'),
  telefone: yup.string().nullable().notRequired(),
  email: yup.string().email('Digite um e-mail válido').nullable().notRequired(),
  ativo: yup.boolean().required(),
})

export type ProfessionalFormData = yup.InferType<typeof professionalSchema>