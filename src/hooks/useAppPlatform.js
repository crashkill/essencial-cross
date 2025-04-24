import { useState, useEffect } from 'react';
import { Platform, Dimensions } from 'react-native';

export const useAppPlatform = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isWeb, setIsWeb] = useState(Platform.OS === 'web');
  const [isDesktop, setIsDesktop] = useState(
    Platform.OS === 'web' && Dimensions.get('window').width >= 768
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
      setIsDesktop(Platform.OS === 'web' && window.width >= 768);
    });

    return () => subscription?.remove();
  }, []);

  return {
    isWeb,
    isDesktop,
    width: dimensions.width,
    height: dimensions.height,
  };
}; 