import { TIME } from "./config";
import { controlString } from "./controller";

export const state = {
  total: 1,
  items: [],
  products: {
    sectionOne: [
      {
        name: "Heated dog bed &amp; blanket",
        price: "$25.99",
        originalPrice: "$30.00",
        wishlisted: false,
        src: "heatedBed",
      },

      {
        name: "Chicken treats",
        price: "$8.99",
        originalPrice: "$13.99",
        wishlisted: false,
        src: "chicken",
      },

      {
        name: "Warm dog bed",
        price: "$13.99",
        originalPrice: "$16.99",
        wishlisted: false,
        src: "dogBed",
      },

      {
        name: "Barf raw meat crackers",
        price: "$6.99",
        originalPrice: "$9.50",
        wishlisted: false,
        src: "treats",
      },

      {
        name: "Bird feed",
        price: "$3.99",
        originalPrice: "$5.99",
        wishlisted: false,
        src: "bird",
      },

      {
        name: "Bone toy",
        price: "$2.99",
        originalPrice: "$4.99",
        wishlisted: false,
        src: "bone",
      },
    ],

    sectionTwo: [
      {
        name: "Cool summer shades",
        price: "$9.99",
        originalPrice: "$14.99",
        wishlisted: false,
        src: "shades",
      },

      {
        name: "Amazing cat hoodie",
        price: "$10.99",
        originalPrice: "$17.99",
        wishlisted: false,
        src: "hoodie",
      },

      {
        name: "Comfy dog crate",
        price: "$16.99",
        originalPrice: "$20.99",
        wishlisted: false,
        src: "crate",
      },

      {
        name: "Millet for birds",
        price: "$3.99",
        originalPrice: "$5.99",
        wishlisted: false,
        src: "millet",
      },

      {
        name: "Cat toy",
        price: "$5.99",
        originalPrice: "$9.99",
        wishlisted: false,
        src: "catToy",
      },

      {
        name: "Delicious cat food",
        price: "$6.50",
        originalPrice: "$8.99",
        wishlisted: false,
        src: "catFood",
      },
    ],
  },
};

// Intersection Observer for nav and header
export const observer = function (header, nav) {
  const navHeight = nav.getBoundingClientRect().height;
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

export const parseItem = function (item) {
  const cartItem = {
    name: item.querySelector(".product__name").innerHTML,
    price: item.querySelector(".product__discount").innerHTML,
    img: item.querySelector(".product__img").src,
    quantity: 1,
  };

  if (state.items.some((item) => item.name === cartItem.name)) {
    const changeItem = state.items.find((item) => item.name === cartItem.name);
    cartItem.quantity = changeItem.quantity + 1;
    state.items[state.items.indexOf(changeItem)] = cartItem;
  } else {
    state.items.push(cartItem);
  }

  calculateTotal();
  persistCart();
};

export const changeQuantity = function (item, incr = false) {
  const changeItem = state.items.find(
    (itemS) => itemS.name === item.querySelector(".cart__name").innerHTML
  );
  const cloneItem = structuredClone(changeItem);

  if (incr) cloneItem.quantity = changeItem.quantity + 1;
  else cloneItem.quantity = changeItem.quantity - 1;
  if (cloneItem.quantity < 1) return false;

  state.items[state.items.indexOf(changeItem)] = cloneItem;

  calculateTotal();
  persistCart();

  return true;
};

const calculateTotal = function () {
  state.total = state.items.reduce(
    (acc, value) =>
      acc + parseFloat(value.price.replace("$", "")) * value.quantity,
    0
  );
};

export const deleteItem = function (item) {
  const indexOfDelete = state.items.findIndex(
    (itemS) => itemS.name === item.querySelector(".cart__name").innerHTML
  );
  if (indexOfDelete < 0) return;
  state.items.splice(indexOfDelete, 1);

  calculateTotal();
  persistCart();
};

export const saveItem = function (item) {
  const searchedItem1 = state.products.sectionOne.find(
    (obj) => obj.name === item.querySelector(".product__name").innerHTML
  );

  const searchedItem2 = state.products.sectionTwo.find(
    (obj) => obj.name === item.querySelector(".product__name").innerHTML
  );

  if (searchedItem1) {
    const i = state.products.sectionOne.indexOf(searchedItem1);
    if (!state.products.sectionOne[i].wishlisted)
      state.products.sectionOne[i].wishlisted = true;
    else state.products.sectionOne[i].wishlisted = false;
  }
  if (searchedItem2) {
    const i = state.products.sectionTwo.indexOf(searchedItem2);
    if (!state.products.sectionTwo[i].wishlisted)
      state.products.sectionTwo[i].wishlisted = true;
    else state.products.sectionTwo[i].wishlisted = false;
  }

  persistProducts();
};

const persistProducts = function () {
  localStorage.setItem("products", JSON.stringify(state.products));
};

const persistCart = function () {
  localStorage.setItem("items", JSON.stringify(state.items));
};

const init = function () {
  const prods = localStorage.getItem("products");
  if (prods) state.products = JSON.parse(prods);

  const cart = localStorage.getItem("items");
  if (cart) state.items = JSON.parse(cart);

  calculateTotal();
};

init();
