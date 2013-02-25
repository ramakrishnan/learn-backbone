define(["jquery", "underscore", "backbone"], function($,_,Backbone) {
         _.templateSettings = {
             interpolate: /\{\{\=(.+?)\}\}/g,
             evaluate: /\{\{(.+?)\}\}/g
         }; 
         

    var UserView = Backbone.View.extend({
        tagName: "tr",
        template: _.template($("#account-view").html()),

        initialize : function () {
            this.render();
        },

        render : function () {
           this.$el.html(  this.template( this.model.toJSON() ));
           $("#account-lists").append( this.el );
        }
    });

    var UserModel = Backbone.Model.extend( {
         
    });

    var UserCollection = Backbone.Collection.extend({
        model : UserModel,
        url : "/users"
    });

    var UCol = new UserCollection;

    var UserCollectionView = Backbone.View.extend({
        el: "#app-container",
        initialize : function () {
            this.listenTo(UCol, "reset", this.addAll);
            this.listenTo(UCol, "add", this.addNew);
            this.registrationForm = this.$("#save-account");
            this.registrationForm.hide();            
        },

        events: {
          "click #new-account" : "showNewAccount",
          "submit #save-account": "createAccount"
        },

        showNewAccount: function () {
            this.registrationForm.show();
        },
    
        render : function () {
        },

        addAll: function () {
            UCol.each(this.addNew, this);
        },

        createAccount: function (e) {
            e.preventDefault();
            UCol.create({name: "Sham", age: 123});
        },

        addNew: function (account) {
          console.log("---", account);
          new UserView({model :account});
        }

    });

    var UCView = new UserCollectionView;

 var init = function() { 

     var AppRouter = Backbone.Router.extend({
        routes : {
              "" : "index"
        },

        index : function () {
           UCol.reset(window.users);
        }
     });
   
      window.router = new AppRouter;
      Backbone.history.start();
  }

    return { init: init }
});