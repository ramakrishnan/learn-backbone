define (["jquery",
"underscore",
"backbone",
"category-model"], function ($, _, Backbone, CategoryModel ) {
    var CategoryCollection = Backbone.Collection.extend ({
       model : CategoryModel,
       url: "/api/categories",
       parse: function (response) {
            return response.data;
       }
    });
    return new CategoryCollection;
});