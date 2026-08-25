'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { configService } from './services/configService'
import { ProfessionalModal } from './components/ProfessionalModal'
import { TaxaCartaoCard } from './components/TaxaCartaoCard'
import { Profissional, ProfessionalFormData } from './types/config'
import { Trash2, Edit2, Plus, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth' // Importando o hook do contexto de autenticação

export default function ConfiguracoesPage() {
  const queryClient = useQueryClient()
  const { profile } = useAuth() // Obtém o perfil diretamente do contexto global

  const [modalAberto, setModalAberto] = useState(false)
  const [profissionalSelecionada, setProfissionalSelecionada] = useState<Profissional | null>(null)
  const [deletandoId, setDeletandoId] = useState<string | null>(null)

  // Query para buscar profissionais
  const { data: profissionais = [], isLoading: loadingProfissionais } = useQuery({
    queryKey: ['profissionais'],
    queryFn: () => configService.listarProfissionais(),
  })

  // Mutation para salvar a taxa do cartão de crédito
  const taxaMutation = useMutation({
    mutationFn: (novaTaxa: number) => configService.atualizarTaxaCartao(novaTaxa),
    onSuccess: () => {
      // Invalida a query do perfil para atualizar o contexto global automaticamente
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
      toast.success("Taxa do cartão atualizada com sucesso!")
    },
    onError: (error: unknown) => {
      console.error(error)
      toast.error("Erro ao atualizar taxa", {
        description: getErrorMessage(error),
      })
    }
  })

  // Mutation para Criar ou Atualizar Profissional
  const salvarMutation = useMutation({
    mutationFn: async ({ data, id }: { data: ProfessionalFormData; id?: string }) => {
      const payload = {
        ...data,
        telefone: data.telefone ? data.telefone : null,
        email: data.email ? data.email : null,
      }
      if (id) {
        return await configService.atualizarProfissional(id, payload)
      } else {
        return await configService.criarProfissional(payload)
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profissionais'] })
      toast.success(variables.id ? "Profissional atualizada com sucesso!" : "Profissional cadastrada com sucesso!")
      setModalAberto(false)
      setProfissionalSelecionada(null)
    },
    onError: (error: unknown) => {
      console.error(error)
      toast.error("Erro ao salvar", {
        description: getErrorMessage(error) || "Não foi possível salvar os dados da profissional.",
      })
    }
  })

  // Mutation para Deletar Profissional
  const deletarMutation = useMutation({
    mutationFn: (id: string) => configService.deletarProfissional(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profissionais'] })
      toast.success("Profissional removida com sucesso!")
    },
    onError: (error: unknown) => {
      console.error(error)
      toast.error("Erro ao excluir", {
        description: getErrorMessage(error) || "Não foi possível excluir a profissional.",
      })
    },
    onSettled: () => {
      setDeletandoId(null)
    }
  })

  const handleSalvar = (data: ProfessionalFormData, id?: string) => {
    salvarMutation.mutate({ data, id })
  }

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente excluir esta profissional?')) {
      setDeletandoId(id)
      deletarMutation.mutate(id)
    }
  }

  if (loadingProfissionais) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#6b3838]" />
      </div>
    )
  }

  // Pega a taxa do contexto de forma segura (se existir, usa ela; senão, 0)
  const taxaAtual = profile?.taxa_cartao_credito ?? 0

  return (
    <div className="min-h-screen w-full bg-[#fcfbf9] space-y-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Configurações do Estabelecimento</h1>

        {/* Componente isolado da Taxa do Cartão de Crédito usando dados do contexto */}
        <TaxaCartaoCard 
          key={String(taxaAtual)}
          initialTaxa={Number(taxaAtual)}
          onSave={(novaTaxa) => taxaMutation.mutate(novaTaxa)}
          isPending={taxaMutation.isPending}
        />

        {/* Seção: Profissionais */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Profissionais</h2>
              <p className="text-sm text-gray-500 mt-1">Equipe do salão e da terapia capilar, com o percentual de comissão de cada uma.</p>
            </div>
            <button
              onClick={() => {
                setProfissionalSelecionada(null)
                setModalAberto(true)
              }}
              className="bg-[#6b3838] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#532a2a] transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus className="h-4 w-4" /> Nova profissional
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-sm text-gray-400 font-medium">
                  <th className="pb-4 font-medium">Nome</th>
                  <th className="pb-4 font-medium">Tipo</th>
                  <th className="pb-4 font-medium">Telefone</th>
                  <th className="pb-4 font-medium">E-mail</th>
                  <th className="pb-4 font-medium">Comissão</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {profissionais.map((prof: Profissional) => (
                  <tr key={prof.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 font-medium text-gray-900">{prof.nome}</td>
                    <td className="py-4 text-gray-600">{prof.tipo}</td>
                    <td className="py-4 text-gray-600">{prof.telefone || '—'}</td>
                    <td className="py-4 text-gray-600">{prof.email || '—'}</td>
                    <td className="py-4 text-gray-600">{prof.comissao_percentual}%</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${prof.ativo ? 'bg-amber-50 text-amber-800 border border-amber-200/60' : 'bg-gray-100 text-gray-600'}`}>
                        {prof.ativo ? 'Ativa' : 'Inativa'}
                      </span>
                    </td>
                    <td className="py-4 text-right space-x-3">
                      <button 
                        onClick={() => {
                          setProfissionalSelecionada(prof)
                          setModalAberto(true)
                        }} 
                        className="text-gray-400 hover:text-gray-700 transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="h-4 w-4 inline" />
                      </button>
                      <button 
                        onClick={() => handleDelete(prof.id)} 
                        disabled={deletandoId === prof.id}
                        className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
                        title="Excluir"
                      >
                        {deletandoId === prof.id ? (
                          <Loader2 className="h-4 w-4 animate-spin inline" />
                        ) : (
                          <Trash2 className="h-4 w-4 inline" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
                {profissionais.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-400 text-sm">
                      Nenhuma profissional cadastrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Modal de Criação / Edição com React Hook Form */}
      <ProfessionalModal
        key={profissionalSelecionada?.id || 'novo'}
        isOpen={modalAberto}
        onClose={() => {
          setModalAberto(false)
          setProfissionalSelecionada(null)
        }}
        onSave={handleSalvar}
        profissionalParaEditar={profissionalSelecionada}
        isLoading={salvarMutation.isPending}
      />
    </div>
  )
}