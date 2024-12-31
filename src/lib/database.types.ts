export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Address = {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          user_address: Address | null;
          shop_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          user_address?: Address | null;
          shop_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          user_address?: Address | null;
          shop_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      platform_connections: {
        Row: {
          id: string;
          user_id: string;
          platform_name: string;
          platform_user_id: string | null;
          access_token: string | null;
          refresh_token: string | null;
          token_expires_at: string | null;
          shop_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          platform_name: string;
          platform_user_id?: string | null;
          access_token?: string | null;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          shop_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          platform_name?: string;
          platform_user_id?: string | null;
          access_token?: string | null;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          shop_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      listings: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          price: number;
          quantity: number;
          condition: string | null;
          category: string | null;
          brand: string | null;
          size: string | null;
          color: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          price: number;
          quantity?: number;
          condition?: string | null;
          category?: string | null;
          brand?: string | null;
          size?: string | null;
          color?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          price?: number;
          quantity?: number;
          condition?: string | null;
          category?: string | null;
          brand?: string | null;
          size?: string | null;
          color?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      listing_images: {
        Row: {
          id: string;
          listing_id: string;
          url: string;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          url: string;
          position?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          url?: string;
          position?: number;
          created_at?: string;
        };
      };
      platform_listings: {
        Row: {
          id: string;
          listing_id: string;
          platform_name: string;
          platform_listing_id: string;
          status: string;
          url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          platform_name: string;
          platform_listing_id: string;
          status?: string;
          url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          platform_name?: string;
          platform_listing_id?: string;
          status?: string;
          url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
} 