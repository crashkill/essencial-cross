import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Importe dados simulados e componentes
import { userData, wodData } from '@/src/utils/mockData';
import WodCard from '@/src/components/WodCard';
import ProfileStats from '@/src/components/ProfileStats';

export default function HomeScreen() {
  // Usar o primeiro WOD como o WOD do dia para demonstração
  const wodOfTheDay = wodData[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Cabeçalho com saudação */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, {userData.name.split(' ')[0]}</Text>
            <Text style={styles.subGreeting}>Bem-vindo ao Essencial Cross</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileIcon}
            onPress={() => router.navigate('/profile')}
          >
            <Ionicons name="person-circle" size={40} color="#e74c3c" />
          </TouchableOpacity>
        </View>

        {/* Box e Status */}
        <View style={styles.boxInfo}>
          <Text style={styles.boxName}>{userData.box}</Text>
          <ProfileStats 
            workouts={userData.stats.workouts} 
            prs={userData.stats.prs} 
            rank={userData.stats.rank}
          />
        </View>

        {/* WOD do Dia */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>WOD do Dia</Text>
            <TouchableOpacity onPress={() => router.navigate('/wods')}>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <WodCard 
            title={wodOfTheDay.title}
            description={wodOfTheDay.description}
            duration={wodOfTheDay.duration}
            onPress={() => router.navigate('/wod-detail', { id: wodOfTheDay.id })}
          />
        </View>

        {/* Próximas Aulas */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Próximas Aulas</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver agenda</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.classCard}>
            <View style={styles.classTimeInfo}>
              <Text style={styles.classTime}>18:00</Text>
              <Text style={styles.classDuration}>60 min</Text>
            </View>
            <View style={styles.classDetails}>
              <Text style={styles.className}>CrossFit Intermediário</Text>
              <Text style={styles.classCoach}>Coach: Ricardo</Text>
              <View style={styles.classStatus}>
                <Text style={styles.classStatusText}>5 vagas disponíveis</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.checkInButton}>
              <Text style={styles.checkInText}>Check-in</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.classCard}>
            <View style={styles.classTimeInfo}>
              <Text style={styles.classTime}>19:00</Text>
              <Text style={styles.classDuration}>60 min</Text>
            </View>
            <View style={styles.classDetails}>
              <Text style={styles.className}>CrossFit Avançado</Text>
              <Text style={styles.classCoach}>Coach: Mariana</Text>
              <View style={styles.classStatus}>
                <Text style={styles.classStatusText}>3 vagas disponíveis</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.checkInButton}>
              <Text style={styles.checkInText}>Check-in</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Últimos PRs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Seus PRs Recentes</Text>
            <TouchableOpacity onPress={() => router.navigate('/profile')}>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          {userData.personalRecords.slice(0, 3).map((pr, index) => (
            <View key={index} style={styles.prRecord}>
              <Text style={styles.prExercise}>{pr.exercise}</Text>
              <Text style={styles.prValue}>{pr.weight || pr.time}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subGreeting: {
    fontSize: 16,
    color: '#777',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxInfo: {
    marginBottom: 24,
  },
  boxName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#e74c3c',
    fontWeight: '600',
  },
  classCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  classTimeInfo: {
    marginRight: 16,
    alignItems: 'center',
  },
  classTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  classDuration: {
    fontSize: 12,
    color: '#999',
  },
  classDetails: {
    flex: 1,
  },
  className: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  classCoach: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  classStatus: {
    backgroundColor: '#e8f5e9',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  classStatusText: {
    color: '#388e3c',
    fontSize: 12,
  },
  checkInButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  checkInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  prRecord: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  prExercise: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  prValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
});
