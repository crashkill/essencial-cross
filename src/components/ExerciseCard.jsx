import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ExerciseCard = ({ title, image, category, difficulty, onPress }) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Fácil':
        return '#27ae60';
      case 'Médio':
        return '#f39c12';
      case 'Difícil':
        return '#e74c3c';
      default:
        return '#3498db';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {image && <Image source={image} style={styles.image} />}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{category}</Text>
          </View>
          <View style={[styles.difficultyContainer, { backgroundColor: getDifficultyColor() }]}>
            <Text style={styles.difficulty}>{difficulty}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryContainer: {
    backgroundColor: '#3498db',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  category: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  difficultyContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  difficulty: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ExerciseCard; 