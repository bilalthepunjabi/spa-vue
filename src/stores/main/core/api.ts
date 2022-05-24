import { defineStore } from 'pinia'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const production = "https://onsite_api.ttech.dev/";
const development = "http://127.0.0.1:8000";

const endpoint_url = () => {
    switch (process.env.NODE_ENV) {
        case "development":
            return development + "/api/";
            break;

        case "production":
            return production + "/api/";
            break;

        default:
            return "http://127.0.0.1:8000/api/";
            break;
    } 
};

const endpoint = endpoint_url();

interface auth {
    endpoint : string,
    token : string,
    name : string,
    type : string,
    status : boolean,
    headers : any,
    user: any,
    xios: AxiosInstance
}

interface state {
    auth : auth
}

export const api = defineStore({
    id: 'api',
    state: () => {
        const config: AxiosRequestConfig = {
            baseURL: endpoint,
        };
        const xios: AxiosInstance = axios.create(config);
        return {
            auth: {
                endpoint: endpoint,
                token: '',
                name: 'Authorization',
                type: 'Bearer ',
                status: false,
                headers: {
                    'Authorization': '',
                    'Access-Control-Allow-Credentials': true,
                    'Accept': 'application/json'
                },
                user: {},
                xios: xios //this is the copy of axios but have pre-built headers with token use this as axios
            },
        }
    },
    getters: {
      user: (state) => state.auth.user,
      xios: (state) => state.auth.xios,
      endpoint: (state) => state.auth.endpoint
    },
    actions: {
        async authin(payload:any) {
            let response = await axios.post(this.auth.endpoint + "login", payload);
            this.auth.status = true;
            this.auth.token = response.data.token;
            this.auth.headers["Authorization"] = this.auth.type + " " + this.auth.token;
            this.auth.xios = axios.create({
                baseURL: this.auth.endpoint,
                withCredentials: true,
                headers: this.auth.headers,
            });
            this.auth.user = response.data.user;
            return true;
        }
    }
  })
  