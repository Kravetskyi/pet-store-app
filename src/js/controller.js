"use strict";

import * as model from "./model.js";
import view from "./view.js";

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

const init = () => {
  controlObserver();
  controlTimer();
  view.addHandlerBtn(controlCartOpen);
  view.addHandlerCartClose(controlCartClose);
  view.addHandlerPagination(controlPagination);
};

init();
