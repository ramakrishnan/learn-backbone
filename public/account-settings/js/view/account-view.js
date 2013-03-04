define(["jquery",
"underscore",
"backbone",
 "text!template/settings-template.html",
 "backbone-validation"], 
    function ($, 
                _,
                Backbone,
                SettingsTemplate) {

    return  Backbone.View.extend({
        tagName: "form",
        initialize: function () {
            this.listenTo(this.model, "sync", this.showAccount);
            Backbone.Validation.bind(this);
        },

        events: {
            "click #update-account": "updateAccount"
        },

        showAccount: function () {
            this.render();
            $("#form-notice") 
                .text("Your Profile has been updated successfully")
                .show();
            setTimeout( function () {
                $("#form-notice").slideUp("slow");
            }, 1500)
        },

        updateAccount: function () {
            this.model.save({
                full_name: this.input_full_name.val()
                },{
                patch: true,
                headers: {
                    "Authorization" : "Bearer 860bd895430f50f7e36d1582614bca2f"
                },
                error: function (error, resp) {
                    console.log("Error");
                    console.log($.parseJSON(resp.responseText) );
                }
            });
        },

        render: function () {
           this.$el.html(_.template( SettingsTemplate , this.model.toJSON() ));
           this.input_full_name = this.$("#full_name");
           return this;
        }
    });
});