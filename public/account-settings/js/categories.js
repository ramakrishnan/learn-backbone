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
        "category-collection"], 
    function ($, _,  Backbone,
                    CategoryModel,
                    CategoryView,
                    CategoryCollection) {

    var AppCategoryView = Backbone.View.extend({
        el: "#app-container",
        initialize: function () {
            CategoryCollection.fetch({
                headers: {
                    "Authorization" : "Bearer 860bd895430f50f7e36d1582614bca2f"
                }
            });            
            this.listenTo(CategoryCollection, "all", this.addAll);
        },

        addAll: function () {
            $("#category-tbody").html();
            CategoryCollection.each(this.addOne, this);
        },

        addOne: function (category) {            
            var view = new CategoryView({model: category});
            $("#category-tbody").append(view.render().el);
            view.on("edit", this.editHandle, this  )

        },

        editHandle: function () {
            console.log("edit Handle ", this);
        },

        render : function () {

        }
    });
    new AppCategoryView;
});
