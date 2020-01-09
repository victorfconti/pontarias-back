
exports.mockResponse = function(){

    this.status = function(statusCode){
        this.statusCode = statusCode;
        return this;
    };

    this.json = function(jsonObj){
        this.jsonObject = jsonObj;
        return this;
    }

};