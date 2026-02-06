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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      medal_scans: {
        Row: {
          id: string
          ip_address: string
          location: Json | null
          medal_id: string
          scanned_at: string
          user_agent: string
        }
        Insert: {
          id?: string
          ip_address: string
          location?: Json | null
          medal_id: string
          scanned_at?: string
          user_agent: string
        }
        Update: {
          id?: string
          ip_address?: string
          location?: Json | null
          medal_id?: string
          scanned_at?: string
          user_agent?: string
        }
        Relationships: [
          {
            foreignKeyName: "medal_scans_medal_id_fkey"
            columns: ["medal_id"]
            isOneToOne: false
            referencedRelation: "medals"
            referencedColumns: ["id"]
          },
        ]
      }
      medals: {
        Row: {
          code: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          manufactured_at: string | null
          manufactured_by: string | null
          status: Database["public"]["Enums"]["MEDAL_STATUS"]
          updated_at: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          manufactured_at?: string | null
          manufactured_by?: string | null
          status?: Database["public"]["Enums"]["MEDAL_STATUS"]
          updated_at?: string
        }
        Update: {
          code?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          manufactured_at?: string | null
          manufactured_by?: string | null
          status?: Database["public"]["Enums"]["MEDAL_STATUS"]
          updated_at?: string
        }
        Relationships: []
      }
      owners: {
        Row: {
          address: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          pet_id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          pet_id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          pet_id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "owners_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: true
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_tokens: {
        Row: {
          code: string
          created_at: string
          expires_at: string
          id: string
          pet_id: string
          revoked_at: string | null
        }
        Insert: {
          code: string
          created_at?: string
          expires_at: string
          id?: string
          pet_id: string
          revoked_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string
          id?: string
          pet_id?: string
          revoked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pet_token_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pets: {
        Row: {
          birth_date: string | null
          breed: string | null
          created_at: string
          gender: Database["public"]["Enums"]["PET_GENDER"]
          id: string
          medal_id: string
          name: string
          notes: string | null
          species: Database["public"]["Enums"]["PET_SPECIES"]
          status: Database["public"]["Enums"]["PET_STATUS"]
          updated_at: string
        }
        Insert: {
          birth_date?: string | null
          breed?: string | null
          created_at?: string
          gender?: Database["public"]["Enums"]["PET_GENDER"]
          id?: string
          medal_id: string
          name: string
          notes?: string | null
          species?: Database["public"]["Enums"]["PET_SPECIES"]
          status?: Database["public"]["Enums"]["PET_STATUS"]
          updated_at?: string
        }
        Update: {
          birth_date?: string | null
          breed?: string | null
          created_at?: string
          gender?: Database["public"]["Enums"]["PET_GENDER"]
          id?: string
          medal_id?: string
          name?: string
          notes?: string | null
          species?: Database["public"]["Enums"]["PET_SPECIES"]
          status?: Database["public"]["Enums"]["PET_STATUS"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pets_medal_id_fkey"
            columns: ["medal_id"]
            isOneToOne: true
            referencedRelation: "medals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      MEDAL_STATUS: "CREATED" | "MANUFACTURED" | "ACTIVE" | "LOST" | "DISABLED"
      PET_GENDER: "MALE" | "FEMALE" | "UNKNOWN"
      PET_GENDER_old: "MALE" | "GENDER" | "UNKNOWN"
      PET_SPECIES: "DOG" | "CAT" | "OTHER"
      PET_STATUS: "ACTIVE" | "LOST" | "DECEASED"
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
  public: {
    Enums: {
      MEDAL_STATUS: ["CREATED", "MANUFACTURED", "ACTIVE", "LOST", "DISABLED"],
      PET_GENDER: ["MALE", "FEMALE", "UNKNOWN"],
      PET_GENDER_old: ["MALE", "GENDER", "UNKNOWN"],
      PET_SPECIES: ["DOG", "CAT", "OTHER"],
      PET_STATUS: ["ACTIVE", "LOST", "DECEASED"],
    },
  },
} as const
