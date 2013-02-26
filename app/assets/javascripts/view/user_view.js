define(["jquery", 
            "underscore",
            "backbone",
            "user-collection",
            'text!templates/users.html'], function($,_,Backbone, UserColectionl, UserTemplate) {

    var UserView = Backbone.View.extend({
        tagName: "tr",

        initialize : function () {
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change', this.render);
        },

        events: {
            "click .delete": "deleteUser"
        },

        deleteUser: function (e) {
            e.preventDefault();
            if (confirm ("Are you sure?")) {
                this.model.destroy();
            }
        },

        render : function () {
            this.$el.html(  _.template( UserTemplate, this.model.toJSON() ));
            return this;
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
           view = new UserView({model :account});
           $("#account-lists").append( view.render().el );
        }
    });
    
    var UCView = new UserCollectionView;

});