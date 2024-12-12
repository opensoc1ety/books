import { render, display_volumes } from "./helper.js";


const form = document.querySelector("#booksearchform");
const input = document.querySelector(".query");

document.querySelector(".date").textContent = new Date().getFullYear();
document.querySelector(".focustoform").addEventListener('click', () => {
    input.scrollIntoView({ behavior: "smooth" });
    input.focus();
})

const url = new URL(document.URL);
const params = new URLSearchParams(url.search);
const q = params.get("q");


async function update_and_add_history(q) {
    const data = await render(`q=${q}`)
    data.q = q;
    console.log(data)
    history.pushState(data, "", `?q=${q}`)
}
document.querySelector(".query").value = q;
if (q) {
    const data = await render(`q=${q}`)
    data.q = q;
    console.log(document.location.href)
    history.replaceState(data, "", document.location.href);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const q = input.value;
    update_and_add_history(q)
})
const initialState = {
    q: ""
}

if (!q)
history.replaceState(initialState, "", document.location.href);

window.addEventListener("popstate", (e) => {
    console.log("HERE")
    display_volumes(e.state);
    document.querySelector(".query").value = e.state.q;
})