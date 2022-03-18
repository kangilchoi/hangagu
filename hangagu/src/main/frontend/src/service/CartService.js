import axios from 'axios';

const CART_API_BASE_URL = "/cart/get/";
const CART_API_DETAIL_URL = "/cart/detail/";
const CART_API_CREATE_URL = "/cart/add/";
const CART_API_UPDATE_URL = "/cart/update/";

class CartService {
    getCarts(memKey) {
        
        return axios.get(CART_API_BASE_URL + memKey , {
            params: {
            },
        });
    }

    getCartDetail(cartKey) {
        //const CART_API_PARAM_URL = CART_API_BASE_URL + cartKey;
        return axios.get(CART_API_DETAIL_URL + cartKey, {
            params: {

            }
        });
    }

    createCarts(sendData) {
        
        return axios(
            {
              url: CART_API_CREATE_URL,
              method: 'post',
              data: {cartDtoList: sendData, interestProductDtoList: sendData},
              dataType: 'json', 
              contentType: "application/json; charset=UTF-8", 
            }
          );
    }

    updateCart(formData) {
        return axios.post(CART_API_UPDATE_URL, formData); 
    }

}

export default new CartService();