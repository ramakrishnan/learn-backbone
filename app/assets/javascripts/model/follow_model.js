define(["jquery", "underscore", "backbone"], function($,_,Backbone) {
    var FollowModel = Backbone.Model.extend( {
        urlRoot:  function () {
            return "/users/"+ this.get("user_id") + "/followers"
        }
    });
    return  FollowModel;
});