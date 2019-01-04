export interface HeaderDictionary {
    [K: string]: any;

    append(headers: HttpHeader[]) : void;
}

export interface HttpHeader {
    name: string;
    value: any;
}

class CorsHeaderDictionary implements HeaderDictionary
{
    [K: string]: any;

    constructor() {
        this["Access-Control-Allow-Origin"] = "*";
        this["Access-Control-Allow-Credentials"] = true;
        this["Content-Type"] = "application/json";
    }

    append(headers: HttpHeader[]) {
        
        for(var i = 0; i< headers.length; i++) {
            this[headers[i].name] = headers[i].value;
        }
    }
}

export interface LambdaResponse {
    statusCode: number;
    body: any;
    headers: HeaderDictionary;
}

export class SuccessResponse implements LambdaResponse {
    statusCode: number;
    body: any;
    headers: HeaderDictionary;

    constructor(responseBody: any, responseHeaders?: HttpHeader[]) {
        this.statusCode = 200;
        this.body = JSON.stringify(responseBody);
        this.headers = new CorsHeaderDictionary();

        if(responseHeaders) {
            this.headers.append(responseHeaders);
        }
    }
}

export class ServerErrorResponse implements LambdaResponse {
    statusCode: number;
    body: any;
    headers: HeaderDictionary;

    constructor(statusCode?: number, responseHeaders?: HttpHeader[]) {
        this.statusCode = statusCode || 503;
        this.headers = new CorsHeaderDictionary();

        if(responseHeaders) {
            this.headers.append(responseHeaders);
        }
    }
}