module RJST
  module Event
    module_function

    def print(event, messsage)
      puts "#{Time.now.strftime("%l:%M:%S %p").lstrip} " +
           "[#{APP_NAME}] #{event.upcase} | #{messsage}"
    end
  end
end