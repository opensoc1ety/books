const form = document.querySelector(".form");
const query_input = document.querySelector(".query");
const submit_button = document.querySelector(".query_submit_btn");
document.querySelector(".date").textContent = new Date().getFullYear();
document.querySelector(".focustoform").addEventListener('click', () => {
    query_input.scrollIntoView({behavior: "smooth"});
    query_input.focus();
})