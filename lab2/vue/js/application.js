var app = new Vue({
    el: '#app',
    data: {
        users: 'Hello Vue!',
        currentCompany: null,
        currentAddress: null,
        currentMapUrl: null
    },
    methods: {
        getData: function () {
            this.$http.get('https://jsonplaceholder.typicode.com/users').then(function (jsonData) {
                this.users = jsonData.body;
            });
        },
        showCompany: function (user) {
            if (user.company) {
                this.currentCompany = user.company
            }
        },
        showAddress: function (user) {
            if (user.address) {
                this.currentAddress = user.address
            }
        }
    },
    mounted: function () {
        this.getData();
    }
});