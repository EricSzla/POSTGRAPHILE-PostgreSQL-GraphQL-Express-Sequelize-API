'use strict';
var Categories = [{}];
const Sequelize = require('sequelize');
const seq = new Sequelize('postgres://postgres:password@localhost:5432/dellstore2');
const Category = require('../models').categories;

Category.findAll({
    attributes: ['category','categoryname']
})
.then((cat_list) => {
    //console.log(cat_list);
    //console.log(cat_list[0].dataValues.category);
    for(var i =0; i < cat_list.length;i++){    
        Categories[i] = {
            category: cat_list[i].dataValues.category,
            categoryname: cat_list[i].dataValues.categoryname
        }
    }
    console.log(Categories);
})
.catch(err => console.log("Categories.js: " + err.message));

/*seq.query("SELECT * FROM products;", {
    type: seq.QueryTypes.SELECT})
    .then( (results) => {
        Categories = results;
        /*for(var i=0; i < results.size();i++){
            Categories[i] = results[i];
        }
});
*/

/*const Categories = [
  {
    id: '8dlx7ak38fd39dv79ad', 
    name: 'Orinami Olatunji',
    twitterHandle: '@orinami_'
  },
  {
    id: 'jd3kd03d0w9a0l35rh74', 
    name: 'Ojima Udale',
    twitterHandle: '@uncooloj'
  },
  {
    id: '0hy894hf0dlkfh9oinv', 
    name: 'Xabi Alonso',
    twitterHandle: '@alonso'
  }
];*/
module.exports = Categories;