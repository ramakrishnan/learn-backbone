define(["jquery", "underscore", "backbone", "event-model"], function($,_,Backbone, EventModel) {    
    var EventCollection = Backbone.Collection.extend({
        model : EventModel,
        url : "/events"
    });
    return new EventCollection;
});