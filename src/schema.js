// schema.js
const _ = require('lodash');
const Products = require('./data/products');
const Categories = require('./data/categories');

/* Here a simple schema is constructed without using the GraphQL query language. 
  e.g. using 'new GraphQLObjectType' to create an object type 
*/

let {
  // These are the basic GraphQL types need
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLObjectType,
    // This is used to create required fileds and arguments
    GraphQLNonNull,
    // This is the class we need to create the schema
    GraphQLSchema,
} = require('graphql');

const CategoryType = new GraphQLObjectType({
    name: "Category",
    description: "Represents a category",
    fields: () => ({
        category: {type: new GraphQLNonNull(GraphQLInt)},
        categoryname: {type: new GraphQLNonNull(GraphQLString)}
    })
});

const ProductType = new GraphQLObjectType({
    name: "Product",
    description: "Represents a product",
    fields: () => ({
        prod_id: {type: new GraphQLNonNull(GraphQLInt)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        actor: {type: new GraphQLNonNull(GraphQLString)},
        price: {type: new GraphQLNonNull(GraphQLFloat)},
        special: {type: GraphQLInt},
        common_prod_id: {type: new GraphQLNonNull(GraphQLInt)},
        category: {
            type: CategoryType,
            resolve: function(product){
                return _.find(Categories, a => a.category == product.category);
            }
        }
    })
});

// This is the Root Query
const BlogQueryRootType = new GraphQLObjectType({
    name: 'BlogAppSchema',
    description: 'Schema root',
    fields: () => ({
        products: {
            type: new GraphQLList(ProductType),
            description: "List of all products",
            resolve: function() {
                return Products
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            description: "List all categories",
            resolve: function() {
                return Categories
            }
        }
    })
});

// This is the schema declaration
const BlogAppSchema = new GraphQLSchema({
  query: BlogQueryRootType
});

module.exports = BlogAppSchema;