# YOUR BODY API

## 🚀 Começando


## O projeto segue a seguinte Estrutura de pastas :

* **src :**  Contém o código fonte da aplicação.
* **conectionbucket:**  Contém o código de conexão com o bucket de hospedagem de arquivos.
* **conectiondatabase:**  Contém o código de conexão com o database.
* **controladores:** Código das funções usadas nas rotas.
* **schemas:** Arquivos de validações espicificas utilizadas nas rotas.
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
> &nbsp; "email" : <span>" teste@teste.com"</span>,
> <br>
>	&nbsp; "senha" : " 123456"
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
>&nbsp;&nbsp;"email": "tese@teste.com",
> <br>
>&nbsp;&nbsp;	"user_photo": "https://yourbody.s3.us-east-005.backblazeb2.com/imagens/user.png"
><br>
>&nbsp;&nbsp;}
><br>
}

### POST  `/user/login`
* Rota para login do usuário.

### Parâmetros
* Nenhum parâmetro necessário.

### Corpo da requisição.
> {
> <br>
>&nbsp;"username" : " teste",
> <br>
>&nbsp;"senha" : " 123456"
> <br>
{

### Exemplo de Resposta.
>{
><br>
>&nbsp;&nbsp;"user": {
><br>
>&nbsp;&nbsp;"id": 1,
><br>
>&nbsp;&nbsp;"username": "teste",
><br>
>&nbsp;&nbsp;"email": "teste@teste.com",
><br>
>&nbsp;&nbsp;"user_photo": "https://yourbody.s3.us-east-005.backblazeb2.com/imagens/user.png"
><br>
>&nbsp;&nbsp;},
><br>
>&nbsp;&nbsp;"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAxNzg0Mjk2LCJleHAiOjE3MDE4NzA2OTZ9.WztLw1G7jiKqi6OE2YeZdDDNTsJHwZwSCqtBJ7wZvwE"
><br>
>}
><br>


### GET `/user/perfil`

* Rota para buscar usuário.

### Parâmetros
* Nenhum parâmetro necessário.

### Corpo da requisição.
* Sem corpo, retorna o usuário logado .

### Exemplo de Resposta.
>{
><br>
>	&nbsp;&nbsp;"id": 1,
><br>
>&nbsp;&nbsp;	"username": "teste",
><br>
>&nbsp;&nbsp;	"email": "teste@teste.com",
><br>
>&nbsp;&nbsp;&nbsp;"user_photo": "https://yourbody.s3.us-east-005.backblazeb2.com/imagens/user.png"
><br>
>}
><br>

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
