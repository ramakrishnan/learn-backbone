require.config({
    paths : {
        'jquery' : '/assets/jquery',
        'underscore' : '/assets/underscore',
        'backbone' : '/assets/backbone',
        'event-model': '/assets/model/event_model',
        'event-view': '/assets/view/event_view',
        'event-collection': '/assets/collection/event_collection',
        'events': '/assets/events'
    }
});
require(["jquery", "underscore", "backbone", "events"], function($,_,Backbone, Event ) {
    Event.init();
});