define(["jquery", 
            "underscore", 
            "backbone", 
            "event-model", 
            "event-view",
            "event-collection"], function($,_,Backbone, EventModel, EventView, EventCollection) {

 var init = function() {
     var AppRouter = Backbone.Router.extend({
        routes : {
              "" : "index"
        },
        index : function () {
           EventCollection.reset(window.users);
        },
     });
   
      window.router = new AppRouter;
      Backbone.history.start();
  }

    return { init: init }
});