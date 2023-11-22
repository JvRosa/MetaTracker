# MetaTracker
![image](https://github.com/JvRosa/MetaTracker/assets/110125524/58855daf-b799-4a86-9aa6-6db38f2e7260)

# Rotas
## POST /criar_categoria
### header:
´´´html
Authentication: <SUPABSE_JWT_TOKEN>
```
### body: 
```ts
{} as Categoria
```
## PUT /atualizar_categoria
### header:
´´´html
Authentication: <SUPABSE_JWT_TOKEN>
```
### body: 
```ts
{} as Partial<Categoria>
```
## DELETE /deletar_categoria/:categoriaId
### header:
´´´html
Authentication: <SUPABSE_JWT_TOKEN>
```
### body: 
```ts
{}
```

## POST /criar_card
### header:
´´´html
Authentication: <SUPABSE_JWT_TOKEN>
```
### body: 
```ts
{} as Card
```
## PUT /atualizar_card/:cardId
### header:
´´´html
Authentication: <SUPABSE_JWT_TOKEN>
```
### body: 
```ts
{} as Partial<Card>
```
## POST /trocar_card_de_cxategoria/:cardId/:newCardId
### header:
´´´html
Authentication: <SUPABSE_JWT_TOKEN>
```
### body: 
```ts
{}
```
## DELETE /deletar_card/:cardId
### header:
´´´html
Authentication: <SUPABSE_JWT_TOKEN>
```
### body: 
```ts
{}
```


