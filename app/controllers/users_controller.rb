class UsersController < ApplicationController
    def index
            @users = User.find(:all) .to_json
     end

    def create
        user = User.new(params[:user])
        if user.save
            render :json => user
        else
            render :json => {:message => "User creation failed"}
        end
    end

    def update
        user = User.find(params[:id])
        user.update_attributes(params[:user])
        if user.save
            render :json => user
        else
            render :json => {:message => "User creation failed"}
        end
    end

    def destroy
        render :json => User.find(params[:id]).destroy
    end
end
