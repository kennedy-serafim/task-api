# Task Managements API

API responsável por fornecer os dados para a aplicação de Gestão de Tarefas

## Instalação

### Dependencias
Certifique-se de ter instalado em seu computador:
- O [node.Js](https://nodejs.org/en/) >= 12.0.x ou [yarn](https://yarnpkg.com/getting-started/install) [Opcional]
- Um SGBD [PostgreSQL](https://www.postgresql.org/download/windows/) >= 11.0.x
- [Git](https://git-scm.com/downloads)

```bash
 node -v
--output: v14.16.0
```

```bash
  postgres -V
  --output: postgres (PostgreSQL) 11.8
```

```bash
  git --version
  --output: git version 2.29.2.windows.1
```

```bash
  yarn -v
  --output: 1.22.10
```

### Instalando e Configurando
1.  No terminal, clone o projecto:

```bash
    git clone https://github.com/kennedy-serafim/task-api.git
```

2.  Entre na pasta do projecto:

```bash
    cd task-api
```

3.  #### Crie um arquivo .env na pasta raiz do projecto e copie o conteúdo que está no arquivo .env.example
    ```bash
       touch .env
    ```
    - Preencha as credencias do banco de dados
    - Preencha o valor do JWT_SECRET

4.  Instale as dependências do projecto:
    - npm ou yarn
```bash
    npm install
```

```bash
    yarn install
```

5. Rode as migrations
  ```bash
     yarn typeorm migration:run
  ```
  
  ```bash
     npm run typeorm migration:run
  ```
  
 ### Como Executar a API
 6. Execute no terminal
 ```bash
     yarn dev
 ```
  
 ```bash
     npm run dev
 ```
