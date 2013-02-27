class Users::EventsController < ApplicationController
    def index
        @user = User.find(params[:user_id])
        @events = Event.where(:user_id => params[:user_id].to_i)
    end
end
