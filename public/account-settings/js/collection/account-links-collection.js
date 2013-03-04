define (["jquery",
"underscore",
"backbone",
"account-links-model"], function ($, _, Backbone, AccountLinksModel ) {
    var AccountLinkCollection = Backbone.Collection.extend ({
       model : AccountLinksModel
    });
    return new AccountLinkCollection;
});