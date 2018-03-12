'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    category:{
	    type: DataTypes.INTEGER,
	    allowNull: false,
    },
    categoryname:{
	    type: DataTypes.STRING,
	    allowNull: false,
    }
  },{
      schema: 'postgraphile',
	   createdAt: false,
	   updatedAt: false
  });

  categories.associate = (models) => {
    categories.belongsTo(models.products, {
        foreignKey: 'category',
        onDelete: 'CASCADE',
    });
  };
  return categories;
};