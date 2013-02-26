define(["jquery", "underscore", "backbone", "user-model"], function($,_,Backbone, UserModel) {    
    var UserCollection = Backbone.Collection.extend({
        model : UserModel,
        url : "/users"
    });
    return new UserCollection;
});