define(["jquery",
            "underscore",
            "backbone",
            "event-collection",
            "text!templates/events_template.html"], function ($, _, Backbone, EventCollection, eventTemplate) {

    var EventView = Backbone.View.extend ({
        tagName: "li",
        initialize: function () {

        },

        render: function () {
            this.el.html( _.template (eventTemplate (this.model.toJSON() )));
            return this;
        }

    });

    var EventCollectionView = Backbone.View.extend ({
         el: "#app-container",
         initialize: function () {
            this.listenTo(EventCollection, "reset", this.addAll);
         },

         addAll: function () {
            EventCollection.each (this.addNew, this);
         },

         addNew: function (event) {
            var view = new EventView({model: event});
            $("#event-list").append( view.render().el );
         }
    });

    });