declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_KEY: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXT_PUBLIC_STRIPE_KEY: string;
    STRIPE_SECRET_KEY: string;
  }
}
