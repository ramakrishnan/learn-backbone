define (["jquery",
"underscore",
"backbone",
"backbone-validation"], function ($, _, Backbone ) {
    return Backbone.Model.extend ({
        initialize: function () {
            this.on('invalid', function(model, errors) {
                console.log("Error ", errors);
            });
        }
    });
});