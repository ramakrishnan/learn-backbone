class Users::FollowersController < ApplicationController
    def create
        render :json => true
        #render :json => {:message => "Some error"}, :status => 400
    end
end
