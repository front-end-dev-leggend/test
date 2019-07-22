import Api from '@/service/api'
import axios from 'axios'
// import Axios from 'axios';

export default {
    getData (url) {
        return new Promise((resolve,reject)=>{
          Api().get(url).then(result=>{
            resolve(result.data);
          },err=>{
            reject(err);
          });
        })
    },
    postData(url,data){
      return new Promise((resolve,reject)=>{
        Api().post(url,JSON.stringify(data)).then(result=>{
          resolve(result.data);
        },err=>{
          reject(err);
        });
      })
    },
    deleteData(url){
      return new Promise((resolve,reject)=>{
        Api().delete(url).then(result=>{
          resolve(result.data);
        },err=>{
          reject(err);
        });
      })
    },
    getExternalData(url){
      return new Promise((resolve,reject)=>{
        axios.create({
          baseURL: `http://203.150.210.26:3004/`,
          withCredentials: false,
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5fdG9rZW4iOnsidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiIxIn0sImlhdCI6MTU2MzYxNzE1MiwiZXhwIjoxNjYzNjE3MTUxfQ.m_ko3pgVjwUOeRCiNNGoeXPge7LusJinaNnZNNTS7qg'
          }
        }).get(url).then((result)=>{
          resolve(result.data)
        },err=>{
          reject(err);
        })
      })
    }
}
