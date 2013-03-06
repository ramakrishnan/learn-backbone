define(["jquery",
        "underscore",
        "backbone",
        "text!template/account-link-form.html",
        "text!template/account-links-template.html"],
    function ($, _, Backbone, AccountLinkFormTemplate, AccountLinksTemplate) {
        return Backbone.View.extend({
            tagName: "div",
            className: "edit-account-link",
            initialize: function () {                
                this.listenTo(this.model,"change", this.render);
            },

            events: {
                "click .js-cancel-link-update": "hideForm",
                "click .update-link": "update"
            },

            hideForm: function (e) {
                e.preventDefault();
                this.$el.parent().find(".view-link").show();
                this.$el.parent().find(".edit-account-link").remove();
            },

            update: function (e) {
                e.preventDefault();
                var data  = {};
                _.each ( this.form.serializeArray() , function (x) {
                    data[x.name] = x.value;
                });
                this.model.save(data,
                    {
                        method: 'PUT',
                        patch: true,
                        headers: {
                            "Authorization" : "Bearer 860bd895430f50f7e36d1582614bca2f"
                            },
                    });
            },            

            render: function () {
                this.$el.html( _.template(AccountLinkFormTemplate, this.model.toJSON() ));
                this.form = this.$el.find("form");
                return this;
            }
        });
    });