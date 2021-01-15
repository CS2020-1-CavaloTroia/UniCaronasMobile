<h1 align="center">UniCaronas Mobile
</h1>
<h3 align="center">
🚘 Conectamos caronas com canoneiros da UFG de forma eficiente 🚘
</h3>
<h4 align="center">
	🚧 Em construção 🚧
</h4>

## Tabela de conteúdos

 * [Sobre o projeto](#-sobre-o-projeto)
 * [Funcionalidades](#-funcionalidades)
 * [Layout](#-layout)
 * [Tecnologias](#-tecnologias)
 * [Desenvolvimento](#-desenvolvimento)
  	* [Arquitetura](#arquitetura)
 	* [Pré-requisitos](#pré-requisitos)
 	* [Rodando o Backend](#rodando-o-backend)
 	* [Rodando o Frontend](#rodando-o-frontend)
 * [Como contribuir](#-como-contribuir)
 * [Autores](#-autores)

## 💻 Sobre o projeto

Este projeto é um aplicativo mobile que conecta motoristas e passageiros
universitários matrículados na Universidade Federal de Goiás. Os estudantes
podem oferecer caronas, visualizá-las ou solicitá-las a um motorista.

>Projeto desenvolvido durante o curso de Construção de Software da Universidade Federal de Goiás.

> Obs: Este repositório contempla apenas o <strong>Frontend</strong> do projeto!</br>
BACKEND DISPONÍVEL EM: https://github.com/CS2020-1-CavaloTroia/UniCaronasBackend

## 📱 Funcionalidades

- [x] Estudantes matrículados na UFG tem acesso ao aplicativo móvel, onde podem:
	- [x] solicitar caronas para um local desejado
	- [x] aceitar ou recusar caronas a outros estudantes, dado um local de saída e de chegada
	- [x] definir um valor específico para sua carona, quando oferecerem

## 🎨 Layout

Realizamos a contrução de wireframes para o projeto, que pode ser encontrado no repositório UniCaronas na pasta /wireframes
https://github.com/CS2020-1-CavaloTroia/UniCaronas

## 🛠 Tecnologias

### Frontend
- JavaScript
- React Native 0.63.3

Para o front-end da aplicação será utilizada a linguagem JavaScript juntamente  React Native 0.63. Se tratando de uma aplicação mobile,  as tecnologias citadas apresentam vários componentes que auxiliarão no desenvolvimento de uma aplicação de qualidade.

Será utilizada uma REST - API para a comunicação com o server side.


#### Backend
- Node JS
- MondoDB Atlas
- Heroku

Para o back-end da aplicação será utilizado NodeJS, que contempla ambiente de execução Javascript server-side construído no motor V8 do Chrome.

Também será  utilizado MongoDB Atlas para a base de dados juntamente com Heroku, que é uma plataforma em nuvem (PaaS - Platform as a service) que suporta várias tecnologias para a hospedagem de aplicações.

- [ ] React Native
- [ ] Node.js versão 14.15.4 LTS
- [ ] MongoDB 
- [ ] Heroku 

## 🚀 Desenvolvimento

### Arquitetura

- [ ] Diagrama Arquitetural
<img src="https://github.com/CS2020-1-CavaloTroia/UniCaronas/blob/master/readme_images/arquitetura_UniCaronas.png" width="800">

- [ ] Diagrama de Tecnologias

<img src="https://github.com/CS2020-1-CavaloTroia/UniCaronas/blob/master/readme_images/tecnologias_UniCaronas.png" width="800">

### Pré-requisitos

Antes de dar início, certifique-se que tenha em sua máquina:
- [ ] A parte Backend do projeto, disponível em: https://github.com/CS2020-1-CavaloTroia/UniCaronasBackend
- [ ] Banco de dados MongoBD
- [ ] Node.js versão 14.15.4 LTS ou superior
- [ ] Node versão 10.16 ou superior
- [ ] Yarn versão 1.22.4 ou superior

Além disso, é bom ter um editor para trabalhar com o código, como [VSCode](https://code.visualstudio.com/).

#### Instalando o React Native

- [ ] Siga os passos no site do [React Native](https://reactnative.dev/docs/0.61/getting-started)
- [ ] Selecione o tipo de instalação **React Native CLI Quickstart** e o seu sistema operacional


### Rodando o Frontend

```bash
Clone este repositório
$ git clone https://github.com/CS2020-1-CavaloTroia/UniCaronas

Acesse a pasta do projeto no seu terminal/cmd
$ cd app/UniCaronas

Instale as dependências
$ yarn

Execute a aplicação em modo de desenvolvimento
$ react-native run-is
ou
$ react-native run-android

```

## 💡 Como contribuir

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`

## 👨‍💻 Autores

Grupo Cavalo de Troia da turma de Construção de Software de 2020.1 da Universidade Federal de Goiás
* Amanda Lobo Gomes
* Alan Brito Barros
* Fernando Severino Almeida
* Gustavo Ribeiro de Oliveira
* Michelly Silva Lima

## Versões do README

[Português 🇧🇷](./README.md) | [Inglês 🇺🇸](./README-en.md)
