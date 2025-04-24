import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileStats = ({ workouts, prs, rank }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{workouts}</Text>
        <Text style={styles.statLabel}>WODs</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{prs}</Text>
        <Text style={styles.statLabel}>PRs</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.statItem}>
        <Text style={styles.statValue}>#{rank}</Text>
        <Text style={styles.statLabel}>Ranking</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  separator: {
    width: 1,
    height: 40,
    backgroundColor: '#ddd',
  },
});

export default ProfileStats; 