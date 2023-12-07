"use strict";
import { TIME } from "./config";
import { controlString } from "./controller";

export const state = {
  total: 1,
  items: [],
};

// Intersection Observer for nav and header
export const observer = function (header, nav) {
  const navHeight = nav.getBoundingClientRect().height;
  const observerOptions = {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight + 30}px`,
  };

  const observerElement = new IntersectionObserver(
    observerCallBack.bind(nav),
    observerOptions
  );
  observerElement.observe(header);
};

const observerCallBack = function (entries, element) {
  const [entry] = entries;
  if (entry.isIntersecting) this.classList.remove("sticky");
  else this.classList.add("sticky");
};

export const timerUpdating = function () {
  let time = TIME;
  setInterval(() => {
    const min = Math.trunc(time / 60);
    const sec = time % 60;

    time--;
    controlString(min, sec);
    if (time === 0) {
      location.reload();
    }
  }, 1000);
};

export const parseItem = function (item) {
  const cartItem = {
    name: item.querySelector(".product__name").innerHTML,
    price: item.querySelector(".product__discount").innerHTML,
    img: item.querySelector(".product__img").src,
    quantity: 1,
  };

  if (state.items.some((item) => item.name === cartItem.name)) {
    const changeItem = state.items.find((item) => item.name === cartItem.name);
    cartItem.quantity = changeItem.quantity + 1;
    state.items[state.items.indexOf(changeItem)] = cartItem;
  } else {
    state.items.push(cartItem);
  }

  calculateTotal();
};

export const changeQuantity = function (item, incr = false) {
  const changeItem = state.items.find(
    (itemS) => itemS.name === item.querySelector(".cart__name").innerHTML
  );
  const cloneItem = structuredClone(changeItem);

  if (incr) cloneItem.quantity = changeItem.quantity + 1;
  else cloneItem.quantity = changeItem.quantity - 1;
  if (cloneItem.quantity < 1) return false;

  state.items[state.items.indexOf(changeItem)] = cloneItem;

  calculateTotal();

  return true;
};

const calculateTotal = function () {
  state.total = state.items.reduce(
    (acc, value) =>
      acc + parseFloat(value.price.replace("$", "")) * value.quantity,
    0
  );
};

export const deleteItem = function (item) {};
