export default class ElmTextPanel extends HTMLElement {
  constructor() {
    super();
    this.init_elm();
    window.btn_correct_click = this.btn_correct_click.bind(this);
    this._raw_text = document.getElementById("rawText");
    this._correctedText = document.getElementById("correctedText")
  };

  connectedCallback() {};
  disconnectedCallback() {};

  init_elm() {
    let template = `${`
    <div class='row'>
      <div class=''>
        <div class='card'>
          <div class='card-body'>
            <div class='row'>
              <div class='col-md-6'>
                <div class='mb-3'>
                  <label for='rawText' class='form-label'>Raw Text</label>
                  <textarea class='form-control' id='rawText' rows='${ElmTextPanel.ROWS}' style='resize: none;'></textarea>
                </div>
              </div>
              <div class='col-md-6'>
                <div class='mb-3'>
                  <label for='correctedText' class='form-label'>Corrected Text</label>
                  <textarea readonly class='form-control' id='correctedText' rows='${ElmTextPanel.ROWS}' style='resize: none;'></textarea>
                </div>
              </div>
            </div>
            <div class='d-grid gap-2'>
              <button class='btn btn-primary' onclick='btn_correct_click()'>Correct</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `}`;
    this.innerHTML = template
  };

  btn_correct_click() {}
};

ElmTextPanel.ROWS = 15