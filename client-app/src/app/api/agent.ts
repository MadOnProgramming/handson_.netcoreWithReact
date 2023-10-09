import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/Activity";

//default base url
axios.defaults.baseURL="http://localhost:5000/api";

//This is a function that takes an AxiosResponse object as its argument 
//and returns the data property from the response object
const responseBody= <T>(response:AxiosResponse<T>) => response.data;


const sleep=(delay:number)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay);
    })
}

axios.interceptors.response.use(async response =>{
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        return await Promise.reject(error);
    }
});

//object called requests that contains four methods: get, post, put, and delete. 
//Each of these methods is designed to make an HTTP request using Axios and return the response data.
const requests = {
    get:<T>(url:string)=>axios.get<T>(url).then(responseBody),
    post:(url:string,body:Activity)=>axios.post(url,body).then(responseBody),
    put:<T>(url:string,body:Activity)=>axios.put<T>(url,body).then(responseBody),
    delete:<T>(url:string)=>axios.delete<T>(url).then(responseBody)
}

//for activties domain
const Activities={
    //usecase functions
    List:()=>  requests.get<Activity[]>("/activity"),
    Create:(activity:Activity)=>requests.post("/activity",activity),
    Update:(activity:Activity)=>requests.put(`/activity`,activity),
    Delete:(id:string)=>requests.delete(`/activity/${id}`)
}

const agent={
    Activities
}

export default agent;