module RJST
  module Scaffold
    module_function

    def create_element(name, &block)
      name_class = name.split(/[_-]/).map(&:capitalize).join
      name_file = name.gsub('-', '_')
      name_element = name.gsub('_', '-')

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
import 'Elm#{name_class}', './elements/elm_#{name_file}'
window.customElements.define('elm-#{name_element}', Elm#{name_class})
      """.strip

      path_scaffold_element = File.join(Dir.pwd, 'src/rjs/elements', "elm_#{name_file}.rjs")
      path_scaffold_init = File.join(Dir.pwd, 'src/rjs/elements.rjs')
      files = {
        path_scaffold_element => scaffold_element_rjs,
        path_scaffold_init => scaffold_init_rjs,
      }

      files.each do |path, content|
        Content.write_to_file(path, content)
        block.call("Modified '.#{path.sub(Dir.pwd(), '')}'") if block
      end

      block.call("Element 'elm-#{name_element}'") if block
    end
  end
end