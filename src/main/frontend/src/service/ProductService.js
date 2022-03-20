import axios from 'axios';

const PRODUCT_API_BASE_URL = "/product/detail/";

class ProductService {
    getProduct(pmKey) {
        const PRODUCT_API_PARAM_URL = PRODUCT_API_BASE_URL + pmKey;
        
        return axios.get(PRODUCT_API_PARAM_URL, {
            params: {

            }
        });
    }
}

export default new ProductService();