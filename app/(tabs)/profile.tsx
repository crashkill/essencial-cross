import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Importar dados simulados e componentes
import { userData } from '@/src/utils/mockData';
import ProfileStats from '@/src/components/ProfileStats';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cabeçalho do perfil */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            {userData.profile_image ? (
              <Image source={{ uri: userData.profile_image }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImagePlaceholderText}>
                  {userData.name.split(' ').map(name => name[0]).join('')}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userData.name}</Text>
            <Text style={styles.profileBox}>{userData.box}</Text>
            <View style={styles.profileActions}>
              <TouchableOpacity style={styles.editProfileButton} onPress={() => router.navigate('/edit-profile')}>
                <Text style={styles.editProfileText}>Editar Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingsButton} onPress={() => router.navigate('/settings')}>
                <Ionicons name="settings-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Estatísticas */}
        <View style={styles.statsSection}>
          <ProfileStats 
            workouts={userData.stats.workouts} 
            prs={userData.stats.prs} 
            rank={userData.stats.rank}
          />
        </View>

        {/* Seção de Personal Records */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Records</Text>
            <TouchableOpacity onPress={() => router.navigate('/all-prs')}>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
          {userData.personalRecords.map((pr, index) => (
            <View key={index} style={styles.prCard}>
              <View style={styles.prInfo}>
                <Text style={styles.prName}>{pr.exercise}</Text>
                <Text style={styles.prDate}>{new Date(pr.date).toLocaleDateString('pt-BR')}</Text>
              </View>
              <View style={styles.prValue}>
                <Text style={styles.prValueText}>{pr.weight || pr.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Seção de Treinos Recentes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Treinos Recentes</Text>
            <TouchableOpacity onPress={() => router.navigate('/workout-history')}>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
          {userData.recentWorkouts.map((workout, index) => (
            <View key={index} style={styles.workoutCard}>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.workoutDate}>{new Date(workout.date).toLocaleDateString('pt-BR')}</Text>
              </View>
              <View style={styles.workoutScore}>
                <Text style={styles.workoutScoreLabel}>Resultado:</Text>
                <Text style={styles.workoutScoreValue}>{workout.score}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Badges e Conquistas */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Badges & Conquistas</Text>
            <TouchableOpacity onPress={() => router.navigate('/achievements')}>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.badgesContainer}>
            <View style={styles.badge}>
              <View style={styles.badgeIcon}>
                <Ionicons name="trophy" size={32} color="#FFD700" />
              </View>
              <Text style={styles.badgeName}>100 WODs</Text>
            </View>
            
            <View style={styles.badge}>
              <View style={styles.badgeIcon}>
                <Ionicons name="flame" size={32} color="#FF4500" />
              </View>
              <Text style={styles.badgeName}>30 dias seguidos</Text>
            </View>
            
            <View style={styles.badge}>
              <View style={styles.badgeIcon}>
                <Ionicons name="barbell" size={32} color="#4682B4" />
              </View>
              <Text style={styles.badgeName}>10 PRs</Text>
            </View>
            
            <View style={styles.badge}>
              <View style={[styles.badgeIcon, styles.lockedBadge]}>
                <Ionicons name="lock-closed" size={32} color="#A9A9A9" />
              </View>
              <Text style={styles.lockedBadgeName}>Bloqueado</Text>
            </View>
          </View>
        </View>

        {/* Botões de Navegação */}
        <View style={styles.navigationButtons}>
          <TouchableOpacity 
            style={styles.navigationButton}
            onPress={() => router.navigate('/measurements')}
          >
            <Ionicons name="fitness" size={24} color="#e74c3c" />
            <Text style={styles.navigationButtonText}>Medidas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navigationButton}
            onPress={() => router.navigate('/nutrition')}
          >
            <Ionicons name="nutrition" size={24} color="#e74c3c" />
            <Text style={styles.navigationButtonText}>Nutrição</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navigationButton}
            onPress={() => router.navigate('/friends')}
          >
            <Ionicons name="people" size={24} color="#e74c3c" />
            <Text style={styles.navigationButtonText}>Amigos</Text>
          </TouchableOpacity>
        </View>
        
        {/* Espaço no final para scroll */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholderText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileBox: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  profileActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editProfileButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  editProfileText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  settingsButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#f2f2f2',
  },
  statsSection: {
    padding: 16,
  },
  section: {
    padding: 16,
    paddingTop: 0,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
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
  prCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  prInfo: {
    flex: 1,
  },
  prName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  prDate: {
    fontSize: 12,
    color: '#999',
  },
  prValue: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  prValueText: {
    fontWeight: 'bold',
    color: '#e74c3c',
    fontSize: 16,
  },
  workoutCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  workoutInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  workoutDate: {
    fontSize: 14,
    color: '#999',
  },
  workoutScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutScoreLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  workoutScoreValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badge: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  lockedBadge: {
    backgroundColor: '#eee',
  },
  lockedBadgeName: {
    fontSize: 14,
    color: '#999',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 8,
  },
  navigationButton: {
    alignItems: 'center',
  },
  navigationButtonText: {
    fontSize: 14,
    marginTop: 4,
    color: '#333',
  },
}); 