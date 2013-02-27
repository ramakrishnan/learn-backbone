class Event < ActiveRecord::Base
  attr_accessible :description, :end_time, :start_time, :title
end
