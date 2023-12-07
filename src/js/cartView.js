"use strict";

class CartView {
  _cart = document.querySelector(".cart__content");
  _subtotal = document
    .querySelector(".cart__subtotal")
    .querySelector(".cart__fee");
  _total = document.querySelector(".cart__price-total");

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return new Error(`No data`);
    this._data = data;
  }

  renderItems() {
    this._clear();
    const html = this._generateMarkup();
    this._cart.insertAdjacentHTML("afterbegin", html);
    this._generateTotal();
  }

  _generateMarkup() {
    return this._data.items
      .map((item) => {
        return this._generateHTML(item);
      })
      .join("");
  }

  _generateTotal() {
    this._subtotal.innerHTML = `$${this._data.total}`;
    this._total.innerHTML = `$${(this._data.total + 10).toFixed(2)}`;
  }

  _generateHTML(item) {
    return `
    <div class="cart__item">
        <div class="cart__img-container">
             <img src="${item.img}" alt="" class="cart__img" />
        </div>

        <div class="cart__name-price">
            <div class="cart__name">${item.name}</div>
            <div class="cart__price">$${
              parseFloat(item.price.replace("$", "")) * item.quantity
            }</div>
        </div>

        <div class="cart__change">
            <div class="cart__decrease">-</div>
            <div class="cart__number">${item.quantity}</div>
            <div class="cart__increase">+</div>
        </div>
    </div>`;
  }

  _clear() {
    this._cart.innerHTML = "";
  }
}

export default new CartView();
