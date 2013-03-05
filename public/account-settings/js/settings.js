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
        "account-links-view": "view/account-links-view",
        "account-link-form-view": "view/account-link-form-view"
    }
});

require(["jquery", "underscore", "backbone", 
        "account-model", 
        "account-view"], 
    function ($, _,  Backbone,
                    AccountModel,
                    AccountView) {

    var AppAccountView = Backbone.View.extend({
        el: "#app-container",
        initialize: function () {
            var acc = new AccountModel({id: 38036}) ;
            acc.once("sync", this.showAccountForm);
            acc.fetch({
                headers: {
                    "Authorization" : "Bearer 860bd895430f50f7e36d1582614bca2f"
                }
            });
        },

        showAccountForm: function (account) {
            var accView = new AccountView({model: account});
            $("#form-container").html(accView.render().el);
            }
    });
    new AppAccountView;
});
