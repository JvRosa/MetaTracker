# MetaTracker
![image](https://github.com/JvRosa/MetaTracker/assets/110125524/58855daf-b799-4a86-9aa6-6db38f2e7260)

# Rotas
## POST /register
### body: 
```ts
{} as User
```
## POST /login
### body: 
```ts
{} as User
```
## POST /categorias
### header:
Authentication: <SUPABSE_JWT_TOKEN>
### body: 
```ts
{} as Categoria
```
## PUT /categorias/:categoriaId
### header:
Authentication: <SUPABSE_JWT_TOKEN>
### body: 
```ts
{} as Partial<Categoria>
```
## DELETE /categorias/:categoriaId
### header:
Authentication: <SUPABSE_JWT_TOKEN>
### body: 
```ts
{}
```

## POST /cards
### header:
Authentication: <SUPABSE_JWT_TOKEN>
### body: 
```ts
{} as Card
```
## PUT /cards/:cardId
### header:
Authentication: <SUPABSE_JWT_TOKEN>
### body: 
```ts
{} as Partial<Card>
```
## PUT /cards/:cardId/:newCategoriaId
### header:
Authentication: <SUPABSE_JWT_TOKEN>
### body: 
```ts
{}
```
## DELETE /cards/:cardId
### header:
Authentication: <SUPABSE_JWT_TOKEN>
### body: 
```ts
{}
```


