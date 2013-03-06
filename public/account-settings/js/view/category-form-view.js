define(["jquery",
        "underscore",
        "backbone",
        "text!template/category-form-template.html",
        "category-collection"],
    function ($, _, Backbone, 
        CategoryFormTemplate,
        CategoryCollection) {
        return Backbone.View.extend({
            events: {
                "click .save" : "update"
            },

            render: function () {
                this.$el.html( _.template( CategoryFormTemplate, {model: this.model, options: this.options }));
                $("#form-area").html(this.el);
                $('html, body').animate({
                    scrollTop: $("#form-area").offset().top
                }, 1000);
            },

            update: function (e) {
                e.preventDefault();
                var view = this.$el;
                var method = this.model.isNew() ? "POST" : "PUT";
                this.model.save({name: this.$el.find("#category-name").val()},
                        {
                        patch: true,
                        method: method,
                        headers: {
                            "Authorization" : "Bearer 2fa423307d168f78d514289d30714203"
                        },
                        error: function (error, resp) {

                            view.find(".error_message").text($.parseJSON(resp.responseText).message);

                        },
                        success: function () {
                            view.remove();
                        }
                    });
                if ( this.model.isNew() ) {
                    CategoryCollection.add(this.model);
                }
            }
        });
    });