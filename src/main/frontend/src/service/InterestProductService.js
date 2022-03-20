import axios from 'axios';

const IPD_API_BASE_URL = "/interestProduct/get/"
const IPD_API_CREATE_URL = "/interestProduct/add/"
const IPD_API_DELETE_URL = "/interestProduct/update/"

class InterestProductService {
    getInterestProducts(memKey, page) {
       
        return axios.get(IPD_API_BASE_URL + memKey , {
            params: {
                "page":page
            },
        });
    }

    createInterestProduct(formData) {
        return axios.post(IPD_API_CREATE_URL, formData); 
    }

    deleteInterestProducts(sendData) {
        
        return axios(
            {
              url: IPD_API_DELETE_URL,
              method: 'post',
              data: {interestProductDtoList: sendData},
              dataType: 'json', 
              contentType: "application/json; charset=UTF-8", 
            }
          );
    }
}

export default new InterestProductService();