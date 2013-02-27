require.config({
    paths : {
        'jquery' : '/assets/jquery',
        'underscore' : '/assets/underscore',
        'backbone' : '/assets/backbone',
        'user-model': '/assets/model/user_model',
        'user-view': '/assets/view/user_view',
        'user-collection': '/assets/collection/user_collection',
        'users': '/assets/users',
        'follow-model': '/assets/model/follow_model'
    }
});
require(["jquery", "underscore", "backbone", "users"], function($,_,Backbone, Users) {
    Users.init();
});