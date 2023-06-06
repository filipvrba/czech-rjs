module RJST
  module Scaffold
    module_function

    def create_element(name, &block)
      name_class = name.split(/[_-]/).map(&:capitalize).join

      scaffold_element_rjs = """
export default class Elm#{name_class} < HTMLElement
  def initialize
    super
    
    init_elm()
  end

  def connectedCallback()
  end

  def disconnectedCallback()
  end

  def init_elm()
    template = \"\"\"
    \"\"\"

    self.innerHTML = template
  end
end
      """.strip
      scaffold_init_rjs = """
import 'Elm#{name_class}', './elements/elm_#{name.downcase}'
window.customElements.define('elm-#{name.downcase}', Elm#{name_class})
      """.strip

      path_scaffold_element = File.join(Dir.pwd, 'src/rjs/elements', "elm_#{name.downcase}.rjs")
      path_scaffold_init = File.join(Dir.pwd, 'src/rjs/elements.rjs')
      files = {
        path_scaffold_element => scaffold_element_rjs,
        path_scaffold_init => scaffold_init_rjs,
      }

      files.each do |path, content|
        Content.write_to_file(path, content)
        block.call("The '.#{path.sub(Dir.pwd(), '')}' file has been modified.") if block
      end

      block.call("The scaffold was launched under the name of " +
                 "'elm-#{name.downcase}' element.") if block
    end
  end
end