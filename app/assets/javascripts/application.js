require.config({
    paths : {
        'jquery' : '/assets/jquery',
        'underscore' : '/assets/underscore',
        'backbone' : '/assets/backbone',
        'users': '/assets/users'
    }
});
require(["jquery", "underscore", "backbone", "users"], function($,_,Backbone, Users) {

    Users.init();
});