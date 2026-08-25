'use client'

import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Profissional } from '../types/config'
import { maskPhone } from '@/lib/utils'
import { professionalSchema, ProfessionalFormData } from '../types/config' // ajuste o caminho se necessário

interface ProfessionalModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: ProfessionalFormData, profissionalId?: string) => void
  profissionalParaEditar?: Profissional | null
  isLoading?: boolean
}

export function ProfessionalModal({ 
  isOpen, 
  onClose, 
  onSave, 
  profissionalParaEditar,
  isLoading = false
}: ProfessionalModalProps) {
  const isEditing = !!profissionalParaEditar

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ProfessionalFormData>({
    resolver: yupResolver(professionalSchema),
    defaultValues: {
      nome: '',
      area: 'salao',
      tipo: 'Funcionária',
      telefone: '',
      email: '',
      comissao_percentual: 0,
      ativo: true
    }
  })

  // Preenche ou limpa o formulário quando abre/muda a edição
  useEffect(() => {
    if (profissionalParaEditar) {
      reset({
        nome: profissionalParaEditar.nome || '',
        area: (profissionalParaEditar.area as 'salao' | 'terapia') || 'salao',
        tipo: profissionalParaEditar.tipo || 'Funcionária',
        telefone: profissionalParaEditar.telefone ? maskPhone(profissionalParaEditar.telefone) : '',
        email: profissionalParaEditar.email || '',
        comissao_percentual: profissionalParaEditar.comissao_percentual ?? 0,
        ativo: profissionalParaEditar.ativo ?? true
      })
    } else {
      reset({
        nome: '',
        area: 'salao',
        tipo: 'Funcionária',
        telefone: '',
        email: '',
        comissao_percentual: 0,
        ativo: true,
      })
    }
  }, [profissionalParaEditar, isOpen, reset])

  const onSubmit = (data: ProfessionalFormData) => {
    onSave(data, profissionalParaEditar?.id)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white rounded-2xl p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditing ? 'Editar Profissional' : 'Nova Profissional'}
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            {isEditing 
              ? 'Atualize os dados cadastrais da profissional.' 
              : 'O percentual informado é aplicado sobre o valor bruto de cada serviço realizado.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          {/* Nome */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Nome completo *</label>
            <Input
              type="text"
              placeholder="Nome da profissional"
              {...register('nome')}
              className="border-gray-300 focus-visible:ring-[#6b3838]"
            />
            {errors.nome && (
              <span className="text-[11px] text-red-500 mt-1 block">{errors.nome.message}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Tipo */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tipo *</label>
              <Controller
                name="tipo"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="border-gray-300 focus:ring-[#6b3838]">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Funcionária">Funcionária</SelectItem>
                      <SelectItem value="Proprietária">Proprietária</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.tipo && (
                <span className="text-[11px] text-red-500 mt-1 block">{errors.tipo.message}</span>
              )}
            </div>

            {/* Área */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Área de Atendimento *</label>
              <Controller
                name="area"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="border-gray-300 focus:ring-[#6b3838]">
                      <SelectValue placeholder="Selecione a área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salao">Salão</SelectItem>
                      <SelectItem value="terapia">Terapia Capilar</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.area && (
                <span className="text-[11px] text-red-500 mt-1 block">{errors.area.message}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Comissão */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Comissão (%) *</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                max="100"
                {...register('comissao_percentual')}
                className="border-gray-300 focus-visible:ring-[#6b3838]"
              />
              {errors.comissao_percentual ? (
                <span className="text-[11px] text-red-500 mt-1 block">{errors.comissao_percentual.message}</span>
              ) : (
                <span className="text-[10px] text-gray-400">Proprietária normalmente 100%</span>
              )}
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Telefone</label>
              <Input
                type="text"
                placeholder="(00) 00000-0000"
                {...register('telefone')}
                onChange={(e) => {
                  const masked = maskPhone(e.target.value)
                  setValue('telefone', masked, { shouldValidate: true })
                }}
                className="border-gray-300 focus-visible:ring-[#6b3838]"
              />
              {errors.telefone && (
                <span className="text-[11px] text-red-500 mt-1 block">{errors.telefone.message}</span>
              )}
            </div>
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">E-mail</label>
            <Input
              type="email"
              placeholder="nome@email.com"
              {...register('email')}
              className="border-gray-300 focus-visible:ring-[#6b3838]"
            />
            {errors.email && (
              <span className="text-[11px] text-red-500 mt-1 block">{errors.email.message}</span>
            )}
          </div>

          {/* Ativo */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              <span className="text-sm font-medium text-gray-700 block">Profissional ativa</span>
              <span className="text-xs text-gray-400">Somente profissionais ativas aparecem nos atendimentos.</span>
            </div>
            <Controller
              name="ativo"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="w-5 h-5 accent-[#6b3838] cursor-pointer"
                />
              )}
            />
          </div>

          <DialogFooter className="pt-4 border-t flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#6b3838] hover:bg-[#532a2a] text-white"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}