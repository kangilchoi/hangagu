
import axios from 'axios';

const ORDER_API_BASE_URL = "/order/get/";
const CREATE_ORDER_API_URL = "/order/add";
const UPDATE_ORDER_API_URL = "/order/update"

class OrderService {
    getOrders(fromDt, toDt, page, memKey, odStatus) {
       
        return axios.get(ORDER_API_BASE_URL + memKey + '?odStatus='+odStatus ,{
            params: {
                "page":page
                , "fromDt": fromDt
                , "toDt": toDt
            },
        });
    }

    createOrder(formData) {
        return axios.post(CREATE_ORDER_API_URL, formData);

    }

    updateOrder(formData) {
        
        return axios.post(UPDATE_ORDER_API_URL, formData);
    }
}

export default new OrderService();