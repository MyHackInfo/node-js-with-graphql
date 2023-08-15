import {getAllProducts,getProductsByPrice,getProductsById,addNewProduct,addProductReview} from "./product.model.js";

export default {
    Query:{
        products: () => {
            return getAllProducts();
        },
        productByPrice: (_, {min, max}) => {
            return getProductsByPrice(min, max);
        },
        product:(_,{id}) => {
            return getProductsById(id);
        }
    },
    Mutation:{
        addNewProduct: (_, {id,description,price}) => {
            return addNewProduct(id,description,price);
        },
        addProductReview:(_, {id,rating,comment}) => {
            return addProductReview(id,rating,comment);
        }
    }

}