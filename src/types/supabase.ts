export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      business_plans: {
        Row: {
          id: string
          user_id: string
          title: string
          market_data: Json | null
          technical_data: Json | null
          financial_data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          market_data?: Json | null
          technical_data?: Json | null
          financial_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          market_data?: Json | null
          technical_data?: Json | null
          financial_data?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          category: string
          default_unit: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          default_unit: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          default_unit?: string
          created_at?: string
          updated_at?: string
        }
      }
      price_records: {
        Row: {
          id: string
          product_id: string
          price: number
          currency: string
          location: string | null
          record_date: string
          source: string
          raw_text: string | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          price: number
          currency?: string
          location?: string | null
          record_date: string
          source: string
          raw_text?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          price?: number
          currency?: string
          location?: string | null
          record_date?: string
          source?: string
          raw_text?: string | null
          created_at?: string
        }
      }
    }
  }
}
