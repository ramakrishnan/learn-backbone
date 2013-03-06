require.config({
    paths: {
        "jquery": "jquery",
        "underscore" : "underscore",
        "backbone" : "backbone",
        "category-model" : "model/category-model",
        "category-view": "view/category-view",
        "backbone-validation" : "backbone-validation-amd",
        "category-collection": "collection/category-collection",
        "category-form-view": "view/category-form-view"
    }
});

require(["jquery", "underscore", "backbone", 
        "category-model", 
        "category-view",
        "category-collection",
        "category-form-view"], 
    function ($, _,  Backbone,
                    CategoryModel,
                    CategoryView,
                    CategoryCollection,
                    CategoryFormView) {

    var AppCategoryView = Backbone.View.extend({
        el: "#app-container",
        initialize: function () {
            CategoryCollection.fetch({
                headers: {
                    "Authorization" : "Bearer 2fa423307d168f78d514289d30714203"
                }
            });            
            this.listenTo(CategoryCollection, "reset", this.addAll);
            this.listenTo(CategoryCollection, "add", this.addAll);
        },

        events: {
            "click .add-category": "newCategory"
        },

        newCategory: function (e) {
            e.preventDefault();
            var cat = new CategoryModel;
            var view = new CategoryFormView({model: cat, caption : "Create" });
            $("#form-area").html(view.render().el);                    
            $('html, body').animate({
                scrollTop: $("#form-area").offset().top
            }, 1000);
        },

        addAll: function () {
            $("#category-tbody").html();
            CategoryCollection.each(this.addOne, this);
        },

        addOne: function (category) {            
            var view = new CategoryView({model: category});
            $("#category-tbody").append(view.render().el);
        },

        render : function () {

        }
    });
    new AppCategoryView;
});
