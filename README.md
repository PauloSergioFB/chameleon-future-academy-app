![Banner](./docs/banner.png)

[![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)]()
[![FIAP](https://img.shields.io/badge/FIAP-ED145B?style=for-the-badge&logoColor=white)]()

O Chameleon Future Academy é uma plataforma educacional criada para ajudar pessoas cujas profissões estão sendo impactadas ou substituídas pelos avanços tecnológicos. Seu objetivo é facilitar a migração de carreira, oferecendo cursos focados em habilidades relevantes para o mercado do futuro.

No estágio atual de desenvolvimento, o aplicativo é capaz de criar uma conta de usuário, realizar login, manter a sessão autenticada por meio de token JWT armazenado no AsyncStorage e listar cursos com opção de filtragem. As demais funcionalidades previstas para o produto final, ainda não estão implementadas nesta versão.

> Este repositório contém os arquivos do APP Chameleon Future Academy, desenvolvido com React Native.

---

[Demonstração da Solução](#demonstração-da-solução) | [Setup do Projeto](#setup-do-projeto) | [Stack Tecnológica](#stack-tecnológica) | [Desenvolvedores](#desenvolvedores)

---

## Demonstração da Solução

**Assista no YouTube:** [https://youtu.be/jwT6pl8h4AI](https://youtu.be/jwT6pl8h4AI)

## Setup do Projeto

### Instalação Local

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Emulador Android** ou aplicativo **Expo Go** no dispositivo físico

#### 1. Clonar Repositório

```bash
# Clonar o repositório
git clone https://github.com/PauloSergioFB/chameleon-future-academy-app.git

# Acessar o diretório
cd chameleon-future-academy-app

# Instalar as dependências
npm install

# Iniciar o projeto
npx expo start
```

**Recomendação:** execute o aplicativo em um dispositivo Android (emulador ou dispositivo físico) para uma melhor experiência.

Depois de rodar npx expo start, abra o aplicativo Expo Go no seu celular e escaneie o QR Code exibido no terminal.  
Se preferir usar o emulador, basta abrir o emulador e, no terminal do Expo, apertar a para instalar e executar o app automaticamente.

## Stack Tecnológica

O projeto utiliza as seguintes tecnologias:

- React Native + Expo - Desenvolvimento mobile multiplataforma
- Expo Router - Navegação
- TypeScript - Tipagem estática e segurança de código
- NativeWind - Estilização rápida e consistente
- AsyncStorage - Persistência local de dados
- React Hook Form - Gerenciamento de formulários
- Zod - Validação de dado

## Desenvolvedores

[@AntonioDeLuca](https://github.com/antoniodeluca) - Desenvolvedor Backend  
[@EnzoAzevedo](https://github.com/enzoazevedo) - Desenvolvedor Backend  
[@PauloSérgioFB](https://github.com/paulgramador) - Desenvolvedor Mobile
