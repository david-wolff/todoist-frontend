# TODOIST Frontend

O nosso projeto é um planejador de tarefas que permite criar e organizar suas atividades.

## Getting started

Clone the repository

```bash
git clone git@github.com:antoniomesquita09/todoist-frontend.git
cd todoist-frontend
```

---

### Running locally

Use or install node version v18.16.0 with nvm:

```bash
nvm use
```

Install all dependencies:

```bash
npm install
```

First, run the development server:

```bash
npm run dev
```

Now the webapp is running on [http://localhost:3000](http://localhost:3000)

---

### Running with docker

Pull the docker image from a deployed docker tag on **DockerHub**

```bash
docker image pull antoniomesquita09/todoist-frontend
```

Run the deployed image locally

```bash
docker run -dp 0.0.0.0:3000:3000 antoniomesquita09/todoist-frontend
```

Now the webapp is running on [http://localhost:3000](http://localhost:3000)

---

### Funcionalidades propostas

- Tela de listagem de tarefas
- Tela de criação de uma tarefa
- Tela de edição de uma tarefa
- Botão de remoção de uma tarefa na tela de edição
- Roteamento entre telas

### Funcionalidades entregues

- Tela de listagem de tarefas
- Tela de criação de uma tarefa
- Tela de edição de uma tarefa
- Botão de remoção de uma tarefa na tela de edição
- Roteamento entre telas
- *Paginação da listagem de tarefas*
- *Filtro na listagem de tarefas por tarefa feita/não feita/todas*

### Limitações

- Não é possível fazer atualizações parciais das tarefas (método PATCH não implementado)
- Não foram implementados os erros de validação em campos obrigatórios do formulário.
- Detalhes do autor não é retornado em nenhum dos endpoints
- Não existe uma trava de paginação no frontend, ou seja, é possível prosseguir para uma página inexistente
- Não é possível filtrar/buscar por propriedades diferentes de filter_by_done
- Fluxo de autenticação e autorização

### Tecnologias utilizadas

O frontend foi desenvolvido utilizando o framework NextJs e Typescript.
