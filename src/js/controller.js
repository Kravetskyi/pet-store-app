"use strict";

import * as model from "./model.js";
import view from "./view.js";
import cartView from "./cartView.js";
import productView from "./productView.js";

if (module.hot) {
  module.hot.accept();
}

const controlObserver = function () {
  model.observer(view.headerSection, view.nav);
};

const controlTimer = function () {
  model.timerUpdating();
};

export const controlString = function (min, sec) {
  view.updateTimer(min, sec);
};

const controlCartOpen = function () {
  view.cartOpen();
};

const controlCartClose = function () {
  view.cartClose();
};

const controlPagination = function (bool = false) {
  if (bool) view.movePrev();
  else view.moveNext();
};

const controlProducts = function (item) {
  model.parseItem(item);

  //save data into view
  cartView.render(model.state);

  //render cart items
  cartView.renderItems();
};

const controlQuantity = function (item, incr = false) {
  if (incr) model.changeQuantity(item, true);
  else {
    const success = model.changeQuantity(item);
    if (!success) return;
  }
  cartView.update(model.state);
};

const controlDelete = function (item) {
  model.deleteItem(item);

  cartView.render(model.state);
  cartView.renderNumbers();
};

const controlRender = function () {
  productView.render(model.state);

  productView.renderProducts();
};

const init = () => {
  productView.addHandlerRender(controlRender);
  controlObserver();
  controlTimer();
  view.addHandlerBtn(controlCartOpen);
  view.addHandlerCartClose(controlCartClose);
  view.addHandlerPagination(controlPagination);
  view.addHandlerAddToCart(controlProducts);
  cartView.addHandlerQuantity(controlQuantity);
  cartView.addHandlerDelete(controlDelete);
};

init();
