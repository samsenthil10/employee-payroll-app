const axios=require('axios').default;
class AxiosService{

    postService(url='',payload=null,tokenRequired=false,httpOptions=null)
    {
        return axios.post(url,payload,tokenRequired&& httpOptions)
    }

    getService(url='')
    {
        return axios.get(url)
    }

    putService(url='',payload=null,tokenRequired=false,httpOptions=null)
    {
        return axios.put(url,payload,tokenRequired&& httpOptions)
    }
    deleteService(url = "", tokenRequired = false, httpOptions = null) {
        return axios.delete(url, tokenRequired && httpOptions);
      }
    
}

module.exports= new AxiosService()