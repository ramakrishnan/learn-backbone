define(["jquery", 
            "underscore", 
            "backbone", 
            "user-model", 
            "user-view",
            "user-collection"], function($,_,Backbone, UserModel, UserView, UserCollection) {

 var init = function() {
     var AppRouter = Backbone.Router.extend({
        routes : {
              "" : "index"
        },
        index : function () {
           UserCollection.reset(window.users);
        }
     });
   
      window.router = new AppRouter;
      Backbone.history.start();
  }

    return { init: init }
});