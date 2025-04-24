// Dados fictícios para o desenvolvimento do app

export const wodData = [
  {
    id: 1,
    title: 'AMRAP 20',
    description: '5 Pull-ups\n10 Push-ups\n15 Squats',
    duration: 20,
    category: 'Condicionamento',
    difficulty: 'Médio',
  },
  {
    id: 2,
    title: 'For Time',
    description: '21-15-9\nThrusters (40kg/25kg)\nPull-ups',
    duration: 15,
    category: 'Força',
    difficulty: 'Difícil',
  },
  {
    id: 3,
    title: 'EMOM 10',
    description: 'Minuto 1: 10 Burpees\nMinuto 2: 15 Box Jumps',
    duration: 10,
    category: 'Cardio',
    difficulty: 'Fácil',
  },
  {
    id: 4,
    title: 'Tabata',
    description: '8 rounds de 20 segundos de trabalho, 10 segundos de descanso\nRowing for Calories',
    duration: 4,
    category: 'Cardio',
    difficulty: 'Médio',
  },
  {
    id: 5,
    title: 'Chipper',
    description: '100 Double-Unders\n80 Sit-ups\n60 Lunges\n40 Kettlebell Swings\n20 Burpees',
    duration: 25,
    category: 'Condicionamento',
    difficulty: 'Difícil',
  },
];

export const exercisesData = [
  {
    id: 1,
    title: 'Thruster',
    description: 'Um movimento composto de agachamento frontal seguido de um push press.',
    category: 'Força',
    difficulty: 'Médio',
    muscleGroups: ['Quadríceps', 'Glúteos', 'Ombros', 'Tríceps'],
    steps: [
      'Comece com uma barra na posição de rack frontal.',
      'Agache até que os quadris fiquem abaixo dos joelhos.',
      'Impulsione para cima, empurrando a barra overhead em um movimento contínuo.',
      'Termine com os braços completamente estendidos acima da cabeça.',
    ],
  },
  {
    id: 2,
    title: 'Burpee',
    description: 'Um exercício de corpo inteiro que combina agachamento, flexão e salto.',
    category: 'Cardio',
    difficulty: 'Médio',
    muscleGroups: ['Peito', 'Ombros', 'Quadríceps', 'Core'],
    steps: [
      'Comece em pé, agache e coloque as mãos no chão.',
      'Pule os pés para trás, ficando na posição de prancha.',
      'Faça uma flexão completa.',
      'Pule os pés de volta para as mãos e salte com as mãos acima da cabeça.',
    ],
  },
  {
    id: 3,
    title: 'Pull-up',
    description: 'Um exercício de puxada vertical que trabalha principalmente as costas e os braços.',
    category: 'Força',
    difficulty: 'Difícil',
    muscleGroups: ['Latíssimo do Dorso', 'Bíceps', 'Antebraços', 'Trapézio'],
    steps: [
      'Segure na barra com as palmas viradas para frente e as mãos um pouco mais largas que os ombros.',
      'Puxe seu corpo para cima até que seu queixo ultrapasse a barra.',
      'Controle a descida, estendendo completamente os braços.',
      'Repita o movimento.',
    ],
  },
  {
    id: 4,
    title: 'Box Jump',
    description: 'Um exercício pliométrico que envolve saltar em uma caixa a partir de uma posição parada.',
    category: 'Potência',
    difficulty: 'Médio',
    muscleGroups: ['Quadríceps', 'Glúteos', 'Panturrilhas', 'Core'],
    steps: [
      'Fique em pé na frente de uma caixa a uma distância confortável.',
      'Agache parcialmente e balance os braços para trás.',
      'Salte explosivamente para cima e para frente, aterrissando com os dois pés na caixa.',
      'Estenda completamente os quadris no topo e desça com controle.',
    ],
  },
  {
    id: 5,
    title: 'Kettlebell Swing',
    description: 'Um exercício dinâmico que desenvolve potência no quadril e força posterior.',
    category: 'Condicionamento',
    difficulty: 'Fácil',
    muscleGroups: ['Glúteos', 'Isquiotibiais', 'Lombar', 'Core'],
    steps: [
      'Comece com os pés na largura dos ombros e o kettlebell no chão à sua frente.',
      'Segure o kettlebell com as duas mãos, mantendo as costas retas e os ombros para trás.',
      'Balance o kettlebell entre as pernas, como um movimento de hike de futebol americano.',
      'Estenda explosivamente os quadris para balançar o kettlebell até a altura dos ombros.',
    ],
  },
];

export const userData = {
  name: 'Carlos Silva',
  email: 'carlos.silva@email.com',
  profile_image: null, // Adicionar uma imagem real posteriormente
  box: 'CrossFit Essencial',
  stats: {
    workouts: 127,
    prs: 42,
    rank: 8,
  },
  personalRecords: [
    { exercise: 'Back Squat', weight: '120kg', date: '2023-09-15' },
    { exercise: 'Deadlift', weight: '160kg', date: '2023-10-20' },
    { exercise: 'Clean & Jerk', weight: '95kg', date: '2023-08-05' },
    { exercise: 'Snatch', weight: '75kg', date: '2023-07-12' },
    { exercise: '500m Row', time: '1:45', date: '2023-09-30' },
  ],
  recentWorkouts: [
    { id: 1, name: 'AMRAP 20', score: '12 rounds', date: '2023-11-15' },
    { id: 2, name: 'Fran', score: '4:35', date: '2023-11-10' },
    { id: 3, name: 'Grace', score: '3:12', date: '2023-11-05' },
  ],
}; 