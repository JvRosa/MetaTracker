# MetaTracker

O MetaTracker tem como objetivo proporcionar aos usuários uma plataforma centralizada e amigável para o agendamento, monitoramento e realização de suas metas e objetivos. Queremos oferecer uma solução que inspire a organização, motive o progresso e ajude os usuários a atingirem seus objetivos de forma mais eficaz, transformando sonhos em realizações tangíveis.

## Problema:
Atualmente, muitas pessoas enfrentam desafios na gestão eficiente de suas metas e objetivos. A vida moderna, muitas vezes agitada, torna difícil lembrar, organizar e acompanhar as metas estabelecidas, resultando em um baixo índice de realização desses objetivos. A falta de uma ferramenta integrada e intuitiva contribui para a dispersão de esforços, desmotivação e, em última instância, para o não cumprimento de metas importantes.

## Funcionalidades:
Com essa ferramente, esperamos fornecer um ambiente intuitivo, onde o usuário pode registrar tarefas e metas a serem atingidas, adicionar descrições detalhadas, organizá-las e classificá-las por data e tipos diferentes e vizualizar gráficos e dados sobre seu desempenho, assim colaborando para uma melhor organização pessoal e satisfação diante da realização de seus objetivos.

## Usuários finais:
Nosso sistema de agendamento de metas/objetivos é projetado para atender a uma ampla gama de usuários finais, proporcionando uma experiência intuitiva e eficaz para pessoas comuns que aspiram a um melhor gerenciamento de suas vidas e o alcance de metas significativas.

![image](https://github.com/JvRosa/MetaTracker/assets/110125524/58855daf-b799-4a86-9aa6-6db38f2e7260)

# Rotas
## POST /register 
Realizar cadastro de um novo usuário.
### body: 
```ts
{
"email": 'email@example.com',
"senha": 'password'
}
```
## POST /login
Realizar login.
### body: 
```ts
{
"email": 'email@example.com',
"senha": 'password'
}
```
## POST /categorias
Criar uma nova categoria.
### header:
Authorization: <SUPABSE_JWT_TOKEN>
### body: 
```ts
{
"nome": 'Estudos',
"cor": 'vermelho'
}
```
## GET /categorias
Listar as categorias de um usuário.
### header:
Authorization: <SUPABSE_JWT_TOKEN>

## PUT /categorias/:categoriaId
Atualizar os campos de uma categoria já existente.
### header:
Authorization: <SUPABSE_JWT_TOKEN>
### body: 
```ts
{
"nome": 'Novo nome',
"cor": 'Nova cor'
}
```
## DELETE /categorias/:categoriaId
Excluir uma categoria existente.
### header:
Authorization: <SUPABSE_JWT_TOKEN>

## POST /cards
Criar uma nova meta.
### header:
Authorization: <SUPABSE_JWT_TOKEN>
### body: 
```ts
{
"texto": 'Fazer atividade x',
"categoria": '1',
"status": 'Em andamento'
}
```
## GET /cards
Listar as metas de um usuário.
### header:
Authorization: <SUPABSE_JWT_TOKEN>

## PUT /cards/:cardId
Atualizar uma meta existente, por exemplo o status para "Concluída".
### header:
Authorization: <SUPABSE_JWT_TOKEN>
### body: 
```ts
{
"texto": 'Fazer atividade x',
"categoria": '1',
"status": 'Concluída',
"data_terminou": '05/12/2023'
}
```
## PUT /cards/:cardId/:newCategoriaId
Trocar a categoria de uma meta específica.
### header:
Authorization: <SUPABSE_JWT_TOKEN>
  
## DELETE /cards/:cardId
Excluir uma meta existente.
### header:
Authorization: <SUPABSE_JWT_TOKEN>



