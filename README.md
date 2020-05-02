# GraphQL subscription example

Golang server + React-Apollo client

Server modified from [here](https://github.com/graphql-go/graphql/issues/49#issuecomment-404909227)

Client modified from [here](https://github.com/LimeGreenJS/simple-chat)


## Usage
Run server:
```
cd server
go get
go run .
```

Run client:
```
cd client
yarn
yarn start
```

In the webpage we will see first the two first "posts" obtained by id, then, the rest of data obtained with the subscription.
