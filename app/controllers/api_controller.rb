class ApiController < ApplicationController
    def show
        response = HTTPClient.new.send(:get, "http://local.fs.lsops.org:3000/#{params["query"]}", {:header => {"Authorization" => request.headers["Authorization"] }})
        render :json => response.body, :status => response.status
    end   

    def create
        response = HTTPClient.new.send(:post, "http://local.fs.lsops.org:3000/#{params["query"]}", {:body => params, :header => {"Authorization" => request.headers["Authorization"] }})
        render :json => response.body, :status => response.status
    end

    def update
        response = HTTPClient.new.send(:put, "http://local.fs.lsops.org:3000/#{params["query"]}", {:body => params, :header => {"Authorization" => request.headers["Authorization"] }})
        puts response.body
        puts response.body.class
        render :json => response.body, :status => response.status
    end

end