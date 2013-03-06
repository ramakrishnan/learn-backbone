define(["jquery",
        "underscore",
        "backbone",
        "text!template/category-form-template.html",
        "category-collection"],
    function ($, _, Backbone, 
        CategoryFormTemplate,
        CategoryCollection) {
        return Backbone.View.extend({
            initialize: function () {
             
            },

            events: {
                "click .save" : "update"
            },

            render: function () {
                this.$el.html( _.template( CategoryFormTemplate, {model: this.model, options: this.options }));
                return this;
            },

            update: function (e) {
                e.preventDefault();
                var method = this.model.isNew() ? "POST" : "PUT";
                this.model.save({name: this.$el.find("#category-name").val()},
                        {
                        patch: true,
                        method: method,
                        headers: {
                            "Authorization" : "Bearer 2fa423307d168f78d514289d30714203"
                        }
                    });
                if ( this.model.isNew() ) {
                    CategoryCollection.add(this.model);
                }
                this.$el.remove();
            }
        });
    });