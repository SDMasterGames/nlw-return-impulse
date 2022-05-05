# Back-end

## SOLID

- Single Responsibility Principle
    
    Cada classe tem uma responsibilidade unica.
    
- Open/Closed Principle
    
    As classes da aplicação devem ser abertas para extensão mas fechadas para modificação
    
- Liskov Substitution Principle
    
    Nós devemos poder substituir uma classe pai por uma herança dela e tudo continuar funcionando.
    
- Interface Segregation Principle
    
    Separar as classes, evitando criar uma interface pai.
    
- Dependency Inversion Principle
    
    

## Prisma

O prisma ajuda a manter uma comunicação entre aplicação e banco de dados independente de qual seja.

### Instalação

```bash
npm i -D prisma
npm i @prisma/client
```

`prisma` é a dependencia que ira auxiliar no desenvolvimento da nossa aplicação.

`@prisma/client` é a dependencia que sera usada em produção.

para a criação de arquivos base do prisma, é necessario iniciar o prismo no teu projeto, usando a seguinte linha de comando no terminal.

```bash
npx prisma init
```

em resposta sera criado uma pasta `prisma` e um arquivo `.env` e o `.gitignore`

no arquivo `.env` sera feito a mudança da uri para o prisma ter acesso ao seu banco de dados.

```bash
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB (Preview).
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="file:./dev.db"
```

no caso o SQLite que sera usado na aplicação em modo desenvolvimento tem uma url propria que pode ser obtida na propria doc do prisma.

```bash
  url = "file:./dev.db"
```

dentro da pasta `prisma > schema.prisma` é necessario informa o prisma qual banco de dados você deseja utilizar, no caso em ambiente de desenvolvimento é o SQlite.

em caso de duvida consulte a [Documentação](https://www.prisma.io/docs/concepts/database-connectors/sqlite).

```bash
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

### Como usar o Prisma?

seguindo a syntax do prisma para criar uma tabela/documento é necessario criar um model.

Ex:

```bash
model Exemplo {

}
```

isso informa ao prisma para criar uma tabela dentro do banco de dados com o nome `Exemplo` mas você pode escolher dar outro nome diferente model.

Ex:

```bash
model Exemplo {
	@@map("exemplos")
}
```

agora para informar quais colunas vai ter dentro da tabela e seus tipos escolhendo ser ou não obrigatorio.

Ex:

```tsx
model Exemplo{
	id String
	name String
	email String
  profile_avatar String?
	@@map("exemplos")
}
```

a `?` depois da tipagem informa ao prisma que aquela coluna é opcional, recebendo o valor null.

porém no prisma é necessario informa uma coluna unica, que serve para diferenciar cada elemento dentro da tabela, escolhendo qual campo vai ser unico faça o seguinte alteração no model.

Ex:

```tsx
model Exemplo{
	id String @id

	name String
	email String
  profile_avatar String?
	@@map("exemplos")
}
```

com o id sendo um valor unico, na criação de um novo elemento caso não queria informa um id manualmente (caso não tenha a opção) basta adicionar um valor padrão.

```tsx
model Exemplo{
	id String @id @default(uuid())

	name String
	email String
  profile_avatar String?
	@@map("exemplos")
}
```

`@default` informa o prisma que o valor padrão que sera usado na criação de um novo elemento, sera nesse caso um `id` usado `uuid()` retornado um id semelhante a isso `21a79f26-5521-43e1-83ce-49b8dbfb8882` assim que um novo elemento é criado.

agora para finalizar criando a tabela no banco é preciso usar a seguinte linha de comando no terminal:

```bash
npx prisma migrate dev
```

como estamos em ambiente de desenvolvimento é necessario usar o arg `dev`, no caso do modo de produção use o arg `deploy` no fim ira pedir um nome para sua tabela.

caso queira ver as tabelas pode usar o prisma studio, no terminal use o comando:

```bash
npx prisma studio
```

## Jest

para testes unitarios, e para reconhecer os arquivos ts sem usar o ts-jest pode se usar o `swc`.

o swc em comparação com o ts-jest é mais rapido na hora de compilar. 

### Instalação

```bash
npm i -D jest @swc/jest
#caso esteja usando typescript instale essa dependencia
npm i -D @types/jest ts-node

npx jest --init
```

para usar o swc é necessario alterar seu jest.config.ts adicionando a seguinte linha:

```jsx
module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
};
```

na duvida consulte a [Documentação](https://swc.rs/docs/usage/jest).

com o Spy você pode testar se uma função foi ou não chamada, para simular um chamada com sucesso.

```tsx
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const SubmitFeedback = new submitFeedback(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);
```

> ⚠️ Em testes unitarios não é necessario que tenha acesso aos serviços externos ou banco de dados, o objetivo é testar a implementação e regra de negocio.