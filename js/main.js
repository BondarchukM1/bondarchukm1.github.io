const cartButton = document.querySelector(".cart-button");

const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const closethis = document.querySelector(".close-this");
cartButton.addEventListener("click",toggleModal);

close.addEventListener("click",toggleModal);
closethis.addEventListener("click",toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}
new WOW().init();