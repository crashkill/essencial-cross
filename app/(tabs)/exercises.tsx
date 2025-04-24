import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Importar dados simulados e componentes
import { exercisesData } from '@/src/utils/mockData';
import ExerciseCard from '@/src/components/ExerciseCard';

export default function ExercisesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todos');
  
  const categories = ['Todos', 'Força', 'Cardio', 'Potência', 'Condicionamento'];
  const difficulties = ['Todos', 'Fácil', 'Médio', 'Difícil'];
  
  const filteredExercises = exercisesData.filter(exercise => {
    const matchesSearch = exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || exercise.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'Todos' || exercise.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Exercícios</Text>
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={() => router.navigate('/favorites')}
        >
          <Ionicons name="heart" size={24} color="#e74c3c" />
          <Text style={styles.favoriteText}>Favoritos</Text>
        </TouchableOpacity>
      </View>
      
      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar exercícios"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Filtros */}
      <View style={styles.filtersContainer}>
        {/* Filtro de categorias */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Categoria:</Text>
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedCategory === item && styles.selectedFilterButton,
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedCategory === item && styles.selectedFilterText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        
        {/* Filtro de dificuldade */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Dificuldade:</Text>
          <FlatList
            horizontal
            data={difficulties}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedDifficulty === item && styles.selectedFilterButton,
                ]}
                onPress={() => setSelectedDifficulty(item)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedDifficulty === item && styles.selectedFilterText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      
      {/* Lista de exercícios */}
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExerciseCard
            title={item.title}
            category={item.category}
            difficulty={item.difficulty}
            onPress={() => router.navigate('/exercise-detail', { id: item.id })}
          />
        )}
        contentContainerStyle={styles.exerciseList}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="barbell-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Nenhum exercício encontrado</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteText: {
    marginLeft: 4,
    color: '#e74c3c',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  filtersContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  filterSection: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedFilterButton: {
    backgroundColor: '#e74c3c',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedFilterText: {
    color: '#fff',
  },
  exerciseList: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
}); 