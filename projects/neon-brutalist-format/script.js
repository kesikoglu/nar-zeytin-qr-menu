const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    if (!button) return;

    const originalText = button.textContent;
    button.textContent = "Message staged";
    window.setTimeout(() => {
      button.textContent = originalText;
    }, 1600);
  });
});
