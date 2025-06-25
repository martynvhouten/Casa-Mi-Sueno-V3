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
      contact_submissions: {
        Row: {
          id: number
          created_at: string
          name: string
          email: string
          phone: string | null
          message: string
          type: 'general' | 'booking'
          // Additional fields for booking inquiries
          check_in_date: string | null
          check_out_date: string | null
          number_of_guests: number | null
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          email: string
          phone?: string | null
          message: string
          type: 'general' | 'booking'
          check_in_date?: string | null
          check_out_date?: string | null
          number_of_guests?: number | null
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          type?: 'general' | 'booking'
          check_in_date?: string | null
          check_out_date?: string | null
          number_of_guests?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export interface PriceDetails {
  pricePerNight: number;
  totalNights: number;
  basePrice: number;
  cleaningFee: number;
  shortStaySurcharge?: number;
  totalPrice: number;
} 