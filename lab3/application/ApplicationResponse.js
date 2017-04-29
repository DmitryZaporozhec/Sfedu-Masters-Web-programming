/**
 * Created by zaporozhec on 4/6/17.
 */
function ApplicationResponse(data) {
    this.status = "SUCCESS";
    this.data = data;
    this.redirectURL = data.redirectURL
}

ApplicationResponse.prototype = {
    status: function () {
    },
    data: function () {
    }
};

module.exports = {
    newInstance: function (data) {
        return new ApplicationResponse(data);
    }
}