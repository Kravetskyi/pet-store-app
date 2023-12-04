"use strict";

import * as model from "./model.js";
import view from "./view.js";

const controlObserver = function () {
  model.observer(view.headerSection, view.nav);
};

const controlTimer = function () {
  model.timerUpdating();
};

export const controlString = function (min, sec) {
  view.updateTimer(min, sec);
};

const init = () => {
  controlObserver();
  controlTimer();
};

init();
