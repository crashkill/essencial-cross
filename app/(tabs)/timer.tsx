import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Tipos de timer
const TIMER_TYPES = {
  AMRAP: 'AMRAP',
  FOR_TIME: 'FOR TIME',
  EMOM: 'EMOM',
  TABATA: 'TABATA',
};

export default function TimerScreen() {
  const [selectedTimerType, setSelectedTimerType] = useState(TIMER_TYPES.AMRAP);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(20 * 60); // 20 minutos padrão para AMRAP
  const [rounds, setRounds] = useState(0);
  const [workInterval, setWorkInterval] = useState(60); // 60 segundos para EMOM/Tabata
  const [restInterval, setRestInterval] = useState(0); // Para Tabata
  const [currentInterval, setCurrentInterval] = useState('work'); // 'work' ou 'rest'
  
  const interval = useRef(null);
  
  // Configurações padrão para cada tipo de timer
  useEffect(() => {
    switch (selectedTimerType) {
      case TIMER_TYPES.AMRAP:
        setDuration(20 * 60); // 20 minutos
        break;
      case TIMER_TYPES.FOR_TIME:
        setDuration(15 * 60); // 15 minutos
        break;
      case TIMER_TYPES.EMOM:
        setDuration(10 * 60); // 10 minutos
        setWorkInterval(60); // 1 minuto por rodada
        break;
      case TIMER_TYPES.TABATA:
        setDuration(4 * 60); // 4 minutos
        setWorkInterval(20); // 20 segundos de trabalho
        setRestInterval(10); // 10 segundos de descanso
        break;
    }
    resetTimer();
  }, [selectedTimerType]);
  
  // Lógica do timer
  useEffect(() => {
    if (isTimerRunning && !isPaused) {
      interval.current = setInterval(() => {
        setTime((prevTime) => {
          // Lógica para cada tipo de timer
          if (selectedTimerType === TIMER_TYPES.TABATA) {
            const totalIntervalTime = workInterval + restInterval;
            const currentCycle = Math.floor(prevTime / totalIntervalTime);
            const timeInCurrentCycle = prevTime % totalIntervalTime;
            
            if (timeInCurrentCycle === 0 && prevTime > 0) {
              // Play sound or vibrate to indicate start of new round
            }
            
            // Detectar transição entre work e rest
            if (timeInCurrentCycle === workInterval && currentInterval === 'work') {
              setCurrentInterval('rest');
              // Play sound or vibrate to indicate rest
            } else if (timeInCurrentCycle === 0 && currentInterval === 'rest' && prevTime > 0) {
              setCurrentInterval('work');
              // Play sound or vibrate to indicate work
            }
          }
          
          // Incrementar o contador de rounds para EMOM
          if (selectedTimerType === TIMER_TYPES.EMOM && prevTime > 0 && prevTime % workInterval === 0) {
            setRounds((prevRounds) => prevRounds + 1);
            // Play sound or vibrate to indicate new round
          }
          
          // Verificar se o timer terminou
          if (prevTime >= duration) {
            clearInterval(interval.current);
            setIsTimerRunning(false);
            return prevTime;
          }
          
          return prevTime + 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [isTimerRunning, isPaused, selectedTimerType, duration, workInterval, restInterval, currentInterval]);
  
  // Formatar o tempo para exibição
  const formatTime = (timeInSeconds) => {
    if (selectedTimerType === TIMER_TYPES.AMRAP || selectedTimerType === TIMER_TYPES.FOR_TIME) {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if (selectedTimerType === TIMER_TYPES.EMOM) {
      const totalSeconds = workInterval - (time % workInterval);
      return `${Math.floor(totalSeconds / 60).toString().padStart(2, '0')}:${(totalSeconds % 60).toString().padStart(2, '0')}`;
    } else if (selectedTimerType === TIMER_TYPES.TABATA) {
      const totalIntervalTime = workInterval + restInterval;
      const timeInCurrentCycle = time % totalIntervalTime;
      const remainingTime = currentInterval === 'work' 
        ? workInterval - timeInCurrentCycle 
        : restInterval - (timeInCurrentCycle - workInterval);
      
      return `${Math.floor(remainingTime / 60).toString().padStart(2, '0')}:${(remainingTime % 60).toString().padStart(2, '0')}`;
    }
    
    return '00:00';
  };
  
  // Resetar o timer
  const resetTimer = () => {
    clearInterval(interval.current);
    setTime(0);
    setRounds(0);
    setIsTimerRunning(false);
    setIsPaused(false);
    setCurrentInterval('work');
  };
  
  // Controles do timer
  const startTimer = () => {
    setIsTimerRunning(true);
    setIsPaused(false);
  };
  
  const pauseTimer = () => {
    setIsPaused(true);
  };
  
  const resumeTimer = () => {
    setIsPaused(false);
  };
  
  // Decrementar/incrementar o timer
  const decrementTime = (value) => {
    if (selectedTimerType === TIMER_TYPES.AMRAP || selectedTimerType === TIMER_TYPES.FOR_TIME) {
      setDuration(prev => Math.max(60, prev - value));
    } else if (selectedTimerType === TIMER_TYPES.EMOM) {
      setWorkInterval(prev => Math.max(10, prev - value));
    } else if (selectedTimerType === TIMER_TYPES.TABATA) {
      if (currentInterval === 'work') {
        setWorkInterval(prev => Math.max(5, prev - value));
      } else {
        setRestInterval(prev => Math.max(5, prev - value));
      }
    }
  };
  
  const incrementTime = (value) => {
    if (selectedTimerType === TIMER_TYPES.AMRAP || selectedTimerType === TIMER_TYPES.FOR_TIME) {
      setDuration(prev => prev + value);
    } else if (selectedTimerType === TIMER_TYPES.EMOM) {
      setWorkInterval(prev => prev + value);
    } else if (selectedTimerType === TIMER_TYPES.TABATA) {
      if (currentInterval === 'work') {
        setWorkInterval(prev => prev + value);
      } else {
        setRestInterval(prev => prev + value);
      }
    }
  };
  
  // Renderizar os botões de controle do tempo
  const renderTimeControls = () => {
    return (
      <View style={styles.timeControlsContainer}>
        <TouchableOpacity style={styles.timeControlButton} onPress={() => decrementTime(60)}>
          <Text style={styles.timeControlText}>-1m</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeControlButton} onPress={() => decrementTime(10)}>
          <Text style={styles.timeControlText}>-10s</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeControlButton} onPress={() => incrementTime(10)}>
          <Text style={styles.timeControlText}>+10s</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timeControlButton} onPress={() => incrementTime(60)}>
          <Text style={styles.timeControlText}>+1m</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Timer</Text>
      </View>
      
      {/* Seletor de tipo de timer */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.timerTypesContainer}
        contentContainerStyle={styles.timerTypesContent}
      >
        {Object.values(TIMER_TYPES).map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.timerTypeButton,
              selectedTimerType === type && styles.selectedTimerTypeButton,
            ]}
            onPress={() => setSelectedTimerType(type)}
            disabled={isTimerRunning}
          >
            <Text
              style={[
                styles.timerTypeText,
                selectedTimerType === type && styles.selectedTimerTypeText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Display do timer */}
      <View style={styles.timerDisplayContainer}>
        <View style={[
          styles.timerDisplay,
          currentInterval === 'rest' && styles.restTimerDisplay,
        ]}>
          <Text style={styles.timerText}>{formatTime(selectedTimerType === TIMER_TYPES.FOR_TIME ? duration - time : time)}</Text>
          
          {(selectedTimerType === TIMER_TYPES.EMOM || selectedTimerType === TIMER_TYPES.TABATA) && (
            <View style={styles.roundsContainer}>
              <Text style={styles.roundsLabel}>
                {selectedTimerType === TIMER_TYPES.EMOM ? 'Round' : 'Intervalo'}
              </Text>
              <Text style={styles.roundsValue}>
                {selectedTimerType === TIMER_TYPES.EMOM 
                  ? rounds + 1 
                  : Math.floor(time / (workInterval + restInterval)) + 1}
              </Text>
              {selectedTimerType === TIMER_TYPES.TABATA && (
                <View style={[
                  styles.intervalTypeContainer,
                  currentInterval === 'rest' && styles.restIntervalContainer
                ]}>
                  <Text style={styles.intervalTypeText}>
                    {currentInterval === 'work' ? 'TRABALHO' : 'DESCANSO'}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
        
        {!isTimerRunning && renderTimeControls()}
      </View>
      
      {/* Controles do timer */}
      <View style={styles.timerControlsContainer}>
        {!isTimerRunning ? (
          <TouchableOpacity style={styles.startButton} onPress={startTimer}>
            <Ionicons name="play" size={24} color="#fff" />
            <Text style={styles.startButtonText}>Iniciar</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.runningControlsContainer}>
            {isPaused ? (
              <TouchableOpacity style={styles.controlButton} onPress={resumeTimer}>
                <Ionicons name="play" size={24} color="#fff" />
                <Text style={styles.controlButtonText}>Continuar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.controlButton} onPress={pauseTimer}>
                <Ionicons name="pause" size={24} color="#fff" />
                <Text style={styles.controlButtonText}>Pausar</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.controlButton, styles.resetButton]} onPress={resetTimer}>
              <Ionicons name="refresh" size={24} color="#fff" />
              <Text style={styles.controlButtonText}>Reiniciar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {/* Descrição do timer */}
      <View style={styles.timerDescriptionContainer}>
        <Text style={styles.timerDescriptionTitle}>
          {selectedTimerType === TIMER_TYPES.AMRAP && 'As Many Rounds As Possible'}
          {selectedTimerType === TIMER_TYPES.FOR_TIME && 'Complete For Time'}
          {selectedTimerType === TIMER_TYPES.EMOM && 'Every Minute On the Minute'}
          {selectedTimerType === TIMER_TYPES.TABATA && 'Tabata Interval'}
        </Text>
        <Text style={styles.timerDescriptionText}>
          {selectedTimerType === TIMER_TYPES.AMRAP && 'Complete o maior número possível de rounds no tempo determinado.'}
          {selectedTimerType === TIMER_TYPES.FOR_TIME && 'Complete o treino o mais rápido possível dentro do tempo limite.'}
          {selectedTimerType === TIMER_TYPES.EMOM && 'Inicie um exercício específico a cada minuto. O tempo restante é de descanso.'}
          {selectedTimerType === TIMER_TYPES.TABATA && `${workInterval} segundos de trabalho seguidos por ${restInterval} segundos de descanso.`}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  timerTypesContainer: {
    maxHeight: 60,
  },
  timerTypesContent: {
    padding: 16,
    paddingBottom: 0,
  },
  timerTypeButton: {
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
    minWidth: 80,
    alignItems: 'center',
  },
  selectedTimerTypeButton: {
    backgroundColor: '#e74c3c',
  },
  timerTypeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  selectedTimerTypeText: {
    color: '#fff',
  },
  timerDisplayContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    paddingBottom: 16,
  },
  timerDisplay: {
    width: screenWidth - 32,
    height: screenWidth / 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  restTimerDisplay: {
    backgroundColor: '#ffebee',
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#333',
  },
  roundsContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    alignItems: 'center',
  },
  roundsLabel: {
    fontSize: 14,
    color: '#666',
  },
  roundsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  intervalTypeContainer: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 8,
  },
  restIntervalContainer: {
    backgroundColor: '#f44336',
  },
  intervalTypeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  timeControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  timeControlButton: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  timeControlText: {
    fontWeight: 'bold',
    color: '#333',
  },
  timerControlsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  startButton: {
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 8,
  },
  runningControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButton: {
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  resetButton: {
    backgroundColor: '#f39c12',
    marginRight: 0,
  },
  controlButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 8,
  },
  timerDescriptionContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timerDescriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  timerDescriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
}); 