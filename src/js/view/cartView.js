class CartView {
  _cart = document.querySelector(".cart__content");
  _subtotal = document
    .querySelector(".cart__subtotal")
    .querySelector(".cart__fee");
  _total = document.querySelector(".cart__price-total");
  _number = document.querySelector(".cart__header").querySelector(".heading-2");

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return new Error(`No data`);
    this._data = data;
  }

  addHandlerQuantity(callback) {
    this._cart.addEventListener("click", (e) => {
      const incBtn = e.target.closest(".cart__increase");
      const decBtn = e.target.closest(".cart__decrease");

      if (!incBtn && !decBtn) return;

      const prod = e.target.closest(".cart__item");
      if (incBtn) return callback(prod, true);
      return callback(prod);
    });
  }

  addHandlerDelete(callback) {
    this._cart.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".cart__delete");
      if (!deleteBtn) return;
      const prod = e.target.closest(".cart__item");
      callback(prod);

      this._disappearItem(prod);
    });
  }

  renderItems() {
    this._clear();
    const html = this._generateMarkup();
    this._cart.insertAdjacentHTML("afterbegin", html);
    this.renderNumbers();
  }

  renderNumbers() {
    this._generateTotal();
    this._changeNumberOfItems();
  }

  _generateMarkup() {
    return this._data.items
      .map((item) => {
        return this._generateHTML(item);
      })
      .join("");
  }

  _generateTotal() {
    this._subtotal.innerHTML = `$${this._data.total.toFixed(2)}`;

    if (this._data.total + 10 === 10) this._total.innerHTML = "$0.00";
    else this._total.innerHTML = `$${(this._data.total + 10).toFixed(2)}`;
  }

  _changeNumberOfItems() {
    this._number.innerHTML = `Your shopping cart (${this._data.items.length})`;
  }

  _generateHTML(item) {
    return `
    <div class="cart__item">
        <span class="cart__delete">&#10005;</span>

        <div class="cart__img-container">
             <img src="${item.img}" alt="" class="cart__img" />
        </div>

        <div class="cart__name-price">
            <div class="cart__name">${item.name}</div>
            <div class="cart__price">$${(
              parseFloat(item.price.replace("$", "")) * item.quantity
            ).toFixed(2)}</div>
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

  _disappearItem(item) {
    item.classList.add("deleted");
    setTimeout(() => item.remove(), 500);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return new Error(`No data`);

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._cart.querySelectorAll("*"));

    // console.log("New elements: ", newElements);
    // console.log("Current elements: ", curElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });

    this._generateTotal();
  }
}

export default new CartView();
