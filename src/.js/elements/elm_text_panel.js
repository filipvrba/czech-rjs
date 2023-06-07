export default class ElmTextPanel extends HTMLElement {
  constructor() {
    super();

    this._raw_text_input = () => {
      return this.check_btn_correct_visibility()
    };

    this.init_elm();
    window.btn_correct_click = this.btn_correct_click.bind(this);
    this._raw_text = document.getElementById("rawText");
    this._correctedText = document.getElementById("correctedText");
    this._btnCorrect = document.getElementById("btnCorrect");
    this._btnCorrectSpinner = document.getElementById("btnCorrectSpinner");
    this._btnCorrectText = document.getElementById("btnCorrectText");
    this.check_btn_correct_visibility()
  };

  connectedCallback() {
    this._raw_text.addEventListener("input", this._raw_text_input)
  };

  disconnectedCallback() {
    this._raw_text.removeEventListener("input", this._raw_text_input)
  };

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
              <button class='btn btn-primary' id='btnCorrect' type='button' onclick='btn_correct_click()'>
                <span class='spinner-grow spinner-grow-sm d-none' id='btnCorrectSpinner' role='status' aria-hidden='true'></span>
                <span id='btnCorrectText'>Correct</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `}`;
    this.innerHTML = template
  };

  btn_correct_click() {
    this.btn_correct_state(1);

    openai.send_message(
      `The text should be in Czech. The text should be grammatically correct. Text should be representative of blog posts. Here is the text: "${this._raw_text.value}"`,

      (text) => {
        this._correctedText.value = text.trimLeft();
        this.btn_correct_state()
      }
    )
  };

  btn_correct_state(state=0) {
    switch (state) {
    case 1:
      btnCorrect.disabled = true;
      btnCorrectSpinner.classList.remove("d-none");
      btnCorrectText.innerText = "Correction...";
      break;

    case 2:
      btnCorrect.disabled = true;
      btnCorrectSpinner.classList.add("d-none");
      btnCorrectText.innerText = "Correct";
      break;

    default:
      btnCorrect.disabled = false;
      btnCorrectSpinner.classList.add("d-none");
      btnCorrectText.innerText = "Correct"
    }
  };

  check_btn_correct_visibility() {
    if (this._raw_text.value.length > 0) {
      this.btn_correct_state()
    } else {
      this.btn_correct_state(2)
    }
  }
};

ElmTextPanel.ROWS = 15