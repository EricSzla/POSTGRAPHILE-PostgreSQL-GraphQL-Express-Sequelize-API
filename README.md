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

``` graphql
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
``` graphql
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

``` sql
SELECT (price - (price * 0.21)) FROM postgraphile.products WHERE prod_id = 10000;
```

``` graphql
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
#### 4. A GraphQL query which returns the attributes from 3 joined database relations having 2 levels of nesting in the resultant output Select all customers (first name, last name, country and income) for particular order from the orderline, specified by product.

``` graphql
query question3{
  productByProdId(prodId:1000){
    orderlinesByProdId(orderBy: PROD_ID_ASC){
      totalCount
      nodes{
        orderByOrderid{
          customerByCustomerid{
            firstname,
            lastname,
            country,
            income
          }
        }
      }
    }
  }
}

OUTPUT:

{
  "data": {
    "productByProdId": {
      "orderlinesByProdId": {
        "totalCount": 5,
        "nodes": [
          {
            "orderByOrderid": {
              "customerByCustomerid": {
                "firstname": "UXLWZS",
                "lastname": "KAHFIKAFKZ",
                "country": "China",
                "income": 60000
              }
            }
          },
          .
          .
          .
```

#### 5.A mutation to add a new order to the database. The mutation updates the orders, orderlines and cust_hist relations

``` graphql
mutation addOrderr($pOrder: OrderInput!, $pOrderLine: OrderlineInput!, $pCust_Hist: CustHistInput!){
  createOrder(input: {clientMutationId:"",order: $pOrder}){
    order{
      orderid,
      customerid,
      orderdate
    }
  }
  createOrderline(input:{clientMutationId:"",orderline: $pOrderLine}){
    orderline{
      orderid,
      orderdate,
      prodId,
      orderdate
    }
  }
  createCustHist(input:{clientMutationId:"",custHist:$pCust_Hist}){
    custHist{
      customerid,
      orderid,
      prodId,
    }
  }
}

OUTPUT:

{
  "data": {
    "createOrder": {
      "order": {
        "orderid": 12015,
        "customerid": 10000,
        "orderdate": "2002-12-12"
      }
    },
    "createOrderline": {
      "orderline": {
        "orderid": 12015,
        "orderdate": "2002-12-12",
        "prodId": 1000
      }
    },
    "createCustHist": {
      "custHist": {
        "customerid": 10000,
        "orderid": 12015,
        "prodId": 1000
      }
    }
  }
}

```

## Node.js - GraphQL - Express - Sequelize
### Manual implementation of the query from task 2 (above) directly using GraphQL and Express i.e. not using postgraphql. Sequelize is used to query Postgres as part of the resolver function.

# WILL BE ADDED ON 12/03/2018

