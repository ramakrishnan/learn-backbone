define(["jquery", 
            "underscore",
            "backbone",
            "user-collection",
            'text!templates/users.html',
            'follow-model'
            ], function($,_,Backbone, UserColectionl, UserTemplate, FollowModel) {

    var UserView = Backbone.View.extend({
        tagName: "tr",

        initialize : function () {
            this.listenTo(this.model, 'destroy', this.remove);
            //this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'sync', this.render);       
        },

        events: {
            "click .delete": "deleteUser",
            "click .follow": "followAccount",
            "click .unfollow": "unFollowAccount"
        },

        deleteUser: function (e) {
            e.preventDefault();
            if (confirm ("Are you sure?")) {
                this.model.destroy();
            }
        },

        followAccount: function (e) {
            e.preventDefault();
            var follow = new FollowModel;
            follow.save({user_id: 2 }, {
                success: function () {
                    $(e.target)
                    .text("Unfollow")
                    .addClass("unfollow")
                    .removeClass("follow");
                }
            });
        },

        unFollowAccount: function (e) {
            e.preventDefault();
            alert("Un Follow me");
        },

        render : function () {
            this.$el.html(  _.template( UserTemplate, 
                _.extend( this.model.toJSON(), 
                    {
                        currentUser: $("script[data-currentUser]").data().currentuser
                    }) ));
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
            UserColectionl.create(data, {wait :true });
            $(e.target)[0].reset();
        },

        addNew: function (account) {
            view = new UserView({model :account});
            $("#account-lists").append( view.render().el );
        }
    });
    
    var UCView = new UserCollectionView;

});