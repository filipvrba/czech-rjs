require 'option_parser'

module RJST
  module Arguments
    @options = {
      scaffold: {
        element: nil,
      },
    }

    OptionParser.parse do |parser|
      parser.banner(
        "Tool for manipulating RJS files.\n" +
        "Usage: #{APP_NAME} [options]\n" +
        "\nOptions:"
      )
      parser.on( "-h", "--help", "Show help" ) do
        puts parser
        exit
      end
      parser.on( "-v", "--version", "Show version" ) do
        puts "Version is #{VERSION}"
        exit
      end
      parser.on("-s", "--scaffold", "Creating scaffolding for a specific part\n" +
                "(this is the next level of setup)." ) do
        OptionParser.parse do |parser|
          parser.banner(
            "Creating scaffolding for a specific part.\n" +
            "Usage: #{APP_NAME} --scaffold [options]\n" +
            "\nOptions:"
          )
          parser.on( "elm NAME", "element NAME", "Creates scaffolding for the new element.\n" ) do |name|
            @options[:scaffold][:element] = name
          end

          parser.on( "-h", "--help", "Show help" ) do
            puts parser
            exit
          end
        end
      end
    end

    def self.options
      @options
    end

    def self.options_scaffold_empty?
      @options[:scaffold].each do |_, v|
        if v
          return false
        end
      end

      return true
    end
  end
end