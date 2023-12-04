"use strict";
import { TIME } from "./config";

class View {
  headerSection = document.querySelector(".header");
  nav = document.querySelector(".nav-wrapper");
  _timer_seconds = document.querySelector(".timer__seconds");
  _timer_minutes = document.querySelector(".timer__minutes");

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
}

export default new View();
