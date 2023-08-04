Projeto Fullstack - Instruções para Execução
Este é um projeto fullstack composto por uma aplicação frontend e backend. Para executar o projeto, siga as instruções abaixo:

- Pré-requisitos
Node.js e npm instalados em sua máquina.
Banco de dados PostgreSQL instalado e configurado.
Yarn instalado globalmente.

- Instalação

Frontend

Abra um terminal na pasta front.
Execute o seguinte comando para instalar as dependências:

yarn

Backend

Abra um terminal na pasta back.
Execute o seguinte comando para instalar as dependências:

yarn

Configuração do Banco de Dados

Crie um banco de dados PostgreSQL com o nome desejado.
No arquivo .env na pasta back, configure as variáveis SECRET_KEY e DATABASE_URL com a URL de conexão do seu banco de dados, por exemplo:
bash

DATABASE_URL=postgresql://seu_usuario:senha@localhost:5432/seu_banco_de_dados


Migrações do Banco de Dados

Com o terminal ainda na pasta back, execute o seguinte comando para rodar as migrações do banco de dados:

yarn typeorm migration:run

Executando a Aplicação

No terminal da pasta front, execute o seguinte comando para iniciar a aplicação frontend:

yarn dev

No terminal da pasta back, execute o seguinte comando para iniciar a aplicação backend:

yarn dev

Agora a aplicação estará sendo executada e estará disponível em http://localhost:3000. Acesse esse endereço em seu navegador para interagir com a aplicação.