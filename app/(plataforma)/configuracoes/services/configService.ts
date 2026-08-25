import { supabaseBrowser } from '@/lib/supabase/client'
import { ProfissionalInsert, ProfissionalUpdate } from '../types/config'

export const configService = {
  async listarProfissionais() {
    const { data, error } = await supabaseBrowser()
      .from('profissionais')
      .select('*')
      .order('nome', { ascending: true })
    if (error) throw error
    return data
  },

  async criarProfissional(profissional: ProfissionalInsert) {
    const { data, error } = await supabaseBrowser()
      .from('profissionais')
      .insert([profissional])
      .select()
      .single()
    if (error) throw error
    return data
  },

  async atualizarProfissional(id: string, updates: ProfissionalUpdate) {
    const { data, error } = await supabaseBrowser()
      .from('profissionais')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async deletarProfissional(id: string) {
    const { error } = await supabaseBrowser()
      .from('profissionais')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  // Novos métodos para gerenciar o Profile/Taxa de Cartão
  async obterPerfil() {
    const { data: { user } } = await supabaseBrowser().auth.getUser()
    if (!user) throw new Error("Usuário não autenticado")

    const { data, error } = await supabaseBrowser()
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    if (error) throw error
    return data
  },

  async atualizarTaxaCartao(taxa: number) {
    const { data: { user } } = await supabaseBrowser().auth.getUser()
    if (!user) throw new Error("Usuário não autenticado")

    const { data, error } = await supabaseBrowser()
      .from('profiles')
      .update({ taxa_cartao_credito: taxa })
      .eq('id', user.id)
      .select()
      .single()
    if (error) throw error
    return data
  }
}