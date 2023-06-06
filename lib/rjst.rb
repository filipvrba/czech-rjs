require 'rjst/version'
require 'rjst/event'
require 'rjst/arguments'
require 'rjst/content'
require 'rjst/scaffold'

module RJST
  module_function

  def scaffold_state
    unless Arguments.options_scaffold_empty?
      arguments = Arguments.options[:scaffold]

      if arguments[:element]
        name_element = Scaffold.create_element(arguments[:element]) do |message|
          Event.print('scaffold', message)
        end
      end
    end
  end

  scaffold_state()
end