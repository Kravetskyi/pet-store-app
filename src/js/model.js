"use strict";
import { TIME } from "./config";
import { controlString } from "./controller";

// Intersection Observer for nav and header
export const observer = function (header, nav) {
  const navHeight = nav.getBoundingClientRect().height;
  console.log(navHeight);
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
