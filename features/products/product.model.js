const products = [
    {
        id:"1",
        description: 'Red Shoe',
        price:23.56,
        reviews:[],
    },
    {
        id:"2",
        description: 'Red Shoe2',
        price:232.56,
        reviews:[],
    }
]

export const getAllProducts = () => {
    return products;
}

export const getProductsByPrice = (min, max) => {
    return products.filter( (item) => item.price > min && item.price < max);
} 

export const getProductsById = (id) => {
    return products.find( (item) => { return item.id === id });
}

export const addNewProduct = (id,description,price) => {
    const newProduct = {
        id,description,price,
        reviews:[],
    }
    products.push(newProduct)
    return newProduct;
}

export const addProductReview = (id,rating,comment) => {
    let product = products.find( (item) => { return item.id === id });
    if(product){
    let newReview = {rating,comment}
    product.reviews.push(newReview);
    return newReview;
    }
}

