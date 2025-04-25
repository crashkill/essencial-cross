import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { isWeb } from '@/src/utils/responsive';
import { AuthProvider, useAuth } from '@/src/context/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Componente interno para lidar com a lógica de layout pós-carregamento
const InitialLayout = () => {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Só executa a lógica de redirecionamento se não estiver carregando
    if (!loading) {
      const inAuthGroup = segments[0] === '(auth)'; // Verifica se está numa rota de autenticação (ex: login)
      const inAppGroup = segments[0] === '(tabs)'; // Verifica se está numa rota do app principal

      console.log('Session:', session);
      console.log('Segments:', segments);
      console.log('In Auth Group:', inAuthGroup);

      if (session && !inAppGroup) {
        // Redireciona para a home (dentro das tabs) se logado e fora do grupo de tabs
        console.log('Redirecting to / (tabs)');
        router.replace('/(tabs)');
      } else if (!session && !inAuthGroup) {
        // Redireciona para login se não logado e fora do grupo de autenticação
        console.log('Redirecting to /login');
        router.replace('/login' as any); // Cast para any para silenciar o linter temporariamente
      }
    }
  }, [session, loading, segments, router]);

  // Mostra um indicador de carregamento enquanto a sessão é verificada
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  // Estrutura de navegação principal
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // Configuração para viewport na Web - Executa apenas no cliente
    if (Platform.OS === 'web') {
      // Verificar se a meta tag já existe para evitar duplicação em HMR
      let meta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'viewport';
        // @ts-ignore - document.head existe na web
        document.head.appendChild(meta);
      }
      // Definir o conteúdo independentemente de existir ou não
      if (meta) { 
        meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
      }
    }
  }, []); // Array de dependências vazio para executar apenas uma vez

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={styles.container}>
          <View style={styles.content}>
            {/* Renderiza o InitialLayout que contém a lógica de navegação */}
            <InitialLayout />
          </View>
        </View>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Centralize o conteúdo horizontalmente em telas grandes (web)
    ...(isWeb ? {
      alignItems: 'center',
      width: '100%',
    } : {})
  },
  content: {
    flex: 1,
    width: '100%',
    // Em telas web grandes, limitar a largura máxima para melhor legibilidade
    ...(isWeb ? {
      maxWidth: 1200,
    } : {})
  }
});
