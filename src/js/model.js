"use strict";

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
