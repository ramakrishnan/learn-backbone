require.config({
    paths: {
        "jquery": "jquery",
        "underscore" : "underscore",
        "backbone" : "backbone",
        "account-model" : "model/account-model",
        "account-links-model" : "model/account-links-model",
        "account-view": "view/account-view",
        "backbone-validation" : "backbone-validation-amd",
        "account-links-collection": "collection/account-links-collection",
        "account-links-view": "view/account-links-view"
    }
});

require(["jquery", 
        "underscore", 
        "backbone", 
        "account-model", 
        "account-view",
        "account-links-model",
        "account-links-view",        
        "account-links-collection"], 
    function ($, _, Backbone, AccountModel, AccountView, AccountLinkModel, AccountLinkView, AccountLinksCollection) {

    var AppAccountView = Backbone.View.extend({
        el: "#app-container",
        initialize: function () {
            var acc = new AccountModel({id: 38036}) ;
            acc.on("sync", this.showAccountForm);

            acc.fetch({
                headers: {
                    "Authorization" : "Bearer 860bd895430f50f7e36d1582614bca2f"
                }
            });
            this.listenTo(AccountLinksCollection, "add", this.displayAccLinks);
        },

        displayAccLinks: function(accLink) {
            var view = new AccountLinkView({model: accLink});
            $("#links").append(view.render().el);            
        },

        showAccountForm: function (account) {
            var accView = new AccountView({model: account});
            $("#form-container").html(accView.render().el);
            
            _.each(account.get("links"), function (accLink) {
                    AccountLinksCollection.add(new AccountLinkModel(accLink));
                });
            }
    });
    new AppAccountView;
});
