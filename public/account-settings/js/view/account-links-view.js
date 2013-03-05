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
            this.listenTo(this.model,"sync", this.renderEditForm);
        },

        events: {
            "click .js-edit-link": "edit"
        },

        renderEditForm: function (link) {
            this.$el.find(".view-link").hide();
            var view = new AccountLinkForm({model: link});
            this.$el.append(view.render().el);            
        },

        edit: function (e) {
            e.preventDefault();            
            this.model.fetch();
        },

        render: function () {
            console.log(this.model.toJSON() );
           this.$el.html(_.template( AccountLinksTemplate , this.model.toJSON() ));
           return this;
        }
    });
});