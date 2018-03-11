# POSTGRAPHILE-PostgreSQL-GraphQL-Express-Sequelize-API

## Postgraphile
### Set-Up

#### 1. Create new Database in Postgres

```CREATE DATABASE dellstore2;```

#### 2. Connect to the created database

```\connect dellstore2;```

#### 3. Create new schema called ```postgraphile```

```CREATE SCHEMA postgraphile;```

#### 4. Load schema definitions from dellstore2.sql

```pg_restore --no-owner --dbname postgraphile dellstore2.sql;```

**OR** specify hostname, database and username

```psql -h hostname -d databasename -U username -f file.sql```

    e.g. ```psql -h localhost -d dellstore2 -U postgres -f dellstore2.sql```
    
#### 5. Start Postgraphile in watch mode

```postgraphile --watch --schema postgraphile -c "postgres://username:password@localhost:5432/dellstore2"```

#### 6. Open Postgraphile interface:

```http://localhost:5000/graphiql```

#### 7. Check a simple query:

```
query getProductById{
  productByProdId(prodId:10){
    title
  }
}

OUTPUT:

{
  "data": {
    "productByProdId": {
      "title": "ACADEMY ALADDIN"
    }
  }
}
```

### Tasks

#### 1. Match loaded schema to the following ERD by adding necessary foreign keys:
![ERD](https://user-images.githubusercontent.com/15609881/37252356-ad010bca-2517-11e8-9f9e-798ee789a034.png)

#### 2. A GraphQL query which returns the attributes from a single database relation.
```
query getProductAndCategory{
  ProductOne: productByProdId(prodId:10000){
    title,
    actor,
    price,
    categoryByCategory{
      categoryname,
    }
  }
}

OUTPUT:

{
  "data": {
    "ProductOne": {
      "title": "ALADDIN ZORRO",
      "actor": "MAE CRUISE",
      "price": "10.99",
      "categoryByCategory": {
        "categoryname": "New"
      }
    }
  }
}

```


#### 3. A mutation to fetch data via user-defined function in Postgres.

Simple example of a pre-defined funciton:

``SELECT (price - (price * 0.21)) FROM postgraphile.products WHERE prod_id = 10000;``

```
mutation sds{
  getPrice(input:{clientMutationId:""}){
    bigFloat
  }
}

OUTPUT:
{
  "data": {
    "getPrice": {
      "bigFloat": "8.6821"
    }
  }
}
```


