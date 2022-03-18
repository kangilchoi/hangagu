import axios from 'axios';

const MEMBER_API_BASE_URL = '/member/getMember/'
// const MEMBER_API_QUERY_URL = '/member/getMember/MK210020';

class MemberService {
    // getMember() {
    //     return axios.get(MEMBER_API_QUERY_URL, {
    //         params: {

    //         }
    //     });
    // }

    getMember(memKey) {
        return axios.get(MEMBER_API_BASE_URL + memKey, {
            params: {
                
            }
        })
    }
}

export default new MemberService();

