class View {
  headerSection = document.querySelector(".header");
  nav = document.querySelector(".nav-wrapper");
  _timer_seconds = document.querySelector(".timer__seconds");
  _timer_minutes = document.querySelector(".timer__minutes");
  _cartBtn = document.querySelector(".nav__icon--cart");
  _overlay = document.querySelector(".overlay");
  _cart = document.querySelector(".cart");
  _cartClose = document.querySelector(".cart__close");
  _pagBtns = Array.from(
    document.querySelector(".pagination").querySelectorAll("*")
  );
  _slider = document.querySelector(".slider");
  _search = document.querySelector(".nav__icon--search");
  _searchSVG = document.querySelector(".header__icon");
  _input = document.querySelector(".header__input");

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

  addHandlerSearch(callback) {
    console.log(this._search);
    this._search.addEventListener("click", (e) => {
      const btn = e.target.closest(".nav__icon");
      if (!btn) return;
      callback();
    });

    this._searchSVG.addEventListener("click", (e) => {
      const btn = e.target.closest(".header__icon");
      if (!btn) return;
      this._input.focus();
    });
  }

  searchFocus() {
    this._input.focus();
    const inpCoords = this._input.getBoundingClientRect();
    window.scrollTo({
      left: inpCoords.x,
      top: inpCoords.y - 50,
      behavior: "smooth",
    });
  }

  cartOpen() {
    this._overlay.classList.add("show");
    this._cart.classList.add("show");
    this._cart.classList.add("cart-slide-in");
    this._cart.classList.remove("cart-slide-out");
  }

  cartClose() {
    this._overlay.classList.remove("show");
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
}

export default new View();
