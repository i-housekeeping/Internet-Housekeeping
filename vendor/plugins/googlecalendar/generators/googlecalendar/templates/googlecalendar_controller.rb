require 'googlecalendar.rb'

class GooglecalendarController < ApplicationController
  def index
    data = scan("/calendar/ical/french@holiday.calendar.google.com/public/basic")
    calendar = parse data
    @events = []
    calendar.events.each do |event|
      @events.push(event.start_date)
    end
  end
  
  def login
    g = GData.new
      g.login('i.housekeeping@gmail.com', 'repository')
      g.quick_add('Tennis with John March 12 3pm-4:30pm')
  end
end
