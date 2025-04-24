import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Importar dados simulados e componentes
import { wodData } from '@/src/utils/mockData';
import WodCard from '@/src/components/WodCard';

export default function WodsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  const categories = ['Todos', 'Condicionamento', 'Força', 'Cardio', 'Potência'];
  
  const filteredWods = wodData.filter(wod => {
    const matchesSearch = wod.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          wod.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || wod.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>WODs</Text>
        <TouchableOpacity style={styles.historyButton} onPress={() => router.navigate('/wod-history')}>
          <Ionicons name="time-outline" size={24} color="#e74c3c" />
          <Text style={styles.historyText}>Histórico</Text>
        </TouchableOpacity>
      </View>
      
      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar WODs"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Filtro de categorias */}
      <View style={styles.categoryFilter}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.selectedCategoryText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      {/* Lista de WODs */}
      <FlatList
        data={filteredWods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <WodCard
            title={item.title}
            description={item.description}
            duration={item.duration}
            onPress={() => router.navigate('/wod-detail', { id: item.id })}
          />
        )}
        contentContainerStyle={styles.wodList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="barbell-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Nenhum WOD encontrado</Text>
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
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyText: {
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
  categoryFilter: {
    marginBottom: 16,
    paddingLeft: 16,
  },
  categoryButton: {
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
  selectedCategoryButton: {
    backgroundColor: '#e74c3c',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  wodList: {
    padding: 16,
    paddingTop: 0,
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