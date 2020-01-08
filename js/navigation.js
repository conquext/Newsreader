// fixes footer to bottom when the dom is empty
// and adjust sidebar menu absolute positioning
// when in contact with footer
const footerHeight = Math.max(
  footer.clientHeight || footer.scrollHeight || footer.offsetHeight
);

const docHeight =
  window.pageYOffset > window.innerHeight / 2
    ? window.pageYOffset
    : window.innerHeight;

window.addEventListener("scroll", adjustNav);
