import 'react-native-url-polyfill/auto'; // Necessário para Supabase em React Native
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Detecta se está rodando na web
const isWeb = typeof window !== 'undefined';

// Recupera as variáveis de ambiente
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Verifica se as variáveis foram carregadas
if (!supabaseUrl) {
  throw new Error('A variável de ambiente EXPO_PUBLIC_SUPABASE_URL não está definida.');
}
if (!supabaseAnonKey) {
  throw new Error('A variável de ambiente EXPO_PUBLIC_SUPABASE_ANON_KEY não está definida.');
}

// Configuração do storage baseado na plataforma
const storage = isWeb
  ? {
      getItem: (key: string) => {
        const value = window.localStorage.getItem(key);
        return Promise.resolve(value);
      },
      setItem: (key: string, value: string) => {
        window.localStorage.setItem(key, value);
        return Promise.resolve(undefined);
      },
      removeItem: (key: string) => {
        window.localStorage.removeItem(key);
        return Promise.resolve(undefined);
      },
    }
  : AsyncStorage;

// Cria e exporta o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: isWeb,
  },
}); 