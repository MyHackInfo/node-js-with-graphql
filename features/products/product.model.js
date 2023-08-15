const products = [
    {
        id:"1",
        description: 'Red Shoe',
        price:23.56
    },
    {
        id:"2",
        description: 'Red Shoe2',
        price:232.56
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