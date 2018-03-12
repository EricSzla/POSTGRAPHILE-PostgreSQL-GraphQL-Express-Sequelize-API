'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
      prod_id:{
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      title:{
          type: DataTypes.STRING,
          allowNull: false,
      },
      actor:{
          type: DataTypes.STRING,
          allowNull: false,
      },
      price:{
          type: DataTypes.FLOAT,
          allowNull: false,
      },
      special:{
          type: DataTypes.INTEGER,
          allowNull: true,
      },
      common_prod_id:{
          type: DataTypes.INTEGER,
          allowNull: true,
      },
      category:{
          type: DataTypes.INTEGER,
          allowNull: false,
      }
  },{
        schema: 'postgraphile',
	    createdAt: false,
	    updatedAt: false
  });

  products.associate = (models) => {
      products.hasMany(models.categories,{
          foreignKey: 'category',
              as: 'fk_category',
      });
  };
  return products;
};