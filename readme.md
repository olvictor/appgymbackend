# YOUR BODY API

## 🚀 Começando


## O projeto segue a seguinte Estrutura de pastas :

* **src :**  Contém o código fonte da aplicação.
* **conectionbucket:**  Contém o código de conexão com o bucket de hospedagem de arquivos.
* **conectiondatabase:**  Contém o código de conexão com o database.
* **controladores:** Código das funções usadas nas rotas.
* **rotas :** Arquivo contendo todas as rotas da aplicação.
* **tests:** Testes automatizados.

## 📋 Rotas da Aplicação 

### POST  `/user/cadastrar`
* Rota para cadastro de usuários.

### Parâmetros
* Nenhum parâmetro necessário.

### Corpo da requisição.
> {
> <br>
>	&nbsp; "username" : " teste",
> <br>
> &nbsp; "email" : <span>" testando@teste.com"</span>,
> <br>
>	 &nbsp;"senha" : " 123456"
> <br>
{

### Exemplo de Resposta.
>{
> <br>
>&nbsp;"mensagem": "Usuario cadastrado com sucesso .",
> <br>
>&nbsp;"user": {
> <br>
>&nbsp;&nbsp;"id": 1,
> <br>
>&nbsp;&nbsp;"username": "teste",
> <br>
>&nbsp;&nbsp;"email": "testando@teste.com",
> <br>
>&nbsp;&nbsp;	"user_photo": "https://yourbody.s3.us-east-005.backblazeb2.com/imagens/user.png"
><br>
>	}
><br>
}

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
