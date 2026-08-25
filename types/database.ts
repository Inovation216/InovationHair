export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      anamneses: {
        Row: {
          cliente_id: string
          created_at: string
          data: string
          id: string
          obs_cliente: string | null
          obs_profissional: string | null
          profissional: string | null
          queixa_principal: string | null
          respostas: Json
          updated_at: string
        }
        Insert: {
          cliente_id: string
          created_at?: string
          data?: string
          id?: string
          obs_cliente?: string | null
          obs_profissional?: string | null
          profissional?: string | null
          queixa_principal?: string | null
          respostas?: Json
          updated_at?: string
        }
        Update: {
          cliente_id?: string
          created_at?: string
          data?: string
          id?: string
          obs_cliente?: string | null
          obs_profissional?: string | null
          profissional?: string | null
          queixa_principal?: string | null
          respostas?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "anamneses_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      atendimento_servicos: {
        Row: {
          atendimento_id: string
          comissao_percentual: number
          comissao_valor: number
          created_at: string
          id: string
          profissional_id: string | null
          profissional_nome: string | null
          servico_id: string | null
          servico_nome: string
          updated_at: string
          valor: number
        }
        Insert: {
          atendimento_id: string
          comissao_percentual?: number
          comissao_valor?: number
          created_at?: string
          id?: string
          profissional_id?: string | null
          profissional_nome?: string | null
          servico_id?: string | null
          servico_nome: string
          updated_at?: string
          valor?: number
        }
        Update: {
          atendimento_id?: string
          comissao_percentual?: number
          comissao_valor?: number
          created_at?: string
          id?: string
          profissional_id?: string | null
          profissional_nome?: string | null
          servico_id?: string | null
          servico_nome?: string
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "atendimento_servicos_atendimento_id_fkey"
            columns: ["atendimento_id"]
            isOneToOne: false
            referencedRelation: "atendimentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atendimento_servicos_profissional_id_fkey"
            columns: ["profissional_id"]
            isOneToOne: false
            referencedRelation: "profissionais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atendimento_servicos_servico_id_fkey"
            columns: ["servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["id"]
          },
        ]
      }
      atendimentos: {
        Row: {
          cliente_id: string
          created_at: string
          data: string
          hora: string
          id: string
          observacoes: string | null
          pagamento: Database["public"]["Enums"]["forma_pagamento"]
          profissional: string | null
          profissional_id: string | null
          servico_id: string | null
          servico_nome: string
          taxa_percentual: number
          taxa_valor: number
          updated_at: string
          valor: number
          valor_liquido: number
        }
        Insert: {
          cliente_id: string
          created_at?: string
          data?: string
          hora?: string
          id?: string
          observacoes?: string | null
          pagamento?: Database["public"]["Enums"]["forma_pagamento"]
          profissional?: string | null
          profissional_id?: string | null
          servico_id?: string | null
          servico_nome: string
          taxa_percentual?: number
          taxa_valor?: number
          updated_at?: string
          valor?: number
          valor_liquido?: number
        }
        Update: {
          cliente_id?: string
          created_at?: string
          data?: string
          hora?: string
          id?: string
          observacoes?: string | null
          pagamento?: Database["public"]["Enums"]["forma_pagamento"]
          profissional?: string | null
          profissional_id?: string | null
          servico_id?: string | null
          servico_nome?: string
          taxa_percentual?: number
          taxa_valor?: number
          updated_at?: string
          valor?: number
          valor_liquido?: number
        }
        Relationships: [
          {
            foreignKeyName: "atendimentos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atendimentos_profissional_id_fkey"
            columns: ["profissional_id"]
            isOneToOne: false
            referencedRelation: "profissionais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atendimentos_servico_id_fkey"
            columns: ["servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["id"]
          },
        ]
      }
      avaliacoes: {
        Row: {
          cliente_id: string
          created_at: string
          data: string
          diagnostico: string | null
          estado_couro: string | null
          id: string
          profissional: string | null
          queixas: string | null
          recomendacoes: string | null
          tipo_cabelo: string | null
          updated_at: string
        }
        Insert: {
          cliente_id: string
          created_at?: string
          data?: string
          diagnostico?: string | null
          estado_couro?: string | null
          id?: string
          profissional?: string | null
          queixas?: string | null
          recomendacoes?: string | null
          tipo_cabelo?: string | null
          updated_at?: string
        }
        Update: {
          cliente_id?: string
          created_at?: string
          data?: string
          diagnostico?: string | null
          estado_couro?: string | null
          id?: string
          profissional?: string | null
          queixas?: string | null
          recomendacoes?: string | null
          tipo_cabelo?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "avaliacoes_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          created_at: string
          email: string | null
          id: string
          nascimento: string | null
          nome: string
          observacoes: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          nascimento?: string | null
          nome: string
          observacoes?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          nascimento?: string | null
          nome?: string
          observacoes?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      entradas_financeiras: {
        Row: {
          area: Database["public"]["Enums"]["area_atendimento"]
          atendimento_id: string | null
          cliente_id: string | null
          created_at: string
          data: string
          descricao: string
          id: string
          origem: Database["public"]["Enums"]["origem_financeira"]
          pagamento: Database["public"]["Enums"]["forma_pagamento"]
          sessao_id: string | null
          taxa_percentual: number
          taxa_valor: number
          updated_at: string
          valor: number
          valor_liquido: number
        }
        Insert: {
          area: Database["public"]["Enums"]["area_atendimento"]
          atendimento_id?: string | null
          cliente_id?: string | null
          created_at?: string
          data?: string
          descricao: string
          id?: string
          origem?: Database["public"]["Enums"]["origem_financeira"]
          pagamento?: Database["public"]["Enums"]["forma_pagamento"]
          sessao_id?: string | null
          taxa_percentual?: number
          taxa_valor?: number
          updated_at?: string
          valor?: number
          valor_liquido?: number
        }
        Update: {
          area?: Database["public"]["Enums"]["area_atendimento"]
          atendimento_id?: string | null
          cliente_id?: string | null
          created_at?: string
          data?: string
          descricao?: string
          id?: string
          origem?: Database["public"]["Enums"]["origem_financeira"]
          pagamento?: Database["public"]["Enums"]["forma_pagamento"]
          sessao_id?: string | null
          taxa_percentual?: number
          taxa_valor?: number
          updated_at?: string
          valor?: number
          valor_liquido?: number
        }
        Relationships: [
          {
            foreignKeyName: "entradas_financeiras_atendimento_id_fkey"
            columns: ["atendimento_id"]
            isOneToOne: false
            referencedRelation: "atendimentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entradas_financeiras_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entradas_financeiras_sessao_id_fkey"
            columns: ["sessao_id"]
            isOneToOne: false
            referencedRelation: "sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
      fotos_evolucao: {
        Row: {
          avaliacao_id: string | null
          caminho: string
          cliente_id: string
          created_at: string
          id: string
          legenda: string | null
          sessao_id: string | null
          updated_at: string
        }
        Insert: {
          avaliacao_id?: string | null
          caminho: string
          cliente_id: string
          created_at?: string
          id?: string
          legenda?: string | null
          sessao_id?: string | null
          updated_at?: string
        }
        Update: {
          avaliacao_id?: string | null
          caminho?: string
          cliente_id?: string
          created_at?: string
          id?: string
          legenda?: string | null
          sessao_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fotos_evolucao_avaliacao_id_fkey"
            columns: ["avaliacao_id"]
            isOneToOne: false
            referencedRelation: "avaliacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fotos_evolucao_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fotos_evolucao_sessao_id_fkey"
            columns: ["sessao_id"]
            isOneToOne: false
            referencedRelation: "sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
      planos_tratamento: {
        Row: {
          cliente_id: string
          created_at: string
          frequencia: string | null
          id: string
          inicio: string
          objetivo: string | null
          observacoes: string | null
          sessoes_previstas: number
          updated_at: string
        }
        Insert: {
          cliente_id: string
          created_at?: string
          frequencia?: string | null
          id?: string
          inicio?: string
          objetivo?: string | null
          observacoes?: string | null
          sessoes_previstas?: number
          updated_at?: string
        }
        Update: {
          cliente_id?: string
          created_at?: string
          frequencia?: string | null
          id?: string
          inicio?: string
          objetivo?: string | null
          observacoes?: string | null
          sessoes_previstas?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "planos_tratamento_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          cargo: string
          created_at: string
          email: string | null
          id: string
          nome: string
          taxa_cartao_credito: number | null
          updated_at: string
        }
        Insert: {
          cargo?: string
          created_at?: string
          email?: string | null
          id: string
          nome?: string
          taxa_cartao_credito?: number | null
          updated_at?: string
        }
        Update: {
          cargo?: string
          created_at?: string
          email?: string | null
          id?: string
          nome?: string
          taxa_cartao_credito?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profissionais: {
        Row: {
          area: Database["public"]["Enums"]["area_atendimento"] | null
          ativo: boolean
          comissao_percentual: number
          created_at: string
          email: string | null
          id: string
          nome: string
          telefone: string | null
          tipo: string
          updated_at: string
        }
        Insert: {
          area?: Database["public"]["Enums"]["area_atendimento"] | null
          ativo?: boolean
          comissao_percentual?: number
          created_at?: string
          email?: string | null
          id?: string
          nome: string
          telefone?: string | null
          tipo?: string
          updated_at?: string
        }
        Update: {
          area?: Database["public"]["Enums"]["area_atendimento"] | null
          ativo?: boolean
          comissao_percentual?: number
          created_at?: string
          email?: string | null
          id?: string
          nome?: string
          telefone?: string | null
          tipo?: string
          updated_at?: string
        }
        Relationships: []
      }
      servicos: {
        Row: {
          area: Database["public"]["Enums"]["area_atendimento"]
          ativo: boolean
          created_at: string
          descricao: string | null
          id: string
          nome: string
          updated_at: string
        }
        Insert: {
          area?: Database["public"]["Enums"]["area_atendimento"]
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          id?: string
          nome: string
          updated_at?: string
        }
        Update: {
          area?: Database["public"]["Enums"]["area_atendimento"]
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          id?: string
          nome?: string
          updated_at?: string
        }
        Relationships: []
      }
      sessoes: {
        Row: {
          cliente_id: string
          comissao_percentual: number
          comissao_valor: number
          created_at: string
          data: string
          evolucao: string | null
          id: string
          numero: number
          observacoes: string | null
          pagamento: Database["public"]["Enums"]["forma_pagamento"]
          plano_id: string | null
          procedimento: string | null
          produtos: string | null
          profissional_id: string | null
          profissional_nome: string | null
          taxa_percentual: number
          taxa_valor: number
          updated_at: string
          valor: number
          valor_liquido: number
        }
        Insert: {
          cliente_id: string
          comissao_percentual?: number
          comissao_valor?: number
          created_at?: string
          data?: string
          evolucao?: string | null
          id?: string
          numero?: number
          observacoes?: string | null
          pagamento?: Database["public"]["Enums"]["forma_pagamento"]
          plano_id?: string | null
          procedimento?: string | null
          produtos?: string | null
          profissional_id?: string | null
          profissional_nome?: string | null
          taxa_percentual?: number
          taxa_valor?: number
          updated_at?: string
          valor?: number
          valor_liquido?: number
        }
        Update: {
          cliente_id?: string
          comissao_percentual?: number
          comissao_valor?: number
          created_at?: string
          data?: string
          evolucao?: string | null
          id?: string
          numero?: number
          observacoes?: string | null
          pagamento?: Database["public"]["Enums"]["forma_pagamento"]
          plano_id?: string | null
          procedimento?: string | null
          produtos?: string | null
          profissional_id?: string | null
          profissional_nome?: string | null
          taxa_percentual?: number
          taxa_valor?: number
          updated_at?: string
          valor?: number
          valor_liquido?: number
        }
        Relationships: [
          {
            foreignKeyName: "sessoes_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessoes_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos_tratamento"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessoes_profissional_id_fkey"
            columns: ["profissional_id"]
            isOneToOne: false
            referencedRelation: "profissionais"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      negocio_atual: { Args: never; Returns: string }
    }
    Enums: {
      area_atendimento: "salao" | "terapia"
      forma_pagamento:
        | "Dinheiro"
        | "Pix"
        | "Cartão de débito"
        | "Cartão de crédito"
      origem_financeira: "atendimento" | "sessao" | "manual"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      area_atendimento: ["salao", "terapia"],
      forma_pagamento: [
        "Dinheiro",
        "Pix",
        "Cartão de débito",
        "Cartão de crédito",
      ],
      origem_financeira: ["atendimento", "sessao", "manual"],
    },
  },
} as const
