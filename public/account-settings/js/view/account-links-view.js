define(["jquery",
        "underscore",
        "backbone",
        "text!template/account-links-template.html"], function ($, _, Backbone, AccountLinksTemplate) {
    return  Backbone.View.extend({
        tagName: "div",
        initialize: function () {

        },
        events: {

        },
        render: function () {
           this.$el.html(_.template( AccountLinksTemplate , this.model.toJSON() ));
           return this;            
        }
    });
});