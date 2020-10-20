'use strict'
const cartButton = document.querySelector(".head-cart-button");
const enterButton = document.querySelector(".button-enter");
const exitButton = document.querySelector(".button-exit");
const modal = document.querySelector(".modal");
const modalAuth = document.querySelector(".modal-auth");
const closeModal = document.querySelector(".close-modal");
const closethis = document.querySelector(".close-this");
const user = document.querySelector(".user");
const closeAuth = document.querySelector(".close-auth");

const buttonNoSubmit = document.querySelector(".button-nosubmit");
const buttonSubmit = document.querySelector(".button-submit");
const loginInput = document.querySelector(".login");
const passInput = document.querySelector(".password");
const cardsRestaurants = document.querySelector(".cards-restaurants");
const cardsGoods = document.querySelector(".cards-goods");
const promo = document.querySelector(".promoblock");
const restaurantsBlock = document.querySelector(".restaurants-block");
const logo = document.querySelector(".logo");
const goods = document.querySelector(".goods");
const goodsInfo = document.querySelector(".goods__info");


let login = localStorage.getItem('gloDelivery');
let pass = localStorage.getItem('passDelivery');
let restaurantInfo

const getData = async function(url) {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, status ${response.status}`);
  }
  return await response.json();
};

getData('./db/partners.json')





authorization();
function mainPage () {
    promo.classList.remove("hide");
    restaurantsBlock.classList.remove("hide");
    goods.classList.add("hide");
}

function toggleModal() {
  modal.classList.toggle("is-open");
};
function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
 };
//Autorization
function authorization() {
  if ( modalAuth.classList.contains("is-open")){
  pass = passInput.value;
  login = loginInput.value;
}
  loginInput.classList.remove('wrong');
  passInput.classList.remove('wrong');
  
  if (loginInput.value === '' &  modalAuth.classList.contains("is-open")){
   loginInput.classList.add('wrong');

   
  };
  if (passInput.value === '' &  modalAuth.classList.contains("is-open") ){
    passInput.classList.add('wrong');
    
    
  };
  if (login != 'admin' || pass != '12345') {
    if ( modalAuth.classList.contains("is-open")){
      alert('Something wrong!!!')
     passInput.classList.add('wrong');
    loginInput.classList.add('wrong');}}
  if (login === 'admin' & pass === '12345')  {
    localStorage.setItem('gloDelivery',login)
    localStorage.setItem('passDelivery', pass)
    modalAuth.classList.remove("is-open");

    exitButton.classList.add("is-open");
    enterButton.classList.remove("is-open");
    user.innerHTML = login;
    user.classList.add("is-open");
    cartButton.classList.add("is-open"); 
   
    
  };

  
 
}
function exit() {
  localStorage.removeItem('gloDelivery');
  localStorage.removeItem('passDelivery');
  user.classList.toggle("is-open");
  exitButton.classList.toggle("is-open");
  enterButton.classList.toggle("is-open");
  cartButton.classList.toggle("is-open");  
  mainPage();
 
}; 

function createCardsRestaurants(restaurant) {
  const { name, time_of_delivery: timeOfDelivery,stars, price, kitchen, image, products } = restaurant;
  const card = `
  <a  class="card card-restaurant card--hover wow flipInX"  data-product="${products}">
              <img src="${image}" alt="pizza plus" class="card__img" />
              <div class="card__text">
                <div class="card__title">
                  <h3 class="card__name">${name}</h3>
                  <div class="card__time">${timeOfDelivery} мин</div>
                </div>
                <div class="card__info">
                  <div class="card__star">${stars}</div>
                  <div class="card__price">От ${price} ₽</div>
                  <div class="card__type">${kitchen}</div>
                </div>
              </div>
            </a>
  `;
  cardsRestaurants.insertAdjacentHTML('beforeend', card);
}




function openGoods(event) {
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');
  
  console.log(user.classList.contains("is-open"));
  console.log(Boolean(restaurant));
  if (restaurant) {
    if (user.classList.contains("is-open")){
    promo.classList.add("hide");
    restaurantsBlock.classList.add("hide");
    goods.classList.remove("hide");
    cardsGoods.textContent = '';
    goodsInfo.textContent = '';
  
  
    restaurantInfo = restaurant.dataset.product;
    getData(`./db/${restaurant.dataset.product}`).then(function(data){
  data.forEach(createCardsGoods);
});
 getData('./db/partners.json').then(function(data){
  data.forEach(createHeaderGoods);
});
  
  } else {toggleModalAuth(); }};
}


function createHeaderGoods(restaurant) {
   const { name, time_of_delivery: timeOfDelivery,stars, price, kitchen, image, products } = restaurant;
  if (restaurantInfo === products){
 
  
   
  const headInfo=`
  <div class="restaurants__heading">
                  <h2 class="restaurants__title">${name}</h2>
                  <div class="restaurant-info">
                    <div class="card__info">
                      <div class="card__star">${stars}</div>
                      <div class="card__price">От ${price} ₽</div>
                      <div class="card__type">${kitchen}</div>
                    </div>
                  </div>
                </div>
  `;
   goodsInfo.insertAdjacentHTML('afterBegin', headInfo );};
}

function createCardsGoods(goods) {
  const { id, name, description, price, image  } = goods;
  const card=`
   <div class="card card-goods wow flipInX">
                  <img src="${image}" alt="pizza plus" class="card__img" />
                  <div class="card__text">
                    <div class="card__title">
                      <h3 class="card__name card__name--reg">
                       ${name}
                      </h3>
                    </div>
                    <p class="card__ingredients">
                      ${description}
                    </p>
                    <div class="button-price">
                      <div class="button-cart button cart-button">
                       <p class="cart__text"> В корзину </p>
                        <img class="button-icon--right" src="img/cart-white.svg" alt="" />
                      </div>
                      <div class="card__food-price">${price} ₽</div>
                    </div>
                  </div>
                </div>
  `;
   cardsGoods.insertAdjacentHTML('beforeend', card);
}
//createCardsGoods();

function init() {
  getData('./db/partners.json').then(function(data){
  data.forEach(createCardsRestaurants);
});

enterButton.addEventListener("click",toggleModalAuth);

closeAuth.addEventListener("click",toggleModalAuth);
buttonNoSubmit.addEventListener("click",toggleModalAuth);
buttonSubmit.addEventListener("click", authorization);
cartButton.addEventListener("click",toggleModal);
closeModal.addEventListener("click",toggleModal);
closethis.addEventListener("click",toggleModal);
cardsRestaurants.addEventListener("click", openGoods);
logo.addEventListener("click", mainPage);

exitButton.addEventListener("click",exit);



new Swiper('.swiper-container', {
  loop: true,
  autoplay: true,
  spped: 10,
  delay: 400,
  
  effect:'flip',//"slide", "fade", "cube", "coverflow" or "flip"

})  
}
init ();

