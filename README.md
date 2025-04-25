# Essencial Cross App

Aplicativo multiplataforma (iOS, Android, Web) para auxiliar nos treinos de Crossfit, desenvolvido com React Native e Expo.

## Plataformas Alvo

*   Mobile (iOS/Android via Expo)
*   Web

## Autenticação e Perfis de Usuário

O sistema contará com 3 tipos de usuários:

1.  **Aluno:** Visualiza treinos, registra resultados (a definir).
2.  **Coach:** Cria/gerencia treinos (manual ou IA), visualiza progresso dos alunos (a definir).
3.  **Dono do Box:** Gerencia usuários (Alunos e Coaches), visualiza métricas gerais (a definir).

Será implementada uma tela de Login.

## Funcionalidades Planejadas

*   **Cadastro/Gerenciamento de Usuários (Dono do Box):**
    *   Adicionar, editar e inativar Alunos e Coaches.
*   **Criação de Treino (Coach):**
    *   **Manual:** Interface para montar o WOD.
    *   **Treino IA (Menu: `Treino IA`):** Integração com IA (e.g., ChatGPT) para gerar sugestões de treino.
        *   **Nota:** A chave de API para serviços de IA deve ser gerenciada de forma segura (variáveis de ambiente, backend) e **NUNCA** commitada no código-fonte.
*   **Publicação de Treino (Coach):**
    *   Disponibilizar o treino criado (manual ou IA) para os alunos do Box visualizarem (ex: treino do dia seguinte).
*   **Visualização de Treino (Aluno):**
    *   Acesso aos treinos publicados pelo Coach.

## Tecnologias Base

*   React Native
*   Expo
*   Expo Router
*   TypeScript

## Como Rodar o Projeto

1.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
2.  **Execute o aplicativo:**
    *   **Web:**
        ```bash
        npx expo start --web
        ```
    *   **Mobile (Simulador/Emulador/Expo Go):**
        ```bash
        npx expo start
        ```
        (Siga as instruções no terminal)

## Estrutura de Pastas (Atual)

*   `app/`: Contém as telas e navegação.
    *   `(tabs)/`: Telas da navegação principal por abas.
    *   *(Novas rotas/grupos para autenticação e funcionalidades serão adicionadas)*
*   `assets/`: Arquivos estáticos como fontes e imagens.
*   `components/`: Componentes reutilizáveis.
*   `constants/`: Constantes globais (cores, etc.).
*   `hooks/`: Hooks customizados.
*   `src/`: Código fonte principal (utilitários, lógica de negócio, etc.).
*   *(Outros arquivos de configuração Expo/React Native)*

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
 