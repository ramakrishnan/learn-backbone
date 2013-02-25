class UsersController < ApplicationController
    def index
            @users = User.find(:all) .to_json
            #render  :json  =>@user
     end

    def create
        user = User.new(params[:user])
        if user.save
            render :json => user
        else
            render :json => {:message => "User creation failed"}
        end
    end
end
