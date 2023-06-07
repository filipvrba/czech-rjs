export default class ElmApp extends HTMLElement {
  constructor() {
    super();
    this.init_elm()
  };

  init_elm() {
    let template = `${`
    <div class='container mt-5'>
      <elm-text-panel></elm-text-panel>
    </div>
    `}`;
    this.innerHTML = template
  }
}