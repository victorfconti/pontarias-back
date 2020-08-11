export function MockResponse(this: any) {

    this.status = function(statusCode: number){
        this.statusCode = statusCode;
        return this;
    };

    this.json = function(jsonObj: string){
        this.jsonObject = jsonObj;
        return this;
    }

}