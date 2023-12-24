class MobileView {
  _parentElement = document.querySelector(".mobile__nav");
  _list = document.querySelector(".mobile__list");
  _closeBtn = document.querySelector(".mobile__close");
  _openBtn = document.querySelector(".mobile__btn");

  addHandlerOpen(callback) {
    this._openBtn.addEventListener("click", (e) => {
      const btn = e.target.closest(".mobile__btn");
      if (!btn) return;
      callback();
    });
  }

  addHandlerClose(callback) {
    this._closeBtn.addEventListener("click", () => {
      callback();
    });
  }

  addHandlerLinks(callback) {
    this._list.addEventListener("click", (e) => {
      const link = e.target.closest(".mobile__link");
      if (!link) return;
      callback();
    });
  }

  open() {
    this._parentElement.classList.add("mobile__nav--opened");
  }

  close() {
    this._parentElement.classList.remove("mobile__nav--opened");
  }
}

export default new MobileView();
