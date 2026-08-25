'use client'

import { useState } from 'react'
import { CreditCard, Save, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface TaxaCartaoCardProps {
  initialTaxa: number
  onSave: (novaTaxa: number) => void
  isPending: boolean
}

export function TaxaCartaoCard({ initialTaxa, onSave, isPending }: TaxaCartaoCardProps) {
  // Inicializa o estado diretamente com a prop. 
  // Para garantir que o estado atualize caso a prop mude após o carregamento assíncrono da query, 
  // podemos usar uma key no componente pai (ex: key={initialTaxa}).
  const [taxaStr, setTaxaStr] = useState<string>(String(initialTaxa))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const normalized = taxaStr.replace(',', '.')
    const parsed = parseFloat(normalized)
    onSave(isNaN(parsed) ? 0 : parsed)
  }

  return (
    <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl">
          <CreditCard className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Taxa de Cartão de Crédito</h2>
          <p className="text-sm text-gray-500 mt-0.5">Defina o percentual padrão cobrado pela operadora de cartão nas transações.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-4 max-w-md">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">Taxa padrão (%) *</label>
          <Input
            type="text"
            inputMode="decimal"
            required
            value={taxaStr}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9.,]/g, '')
              setTaxaStr(val)
            }}
            placeholder="Ex: 3.5"
            className="border-gray-300 focus-visible:ring-[#6b3838]"
          />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-[#6b3838] hover:bg-[#532a2a] text-white flex items-center gap-2"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Salvar Taxa
        </Button>
      </form>
    </section>
  )
}