import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WodCard = ({ title, description, duration, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.durationContainer}>
          <Text style={styles.duration}>{duration} min</Text>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  durationContainer: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  duration: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  description: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default WodCard; 