import { render } from "./helper.js";

const url = new URL(document.URL);
const query = new URLSearchParams(url.search);

await render(query);
