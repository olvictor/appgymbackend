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

### 💬 POST  `/user/cadastrar`
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
><br>
>&nbsp;"mensagem": "Usuario cadastrado com sucesso .",
><br>
>&nbsp;"user": {
> <br>
>&nbsp;&nbsp;"id": 1,
> <br>
>&nbsp;&nbsp;"username": "teste",
><br>
>&nbsp;&nbsp; "email": "tese@teste.com",
><br>
>&nbsp;&nbsp;	"user_photo": "https://yourbody.s3.us-east-005.backblazeb2.com/imagens/user.png"
><br>
>&nbsp;&nbsp;}
><br>
}

### 💬 POST  `/user/login`
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


### 💬 GET `/user/perfil`

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

### 💬 POST  /user/info

* Rota para adicionar informações sobre o  usuário.

### Parâmetros
* Nenhum parâmetro necessário.

### Corpo da requisição.

>{
><br>
>&nbsp;&nbsp;	"peso" : "80",
><br>
>&nbsp;&nbsp;	"altura" : "1.79",
><br>
>&nbsp;&nbsp;	"sexo" : "masculino",
><br>
>&nbsp;&nbsp;	"idade":"28",
><br>
>&nbsp;&nbsp;	"nivel_de_atividade":"leve",
><br>
>&nbsp;&nbsp;	"objetivo": "perder"
><br>
>}

### Exemplo de Resposta.
>{
><br>
>	&nbsp;&nbsp;"id": 1,
><br>
>	&nbsp;&nbsp;"usuario_id": 1,
><br>
>	&nbsp;&nbsp;"nome": null,
><br>
>	&nbsp;&nbsp;"idade": "28",
><br>
>	&nbsp;&nbsp;"altura": "1.79",
><br>
>	&nbsp;&nbsp;"peso": "80",
><br>
>	&nbsp;&nbsp;"sexo": "masculino",
><br>
>	&nbsp;&nbsp;"imc": null,
><br>
>&nbsp;&nbsp;"imc_classificacao": null,
><br>
>	&nbsp;&nbsp;"nivel_de_atividade": "leve",
><br>
>	&nbsp;&nbsp;"objetivo": "perder"
><br>
>	}

### 💬 POST /user/post

* Rota para adicionar um post do usuário.

### Parâmetros
* Nenhum parâmetro necessário.

### Corpo da requisição.

>{
><br>
>&nbsp;&nbsp;	"Conteudo" : "Realizando um post ." ,
><br>
>&nbsp;&nbsp;	"imagem" : "arquivo.png" type: "file",
><br>
>}

### Exemplo de Resposta.
>{
><br>
>&nbsp;&nbsp;	"id": 1,
><br>
>&nbsp;&nbsp;	"usuario_id": 1,
><br>
>&nbsp;&nbsp;	"conteudo": "Realizando post .",
><br>
>&nbsp;&nbsp;	"imagem_url": "https://yourbody.s3.us-east-005.backblazeb2.com/imagens/gym.jpg",
><br>
>&nbsp;&nbsp;"data_publicacao": "2023-12-06T15:01:42.995Z"
><br>
>}


### 💬 DELETE /user/post/:id

* Rota para deletar um post do usuário .

### Parâmetros
* :id.

### Corpo da requisição.
* Nenhum campo necessário .

### Exemplo de Resposta.
>{
><br>
>&nbsp;&nbsp;	"mensagem": "Post deletado com sucesso .",
><br>
>	&nbsp;&nbsp;"post_deletado": {
><br>
>	&nbsp;&nbsp;	"id": 1,
><br>
>	&nbsp;&nbsp;	"usuario_id": 1,
><br>
>	&nbsp;&nbsp;	"conteudo": "Realizando post .",
><br>
>	&nbsp;&nbsp;	"imagem_url": "https://yourbody.s3.us-east-005.backblazeb2.com/imagens/gym.jpg",
><br>
>	&nbsp;&nbsp;	"data_publicacao": "2023-12-06T15:01:42.995Z"
><br>
>	&nbsp;&nbsp;}
><br>
>}

###  💬 GET /user/feed/

* Retorna os posts do usuário logado.

### Parâmetros
* Nenhum parâmetro necessário.
* 
### Corpo da requisição.
* Nenhum campo necessário .
### Exemplo de Resposta.

>{
><br>
>&nbsp;&nbsp;"id": 5,
><br>
>&nbsp;&nbsp;"usuario_id": 1,
><br>
>&nbsp;&nbsp;"conteudo": "Realizando post .",
><br>
>&nbsp;&nbsp;"imagem_url": "https://yourbody.s3.us-east-005.backblazeb2.com/imagens/gym.jpg",
><br>
>&nbsp;&nbsp;"data_publicacao": "2023-12-06T14:22:12.743Z"
><br>
>},
><br>
>{
>&nbsp;&nbsp;"id": 6,
><br>
>&nbsp;&nbsp;"usuario_id": 1,
><br>
>&nbsp;&nbsp;"conteudo": "Realizando post .",
><br>
>&nbsp;&nbsp;"imagem_url": "https://yourbody.s3.us-east-005.backblazeb2.com/imagens/gym.jpg",
><br>
>&nbsp;&nbsp;"data_publicacao": "2023-12-06T15:01:37.833Z"
><br>
>},
