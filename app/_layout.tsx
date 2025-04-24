import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View, StyleSheet, Platform } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { isWeb } from '@/src/utils/responsive';

// Configuração para viewport na Web
if (Platform.OS === 'web') {
  // @ts-ignore - Este objeto está disponível na web
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
  // @ts-ignore - Este objeto está disponível na web
  document.head.appendChild(meta);
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </View>
      </View>
      <StatusBar style="auto" />
    </ThemeProvider>
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
