import { Configuration, OpenAIApi } from "openai";
import { ENV } from "../env";

export default class OpenAI {
  get api() {
    return this._api
  };

  constructor(model="text-davinci-003") {
    let configuration = new Configuration({
      organization: "org-NiaVQxVDeuy4oJH7TvUT4W6A",
      apiKey: ENV.VITE_OPENAI_API_KEY
    });

    this._api = new OpenAIApi(configuration);
    this._model = model
  };

  send_message(message="none", block) {
    let completion = {
      model: this._model,
      prompt: message,
      max_tokens: Math.round(message.length / 2)
    };

    this._api.createCompletion(completion).then((response) => {
      console.log(response.data);
      if (block) return block(response.data.choices[0].text)
    })
  }
}