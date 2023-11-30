# YOUR BODY API

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **[Implantação](#-implanta%C3%A7%C3%A3o)** para saber como implantar o projeto.

## O projeto segue a seguinte Estrutura de pastas :

ºsrc: Contém o código fonte da aplicação.
ºconectionbucket: Contém o código de conexão com o bucket de hospedagem de arquivos.
ºconectiondatabase: Contém o código de conexão com o database.
ºcontroladores: Código das funções usadas nas rotas.
ºrotas : Arquivo contendo todas as rotas da aplicação.
ºtests: Testes automatizados.

## -- Rotas da Aplicação --

### POST /user/cadastrar

-- receber nome,email,senha no body da requisição.
-- validar obrigatoriamente nome,email,senha.
-- verificar existencia do email cadastrado.
-- criar a hash da senha do usuário e salvar no banco de dados.
-- cadastrar usuário no banco de dados.
-- responder com status sem conteúdo no corpo da resposta.

### POST /user/login

-- receber o email,senha no body da requisição
-- verificar a existência do usuário com o email informado, caso não encontre retornar mensagem de erro.
-- verificar se a senha informada do usuário informada no body é a msm comparada com a senha do banco de dados.
-- criar o token com o id do usuário.
-- responder com informações do usuário exceto a senha e o token.

### Criar intermediário de validação de usuário

-- receber o token da requisição pelo cabeçalho.
-- validar o usuário logado pelo id fornecido no token.
-- retornar os dados do usuário logado e permitir o acesso a outras rotas.

### GET /user/perfil

-- receber o token do usuário.
-- respoder com as informaçãoes do usuario logado.

### POST /user/info

-- receber idade ,peso ,altura ,sexo no body da requisição.
-- pegar o id do usuário fornecido pelo token.
-- registrar as informações no banco de dados
-- retornar o status sem conteúdo no corpo da resposta

### POST /user/post

-- receber o conteudo do post no body.
-- receber a imagem no req.file .
-- fazer conexao com o backblaze .
-- hospedar a imagem no backblaze e gerar URL.
-- salvar o horario do post o conteúdo, usuário autor do post e o horário no banco de dados.
-- retornar o status sem conteudo na resposta.

### DELETE /user/post/:id

-- receber pelo parametro de roda o ID do post a ser deletado.
-- validar se o autor do post é o mesmo do usuário que está fazendo a requisição.
-- deletar do banco de dados o post.
-- responder com status sem conteúdo no corpo da resposta.

### GET /user/post/

-- listar todos os posts do usuário logado.
-- responder com status sem conteúdo no corpo da resposta.
