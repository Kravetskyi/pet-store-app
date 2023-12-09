"use strict";

class NumberView {
  _parentElement = document.querySelector(".nav__cart-number-wrapper");

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return new Error(`No data`);
    this._data = data;
  }

  renderElement() {
    this._clear();
    const html = this._generateMarkup();
    if (!html) return;
    this._parentElement.insertAdjacentHTML("beforeend", html);
  }

  _generateMarkup() {
    if (this._data.items.length < 1) return false;
    return `<div class="nav__cart-number">${this._data.items.length}</div>`;
  }

  _clear() {
    const el = this._parentElement.querySelector(".nav__cart-number");
    if (el) el.remove();
    return;
  }
}

export default new NumberView();
