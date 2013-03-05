    define(["jquery",
        "underscore",
        "backbone",
         "text!template/settings-template.html",
         "account-links-collection",
         "account-links-model",
        "account-links-view",              
         "backbone-validation"], 
            function ($, 
                        _,
                        Backbone,
                        SettingsTemplate,
                        AccountLinksCollection,
                        AccountLinkModel,
                        AccountLinkView) {
                
    return  Backbone.View.extend({
        tagName: "div",
        initialize: function () {
            this.model.once("sync", this.showAccount, this);
            this.listenTo(AccountLinksCollection, "reset", this.displayAccLinks);
            Backbone.Validation.bind(this);
        },

        events: {
            "click #update-account": "updateAccount"
        },

        displayAccLinks: function() {
            AccountLinksCollection.each ( function (accLink) {
                    var view = new AccountLinkView({model: accLink});
                    $("#links").append(view.render().el);
                }, this) ;
        },

        showAccount: function () {
            this.render();
            $("#form-notice") 
                .text("Your Profile has been updated successfully")
                .show();
            setTimeout( function () {
                $("#form-notice").slideUp("slow");
            }, 1500)
        },

        updateAccount: function () {
            this.model.save({
                full_name: this.$el.find("#full_name").val()
                },{
                method: 'PUT',
                patch: true,
                headers: {
                    "Authorization" : "Bearer 860bd895430f50f7e36d1582614bca2f"
                },
                error: function (error, resp) {
                    console.log("Error");
                    console.log($.parseJSON(resp.responseText) );
                }
            });
        },

        render: function () {
           this.$el.html(_.template( SettingsTemplate , {model: this.model }  ));
           $("#links").html("");
           var account_id = this.model.get('id');
            _.each(this.model.get("links"), function (accLink, index) {
                    _.extend(accLink, {id: index, account_id: account_id });
                    AccountLinksCollection.reset(new AccountLinkModel(accLink));
                });
           return this;
        }
    });
});