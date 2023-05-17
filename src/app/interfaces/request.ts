export interface HTTPResponse<T=any>{
    data:T,
    status:number
}

export interface HttpService {
    get:(url: string, headers?: any) => Promise<HTTPResponse>;
    post:(url: string, data: any, headers?: any) => Promise<HTTPResponse>;
    put:(url: string, data: any, headers?: any) => Promise<HTTPResponse>;
    delete:(url: string, headers?: any) => Promise<HTTPResponse>;
}