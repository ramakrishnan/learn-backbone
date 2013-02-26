define(["jquery", 
            "underscore",
            "backbone",
            "user-collection",
            'text!templates/users.html'], function($,_,Backbone, UserColectionl, UserTemplate) {

    var UserView = Backbone.View.extend({
        tagName: "tr",

        initialize : function () {
            this.render();
        },

        render : function () {
            this.$el.html(  _.template( UserTemplate, this.model.toJSON() ));
            $("#account-lists").append( this.el );
            }
    });

    var UserCollectionView = Backbone.View.extend({
        el: "#app-container",
        initialize : function () {
            this.listenTo (UserColectionl, "reset", this.addAll);
            this.listenTo (UserColectionl, "add", this.addNew);
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
            UserColectionl.each(this.addNew, this);
        },

        createAccount: function (e) {
            e.preventDefault();
            var data  = {};
            _.each ( $(e.target).serializeArray() , function (x) {
                data[x.name] = x.value;
            })
            UserColectionl.create(data);
            $(e.target)[0].reset();
        },

        addNew: function (account) {
            new UserView({model :account});
        }
    });
    
    var UCView = new UserCollectionView;

});