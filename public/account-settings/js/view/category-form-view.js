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
                this.listenTo(this.model, "sync", this.refresh);
            },

            refresh: function () {
                this.$el.remove(); 
            },

            render: function () {
                this.$el.html( _.template( CategoryFormTemplate, {model: this.model, options: this.options }));
                return this;
            },
            events: {
                "click .save": "update"
            },
            update: function (e) {
                e.preventDefault();
                console.log("====", this);
                this.model.save({},
                    {
                        patch: true,
                        method: 'PUT',
                        headers: {
                            "Authorization" : "Bearer 673937cc02871bb2836d8948b683a739"
                        }
                    });
            }            
        });
    });