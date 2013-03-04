define (["jquery",
"underscore",
"backbone",
"backbone-validation"], function ($, _, Backbone ) {
    return Backbone.Model.extend ({
        validation: {
            full_name: {
                required: true
            },
            email: {
               required: true,
               pattern: "email" 
            }
        },
        initialize: function () {
            this.on('invalid', function(model, errors) {
                console.log("Error ", errors);
            });
        },
        urlRoot:  function () {
            // I currently proxy the request to API through api_controller
            return "/api/accounts/"
        }
    });
});