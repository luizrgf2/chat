import axios, { AxiosResponse } from "axios";
import { HTTPResponse, HttpService } from "../../app/interfaces/request";

export class AxiosHttpService implements HttpService {
    public async get(url: string, headers?: any): Promise<HTTPResponse> {
      try {
        const response: AxiosResponse = await axios.get(url, { headers });
        return {
          data: response.data,
          status: response.status,
        };
      } catch (error:any) {
        return {
          data: error.response.data,
          status: error.response.status,
        };
      }
    }
  
    public async post(url: string, data: any, headers?: any): Promise<HTTPResponse> {
      try {
        const response: AxiosResponse = await axios.post(url, data, { headers });
        return {
          data: response.data,
          status: response.status,
        };
      } catch (error:any) {
        return {
          data: error.response.data,
          status: error.response.status,
        };
      }
    }
  
    public async put(url: string, data: any, headers?: any): Promise<HTTPResponse> {
      try {
        const response: AxiosResponse = await axios.put(url, data, { headers });
        return {
          data: response.data,
          status: response.status,
        };
      } catch (error:any) {
        return {
          data: error.response.data,
          status: error.response.status,
        };
      }
    }
  
    public async delete(url: string, headers?: any): Promise<HTTPResponse> {
      try {
        const response: AxiosResponse = await axios.delete(url, { headers });
        return {
          data: response.data,
          status: response.status,
        };
      } catch (error:any) {
        return {
          data: error.response.data,
          status: error.response.status,
        };
      }
    }
  }