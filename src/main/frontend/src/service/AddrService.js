import axios from 'axios';

const ADR_API_BASE_URL = "/addr/get/"
const ADR_API_DETAIL_URL = "/addr/detail/"
const ADR_API_SAVE_URL = "/addr/save/"
const ADR_API_DELETE_URL = "/addr/delete/"

class AddrService {
    getAddrs(memKey) {
       
        return axios.get(ADR_API_BASE_URL + memKey , {
            params: {

            },
        });
    }

    getAddrDetail(addrKey) {
       
        return axios.get(ADR_API_DETAIL_URL + addrKey , {
            params: {

            },
        });
    }

    saveAddr(formData) {
        return axios.post(ADR_API_SAVE_URL, formData); 
    }

    deleteAddr(formData) {
        return axios.post(ADR_API_DELETE_URL , formData);
    }
}

export default new AddrService();