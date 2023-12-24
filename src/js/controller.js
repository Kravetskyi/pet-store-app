import * as model from "./model.js";
import view from "./view/view.js";
import cartView from "./view/cartView.js";
import productView from "./view/productView.js";
import numberView from "./view/numberView.js";
import mobileView from "./view/mobileView.js";

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

const controlSearch = function () {
  view.searchFocus();
};

const controlPagination = function (bool = false) {
  if (bool) view.movePrev();
  else view.moveNext();
};

const controlProducts = function (item) {
  model.parseItem(item);

  //render cart blob
  numberView.render(model.state);
  numberView.renderElement();

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

  //render cart blob
  numberView.render(model.state);
  numberView.renderElement();

  cartView.render(model.state);
  cartView.renderNumbers();
};

const controlRender = function () {
  productView.render(model.state);

  productView.renderProducts();

  //render cart blob
  numberView.render(model.state);
  numberView.renderElement();

  cartView.render(model.state);
  cartView.renderItems();
};

const controlSave = function (item) {
  model.saveItem(item);
};

const controlMobileOpen = function () {
  mobileView.open();
};

const controlMobileClose = function () {
  mobileView.close();
};

const init = () => {
  productView.addHandlerRender(controlRender);
  controlObserver();
  controlTimer();
  view.addHandlerBtn(controlCartOpen);
  view.addHandlerCartClose(controlCartClose);
  view.addHandlerPagination(controlPagination);
  view.addHandlerSearch(controlSearch);
  cartView.addHandlerQuantity(controlQuantity);
  cartView.addHandlerDelete(controlDelete);
  productView.addHandlerSave(controlSave);
  productView.addHandlerAddToCart(controlProducts);
  mobileView.addHandlerOpen(controlMobileOpen);
  mobileView.addHandlerClose(controlMobileClose);
  mobileView.addHandlerLinks(controlMobileClose);
};

init();
