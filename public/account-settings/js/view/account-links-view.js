define(["jquery", "underscore","backbone",
        "account-link-form-view",
        "text!template/account-links-template.html"], 
        function ($, _, Backbone,
            AccountLinkForm,
            AccountLinksTemplate) {
    return  Backbone.View.extend({
        tagName: "div",
        className: "account-link",
        initialize: function () {
            this.listenTo(this.model,"change", this.render);
        },

        events: {
            "click .js-edit-link": "edit"
        },

        edit: function () {
            this.$el.find(".view-link").hide();
            var view = new AccountLinkForm({model: this.model});
            this.$el.append(view.render().el);            
        },

        render: function () {
           this.$el.html(_.template( AccountLinksTemplate , this.model.toJSON() ));
           return this;
        }
    });
});