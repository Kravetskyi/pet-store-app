"use strict";

import * as model from "./model.js";
import view from "./view.js";

const controlObserver = function () {
  model.observer(view.headerSection, view.nav);
};

const init = () => {
  controlObserver();
};

init();
