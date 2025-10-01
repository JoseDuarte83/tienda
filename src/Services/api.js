const API_BASE_URL = 'http://fakestoreapi.com'

//función generica para  hacer peticiones fetch

const fetchData = async (endpoint)=>{
    try {
        const response = await fetch (`${API_BASE_URL}${endpoint}`);
        if (!response.ok){
            throw new Error(`error : ${response.status}`);
        }
        return await response.json();
    }catch(error) {
        console.error(`Error fetching data:`, error);
        throw error;
    }
};

export const api = {
    getProducts: ()=> fetchData('/products'),

    getProduct: ()=> fetchData(`/products/${id}`),

    getCategories: ()=> fetchData('products/categories'),

    getProductsByCategory: ()=> fetchData(`products/category/${category}`),

    getLimitedProducts: (limit)=> fetchData(`/products?limit=${limit}`),
}