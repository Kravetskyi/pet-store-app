"use strict";
import heatedBed from "../../img/dog-bed.jpg";
import chicken from "../../img/chicken-treats.jpg";
import dogBed from "../../img/dog-blanket.jpg";
import treats from "../../img/dog-treat.jpg";
import bird from "../../img/bird-feed.jpg";
import bone from "../../img/bone-toy.jpg";
import shades from "../../img/shades.jpg";
import hoodie from "../../img/cat-hoodie.webp";
import crate from "../../img/crate.webp";
import millet from "../../img/millet.jpg";
import catToy from "../../img/cat-toy.jpg";
import catFood from "../../img/cat-food.jpg";
import sprite from "../../img/sprite.svg";

class ProductView {
  _sections = Array.from(document.querySelectorAll(".products-section"));
  _slider = document.querySelector(".slider");
  _alert = document.querySelector(".alert");
  _allImports = {
    heatedBed,
    chicken,
    dogBed,
    treats,
    bird,
    bone,
    shades,
    hoodie,
    crate,
    millet,
    catToy,
    catFood,
  };

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return new Error(`No data`);
    this._data = data;
  }

  addHandlerRender(callback) {
    window.addEventListener("load", callback);
  }

  renderProducts() {
    this._clear();

    const html1 = this._generateMarkup(true);
    const html2 = this._generateMarkup(false);

    this._sections[0].insertAdjacentHTML("afterbegin", html1);
    this._sections[1].insertAdjacentHTML("afterbegin", html2);

    this._prodBtns = Array.from(document.querySelectorAll(".product__btn"));
  }

  addHandlerSave(callback) {
    this._slider.addEventListener("click", (e) => {
      const saveBtn = e.target.closest(".product__save");
      if (!saveBtn) return;
      const item = e.target.closest(".product");

      const svg = item.querySelector(".product__save");
      this._toggleSaved(svg);
      callback(item);
    });
  }

  _toggleSaved(el) {
    el.classList.toggle("product__save--saved");
  }

  addHandlerAddToCart(callback) {
    this._slider.addEventListener("click", (e) => {
      const btn = e.target.closest(".product__btn");
      if (!btn) return;
      const product = btn.closest(".product");
      this._notify();
      callback(product);
    });
  }

  _notify() {
    this._alert.classList.add("notification");
    this._disableBtns();
    setTimeout(() => {
      this._alert.classList.remove("notification");
      this._enableBtns();
    }, 2000);
  }

  _disableBtns() {
    this._prodBtns.forEach((btn) => btn.setAttribute("disabled", true));
  }

  _enableBtns() {
    this._prodBtns.forEach((btn) => btn.removeAttribute("disabled"));
  }

  _generateMarkup(bool) {
    if (bool)
      return this._data.products.sectionOne
        .map((prod) => this._generateHTML(prod))
        .join("");
    return this._data.products.sectionTwo
      .map((prod) => this._generateHTML(prod))
      .join("");
  }

  _generateHTML(prod) {
    return `
    <div class="product">
        <figure class="product__showcase">
        <img
            src="${this._allImports[prod.src]}"
            alt="${prod.name}"
            class="product__img"
        />
        <figcaption class="product__cta">
            <button class="product__btn">Add to cart</button>
        </figcaption>
        </figure>
        <div class="product__info">
        <div class="product__i-row-1">
            <p class="product__name">${prod.name}</p>
            <svg class="product__save ${
              prod.wishlisted ? "product__save--saved" : ""
            }">
            <use xlink:href="${sprite}#icon-heart"></use>
            </svg>
        </div>
        <div class="product__i-row-2">
            <p class="product__discount">${prod.price}</p>
            <p class="product__price">${prod.originalPrice}</p>
        </div>
        </div>
    </div>
    `;
  }

  _clear() {
    this._sections.forEach((sec) => (sec.innerHTML = ""));
  }
}

export default new ProductView();
