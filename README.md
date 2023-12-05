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
### body: 
```ts
{
"email": 'email@example.com',
"senha": 'password'
}
```
## POST /login
### body: 
```ts
{
"email": 'email@example.com',
"senha": 'password'
}
```
## POST /categorias
### header:
Authentication: <SUPABSE_JWT_TOKEN>
### body: 
```ts
{
"nome": 'Estudos',
"cor": 'vermelho'
}
```
## GET /categorias
### header:
Authentication: <SUPABSE_JWT_TOKEN>

## PUT /categorias/:categoriaId
### header:
Authentication: <SUPABSE_JWT_TOKEN>
### body: 
```ts
{
"nome": 'Novo nome',
"cor": 'Nova cor'
}
```
## DELETE /categorias/:categoriaId
### header:
Authentication: <SUPABSE_JWT_TOKEN>

## POST /cards
### header:
Authentication: <SUPABSE_JWT_TOKEN>
### body: 
```ts
{
"texto": 'Fazer atividade x',
"categoria": '1',
"status": 'Em andamento'
}
```
## GET /cards
### header:
Authentication: <SUPABSE_JWT_TOKEN>

## PUT /cards/:cardId
### header:
Authentication: <SUPABSE_JWT_TOKEN>
### body: 
```ts
{
"texto": 'Fazer atividade x',
"categoria": '1',
"status": 'Concluída'
}
```
## PUT /cards/:cardId/:newCategoriaId
### header:
Authentication: <SUPABSE_JWT_TOKEN>
  
## DELETE /cards/:cardId
### header:
Authentication: <SUPABSE_JWT_TOKEN>



