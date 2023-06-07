import "../css/bootstrap.min.css";
import "../css/style.css";
import "./elements";
import OpenAI from "./third-side/openai";
window.openai = new OpenAI;
document.querySelector("#app").innerHTML = "<elm-app></elm-app>"