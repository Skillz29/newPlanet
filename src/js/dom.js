import { API_URL } from "./api";


export const createOrderMessage = (id, tomorrowDay, month, year) => {
  const orderMessageElement = document.createElement("div");
  orderMessageElement.classList.add("order-message");

  const orderMessageText = document.createElement("p");
  orderMessageText.classList.add("order-message__text");
  orderMessageText.textContent = `
  // Ваш заказ оформлен, номер заказа: ${id}. Вы можете его забрать завтра ${tomorrowDay}.${month}.${year}.
  Режим работы с 8:00-20:00ч, перерыв с 12:00-13:00ч`;

  const orderMessageCloseButton = document.createElement("button");
  orderMessageCloseButton.classList.add("order-message__close-button");
  orderMessageCloseButton.textContent = "Закрыть";

  orderMessageElement.append(orderMessageText, orderMessageCloseButton)

  orderMessageCloseButton.addEventListener("click", () => {
    orderMessageElement.remove();
  })

  return orderMessageElement;
}

const createProductCard = ({ id, photoUrl, name, price }) => {
  const productCard = document.createElement("li");
  productCard.classList.add("store__item");
  productCard.innerHTML = `
  <article class="store__product product">
    <img class="product__image" src="${API_URL}${photoUrl}" alt="${name}" width="388" height="261">

    <h3 class="product__title">${name}</h3>

    <p class="product__price">${price}&nbsp;₽</p>

    <button class="product__btn-add-cart btn btn_purple" data-id="${id}"">
      Заказать
    <button>

</article>

  `;
  return productCard;
};

export const renderProducts = (products, productList) => {
  productList.textContent = "";
  products.forEach((product) => {
    const productCard = createProductCard(product);

    productList.append(productCard);
  });
};

export const renderCartItems =  (cartItemsList, cartItems, products) => {
  cartItemsList.textContent = "";

  // const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  // const products = JSON.parse(localStorage.getItem("cartProductDetails") || "[]");

  products.forEach(({id, photoUrl, name, price }) => {
     const cartItem = cartItems.find((item) => item.id === id)
    if (!cartItem) {
      return
    }

    const listItem = document.createElement("li");
    listItem.classList.add("modal__cart-item");
    listItem.innerHTML = `
      <img src="${API_URL}${photoUrl}" alt="" class="${name}">

      <h3 class="modal__cart-item-title">${name}</h3>

      <div class="modal__cart-item-count">
        <button class="modal__btn modal__minus" data-id=${id}>-</button>
        <span class="modal__count">${cartItem.count}</span>
        <button class="modal__btn modal__plus" data-id=${id}>+</button>
      </div>

      <p class="modal__cart-item-price">${price * cartItem.count}&nbsp;₽</p>
    `;

    cartItemsList.append(listItem)
  });




};