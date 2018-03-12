'use strict';
var Products =[{}];
const Sequelize = require('sequelize');
const seq = new Sequelize('postgres://postgres:password@localhost:5432/dellstore2');
const Product = require('../models').products;

Product.findAll({
    attributes: ['prod_id','category','title','actor','price','special','common_prod_id']
})
.then((prod_list) => {
    for(var i =0; i < prod_list.length;i++){
        Products[i] = {
            prod_id: prod_list[i].dataValues.prod_id,
            category: prod_list[i].dataValues.category,
            title: prod_list[i].dataValues.title,
            actor: prod_list[i].dataValues.actor,
            price: prod_list[i].dataValues.price,
            special: prod_list[i].dataValues.special,
            common_prod_id: prod_list[i].dataValues.common_prod_id
        }
    }
    console.log(Products);
})
.catch(err => console.log("Products.js: " + err.message));

module.exports = Products;