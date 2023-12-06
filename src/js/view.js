"use strict";
import { TIME } from "./config";

class View {
  headerSection = document.querySelector(".header");
  nav = document.querySelector(".nav-wrapper");
  _timer_seconds = document.querySelector(".timer__seconds");
  _timer_minutes = document.querySelector(".timer__minutes");
  _cartBtn = document.getElementById("cart_btn");
  _overlay = document.querySelector(".overlay");
  _cart = document.querySelector(".cart");
  _cartClose = document.querySelector(".cart__close");
  _pagBtns = Array.from(
    document.querySelector(".pagination").querySelectorAll("*")
  );
  _prodBtns = Array.from(document.querySelectorAll(".product__btn"));
  _slider = document.querySelector(".slider");
  _alert = document.querySelector(".alert");

  updateTimer(min, sec) {
    const arrayMinutes = Array.from(this._timer_minutes.querySelectorAll("*"));
    const arraySeconds = Array.from(this._timer_seconds.querySelectorAll("*"));

    const minStr = min.toString();
    const secStr = sec.toString();

    if (min > 9) {
      arrayMinutes[0].innerHTML = minStr[0];
      arrayMinutes[1].innerHTML = minStr[1];
    } else {
      arrayMinutes[0].innerHTML = 0;
      arrayMinutes[1].innerHTML = minStr;
    }

    if (sec > 9) {
      arraySeconds[0].innerHTML = secStr[0];
      arraySeconds[1].innerHTML = secStr[1];
    } else {
      arraySeconds[0].innerHTML = 0;
      arraySeconds[1].innerHTML = secStr;
    }
  }

  addHandlerBtn(callback) {
    this._cartBtn.addEventListener("click", (e) => {
      const btn = e.target.closest("#cart_btn");
      if (!btn) return;
      callback();
    });
  }

  addHandlerCartClose(callback) {
    [this._overlay, this._cartClose].forEach((el) =>
      el.addEventListener("click", (e) => {
        const target1 = e.target.closest(".cart__close");
        const target2 = e.target.closest(".overlay");
        if (!target1 && !target2) return;
        callback();
      })
    );
  }

  addHandlerAddToCart(callback) {
    this._slider.addEventListener("click", (e) => {
      const btn = e.target.closest(".product__btn");
      if (!btn) return;
      const product = btn.closest(".product");
      this._notify();
    });
  }

  addHandlerPagination(callback) {
    this._pagBtns.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const prev = e.target.closest(".previous");
        const next = e.target.closest(".next");
        if (!prev && !next) return;
        if (prev) return callback(true);
        callback();
      })
    );
  }

  cartOpen() {
    this._overlay.classList.add("show");
    this._cart.classList.add("show");
    this._cart.classList.add("cart-slide-in");
    this._cart.classList.remove("cart-slide-out");
  }

  cartClose() {
    this._overlay.classList.remove("show");
    // this._cart.classList.remove("show");
    this._cart.classList.remove("cart-slide-in");
    this._cart.classList.add("cart-slide-out");
  }

  movePrev() {
    this._slider.classList.add("first-page");
    this._slider.classList.remove("last-page");
    this._pagBtns[0].classList.add("disabled");
    this._pagBtns[1].classList.remove("disabled");
  }
  moveNext() {
    this._slider.classList.remove("first-page");
    this._slider.classList.add("last-page");
    this._pagBtns[1].classList.add("disabled");
    this._pagBtns[0].classList.remove("disabled");
  }

  _notify() {
    this._alert.classList.add("notification");
    this._disableBtns();
    console.log("disabled");
    setTimeout(() => {
      this._alert.classList.remove("notification");
      this._enableBtns();
      console.log("enabled");
    }, 2000);
  }

  _disableBtns() {
    this._prodBtns.forEach((btn) => btn.setAttribute("disabled", true));
  }

  _enableBtns() {
    this._prodBtns.forEach((btn) => btn.removeAttribute("disabled"));
  }
}

export default new View();
