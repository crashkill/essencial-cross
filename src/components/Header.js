import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppPlatform } from '../hooks/useAppPlatform';
import { useRouter } from 'expo-router';
import Colors from '../constants/Colors';

export default function Header({ title, showBackButton = false, rightIcon, onRightIconPress }) {
  const router = useRouter();
  const { isDesktop } = useAppPlatform();

  return (
    <View style={[styles.container, isDesktop && styles.desktopContainer]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={[styles.title, isDesktop && styles.desktopTitle]}>{title}</Text>
      
      <View style={styles.rightContainer}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightButton}>
            <Ionicons name={rightIcon} size={24} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    backgroundColor: Colors.white,
  },
  desktopContainer: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  leftContainer: {
    width: 40,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  desktopTitle: {
    fontSize: 24,
  },
  backButton: {
    padding: 4,
  },
  rightButton: {
    padding: 4,
  },
}); 