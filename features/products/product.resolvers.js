import {getAllProducts,getProductsByPrice,getProductsById} from "./product.model.js";

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
    }
}