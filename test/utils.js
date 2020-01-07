
exports.mockResponse = function(){

    this.status = function(statusCode){
        this.statusCode = statusCode;
        console.log(this);
        return this;
    };

    this.json = function(jsonObj){
        this.jsonObject = jsonObj;
        return this;
    }

}.bind(this);