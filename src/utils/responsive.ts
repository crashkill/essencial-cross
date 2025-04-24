import { Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Determina se está em um ambiente web
export const isWeb = Platform.OS === 'web';
export const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

// Determina se está em tela pequena (móvel) ou grande (tablet/desktop)
export const isSmallScreen = width < 768;
export const isMediumScreen = width >= 768 && width < 1024;
export const isLargeScreen = width >= 1024;

// Função para calcular estilos responsivos
export const getResponsiveStyles = (mobileStyles: any, webStyles: any, tabletStyles?: any) => {
  if (isWeb) {
    if (isSmallScreen) {
      return { ...mobileStyles };
    } else if (isMediumScreen) {
      return { ...mobileStyles, ...tabletStyles };
    } else {
      return { ...mobileStyles, ...tabletStyles, ...webStyles };
    }
  }
  return mobileStyles;
};

// Valores de padding para diferentes tamanhos de tela
export const responsivePadding = isSmallScreen ? 16 : isLargeScreen ? 32 : 24;

// Larguras máximas de contêiner para diferentes tamanhos de tela
export const containerMaxWidth = isSmallScreen ? '100%' : isLargeScreen ? 1200 : 960;

// Função para obter tamanho de texto responsivo
export const getResponsiveFontSize = (size: number) => {
  if (isSmallScreen) return size;
  if (isMediumScreen) return size * 1.1;
  return size * 1.2;
};

// Layout em grade para web
export const getGridLayout = (columns: number) => {
  if (isWeb) {
    if (isLargeScreen) {
      return { flexDirection: 'row', flexWrap: 'wrap', width: '100%' };
    }
  }
  return {};
};

// Tamanho de coluna para layout em grade
export const getColumnWidth = (columns: number) => {
  if (isWeb && !isSmallScreen) {
    return { width: `${100 / columns}%` };
  }
  return { width: '100%' };
}; 