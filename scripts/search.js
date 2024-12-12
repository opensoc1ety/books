import { render } from "./helper.js";

const url = new URL(document.URL);
const params = new URLSearchParams(url.search);
const query = params.get("q");

document.querySelector(".query").value = query;

if (query)
    await render(params);
