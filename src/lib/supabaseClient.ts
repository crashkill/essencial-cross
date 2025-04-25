import 'react-native-url-polyfill/auto'; // Necessário para Supabase em React Native
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Recupera as variáveis de ambiente
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Verifica se as variáveis foram carregadas
if (!supabaseUrl) {
  console.error('Erro: A variável de ambiente EXPO_PUBLIC_SUPABASE_URL não está definida.');
  // Poderia lançar um erro ou retornar um cliente inválido
}
if (!supabaseAnonKey) {
  console.error('Erro: A variável de ambiente EXPO_PUBLIC_SUPABASE_ANON_KEY não está definida.');
  // Poderia lançar um erro ou retornar um cliente inválido
}

// Cria e exporta o cliente Supabase
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    storage: AsyncStorage, // Usa AsyncStorage para persistir a sessão
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Importante para React Native
  },
}); 