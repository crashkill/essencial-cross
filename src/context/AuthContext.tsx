import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

// Tipagem para os dados do contexto
interface AuthContextProps {
  session: Session | null;
  user: User | null;
  loading: boolean;
  // Adicionar funções de signOut, etc. se necessário
}

// Cria o contexto com um valor inicial (pode ser undefined ou null)
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Hook customizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Tipagem para as props do Provider
interface AuthProviderProps {
  children: ReactNode;
}

// Componente Provider que envolve a aplicação
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Auth Fetch Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    // Escuta mudanças no estado de autenticação (login, logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth State Change Event: ", _event, session);
      setSession(session);
      setUser(session?.user ?? null);
      // Atualiza loading apenas se estava carregando inicialmente e não há mais sessão
      if (loading && !session) setLoading(false); 
    });

    // Cleanup listener na desmontagem
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [loading]); // Dependência loading garante que o listener seja configurado após a carga inicial

  const value = {
    session,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 