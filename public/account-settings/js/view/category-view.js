define(["jquery",
        "underscore",
        "backbone",
        "text!template/category-item-template.html",
        "text!template/category-form-template.html",
        "category-form-view"],
    function ($, _, Backbone, 
        CategoryItemTemplate,
        CategoryFormTemplate,
        CategoryFormView) {
        return Backbone.View.extend({
            tagName: "tr",
            initialize: function () {                
                this.listenTo(this.model, "change", this.render);
                this.listenTo(this.model, "error", this.myfun);
            },

            events: {
                "click .edit": "edit"
            },

            myfun: function () {
                this.model.set(this.model.previousAttributes());
            },

            edit: function (e) {
                e.preventDefault();
                var view = new CategoryFormView({model: this.model, caption : "Update" });
                view.render();
            },

            render: function () {
                this.$el.html( _.template( CategoryItemTemplate, {model: this.model }));
                return this;
            }
        });
    });
