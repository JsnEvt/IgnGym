<p align="center">
  <h1 align="center">Ignite Gym - React Native :rocket:</h1>
</p>

Ignite Gym é uma aplicação de gerenciamento de treinos para academia.

___

# **Documentacão App mobile – Ignite Gym**
Aplicativo mobile para acompanhamento das atividades físicas realizadas em uma academia.

## Proposta
O aplicativo dispõe de uma interface para o usuário marcar uma série de atividades físicas e registrá-la em seu histórico e assim manter a regularidade de suas atividades. O histórico por sua vez, listará as atividades realizadas, agrupadas por data, favorecendo a motivação e a distribuição regular dos exercícios, melhorando a eficácia dos resultados.

A aplicação conta com um sistema de cadastro de usuários 100% funcional, fazendo uso de tokens de autenticação, onde você pode gerenciar a sua senha e o seu avatar.

Além disso, toda ela funciona com o uso do Async Storage, ou seja, se você fechar a aplicação os dados que inseriu nela estarão lá na próxima vez que você abri-la.

# O Aplicativo

## TELA 1 (Login e criação de conta)

<div align="center">
  <img src="https://github.com/JsnEvt/ign_gym/blob/main/img/login240x520.png" alt="Tela de Login">
</div>

## TELA 2 (Início da aplicação / seleção de grupos)

<div align="center">
  <img src="https://github.com/JsnEvt/ign_gym/blob/main/img/tela1240x520.png" alt="Selecao de grupos">
</div>

## TELA  3 (Detalhes do exercício)

<div align="center">
  <img src="https://github.com/JsnEvt/ign_gym/blob/main/img/detalhe240x520.png" alt="Detalhes">
</div>

## TELA 4 (Histórico)

<div align="center">
  <img src="https://github.com/JsnEvt/ign_gym/blob/main/img/lista_exercicios_realizados240c520.png" alt="Historico">
</div>

## TELA 5 (Perfil)

<div align="center">
  <img src="https://github.com/JsnEvt/ign_gym/blob/main/img/perfil1240x520.png" alt="Perfil">
</div>

# Segurança
O aplicativo faz uso do recurso de autenticação (token) para logar o usuário e navegar pelas telas. Quando o token é expirado durante a navegação, o back-end se encarregará de gerar um novo token para que a navegação seja fluida.

## 🛠 Tecnologias

As seguintes tecnologias foram empregadas na criação deste projeto:

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Phosphor Icons](https://phosphoricons.com/)
- [ESLint](https://eslint.org/)
- [NativeBase](https://nativebase.io/)
- [Async Storage](https://reactnative.dev/docs/asyncstorage)
- [React Navigation](https://reactnavigation.org/)
- [React Navigation Native Stack](https://reactnavigation.org/docs/native-stack-navigator/)
- [Expo Google Fonts](https://github.com/expo/google-fonts)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [React Navigation Bottom Tabs](https://reactnavigation.org/docs/bottom-tab-navigator/)
- [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [React Hook Form](https://www.react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)

## 🚀 Como utilizar

Clone o projeto para o local desejado em seu computador.

```bash
$ git clone https://github.com/JsnEvt/IgnGym
```
___

#### 🚧 Executando o Back-end
```bash

# Navegue até o diretório
$ cd IgnGym_backend

# Instale as dependências necessárias
$ npm install

# Agora inicie o servidor do back-end
$ npm run start

# O servidor irá rodar na porta 3333 com o aviso: "Server is running on Port 3333".

```
___

#### 🚧 Executando o Front-end
```bash

# Com o back-end rodando, abra um novo terminal e navegue até o diretório
$ cd IgnGym

# Instale as dependências necessárias
$ npm install

# Agora inicie a aplicação - Um QR Code será exibido no Terminal
$ npm run start

# Em seu celular instale o aplicativo Expo Go.

# Abra o Expo Go que acabou de instalar, e então escaneie o QR Code através do aplicativo.

# A aplicação então será exibida de forma 100% funcional diretamente em seu celular.

```

## 🦸 Autor

[![Linkedin Badge](https://img.shields.io/badge/-Jason-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/jason-everton-041226223/)](https://www.linkedin.com/in/jason-everton)

[![Gmail Badge](https://img.shields.io/badge/-jasonemsw10@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:jasonemsw10@gmail.com)](mailto:jasonemsw10@gmail.com)


## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com ❤️ por Jason Everton 👋🏽 [Entre em contato!](https://www.linkedin.com/in/jason-everton)

---
