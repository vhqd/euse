import axios from 'axios'
let host = 'http://192.168.0.110:3000'

export default {
    getseccategory: () => {
        return axios.get(host +'/api/category/getlevel')
    },
    newarticle: (data) => {
        return axios.post(host +'/api/article/newarticle',data)
    },
    getonearticle: (data) => {
        return axios.post(host +'/api/article/getonearticle',data)
    },
    getcate: (data) => {
        return axios.post(host +'/api/category/getcate',data)
    },
    getarticles:(data)=>{
        return axios.post(host+'/api/article/articles',data)
    },
    getshowcate:(data)=>{
        return axios.post(host+'/api/category/getshowcate',data)
    }
}