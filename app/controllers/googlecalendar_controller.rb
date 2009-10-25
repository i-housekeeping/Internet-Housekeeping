require 'googlecalendar.rb'

class GooglecalendarController < ApplicationController
  
  protect_from_forgery :only => [:create, :destroy]
  
  def index
    data = scan("/calendar/ical/french@holiday.calendar.google.com/public/basic")
    calendar = parse data
    @events = []
    calendar.events.each do |event|
      @events.push(event.start_date)
    end
  end
  
  def add_task
    task = ActiveSupport::JSON.decode(params[:task]).rehash
    g = GData.new()
    g.login('i.housekeeping@gmail.com', 'repository')
    event = { :title=>task["title"],
              :content=>task["title"],
              :author=>'i.housekeeping@gmail.com',
              :email=>'i.housekeeping@gmail.com',
              :where=>'Tel-Aviv,Israel',
              :startTime=>task["dueDate"],
              :endTime=>task["dueDate"]}
    g.new_event(event)
  end
  
end
