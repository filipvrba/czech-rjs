module RJST
  module Content
    require 'fileutils'

    module_function

    def write_to_file(path, content)
      unless Dir.exist? File.dirname(path)
        FileUtils.mkdir_p File.dirname(path)
      end

      File.open path, "a+" do |f|
        f.write(content + "\n")
      end
    end
  end
end