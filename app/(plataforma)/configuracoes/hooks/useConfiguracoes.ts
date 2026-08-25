import { useState, useEffect } from 'react'
import { configService } from '../services/configService'
import { Profissional } from '../types/config'

export function useConfiguracoes() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const recarregar = async () => {
    try {
      setLoading(true)
      const listaProfissionais = await configService.listarProfissionais()
      setProfissionais(listaProfissionais)
    } catch (error) {
      console.error('Detalhes do Erro Supabase:', {
        original: error
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    async function buscar() {
      try {
        setLoading(true)
        const listaProfissionais = await configService.listarProfissionais()
        if (isMounted) {
          setProfissionais(listaProfissionais)
        }
      } catch (error) {
        if (isMounted) {
          console.error('Detalhes do Erro Supabase:', {
            original: error
          })
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    buscar()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    profissionais,
    loading,
    recarregar
  }
}