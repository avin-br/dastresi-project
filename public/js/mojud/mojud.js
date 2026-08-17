import Swiper from "swiper";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";

function Mojud() {
  fetch("http://localhost:3000/availableProducts")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let productsContainer = document.getElementById("products-container");

      data.forEach(function (product) {
        let slide = document.createElement("div");

        slide.className = "swiper-slide h-auto";

        let card = document.createElement("a");

        card.href = product.link || "#";

        card.className =
          "flex flex-col rounded-xl bg-white shadow-md overflow-hidden group h-full";

        let imageBox = document.createElement("div");

        imageBox.className = "relative flex items-center justify-center";

        let image = document.createElement("img");

        image.src = product.image;
        image.alt = product.title;

        image.className = "w-full h-[230px] object-contain rounded-t-xl";

        let colorsBox = document.createElement("div");

        colorsBox.className = "absolute top-2 left-2 flex flex-col z-10";

        product.colors.forEach(function (color) {
          let colorCircle = document.createElement("span");

          colorCircle.className =
            "w-3 h-3 m-1 rounded-full border border-gray-300";

          colorCircle.style.backgroundColor = color;

          colorsBox.append(colorCircle);
        });

        imageBox.append(image);
        imageBox.append(colorsBox);

        let information = document.createElement("div");

        information.className =
          "flex flex-col justify-around p-2 text-center h-[105px]";

        let category = document.createElement("span");

        category.innerText = product.category;

        category.className =
          "text-xs text-gray-400 mb-2 whitespace-nowrap overflow-hidden text-ellipsis";

        let title = document.createElement("h3");

        title.innerText = product.title;

        title.className =
          "text-sm leading-7 text-gray-800 group-hover:text-blue-500 product-title";

        information.append(category);
        information.append(title);

        let priceBox = document.createElement("div");

        priceBox.className = "px-2 md:px-4 h-[65px] pb-3";

        if (product.available === false) {
          priceBox.className =
            "flex items-center justify-center border-t bg-red-100 text-red-800 text-sm h-[65px]";

          priceBox.innerText = "ناموجود";
        } else {
          if (product.oldPrice !== "") {
            let oldPrice = document.createElement("div");

            oldPrice.innerText = product.oldPrice;

            oldPrice.className =
              "text-left text-sm text-gray-400 line-through h-5";

            priceBox.append(oldPrice);
          }

          let currentPrice = document.createElement("div");

          currentPrice.className = "flex items-center justify-end";

          let price = document.createElement("span");

          price.innerText = product.price;

          price.className = "text-blue-500 font-bold text-xl";

          let toman = document.createElement("span");

          toman.innerText = "تومان";

          toman.className = "text-gray-500 text-xs mr-1";

          currentPrice.append(price);
          currentPrice.append(toman);

          priceBox.append(currentPrice);
        }

        card.append(imageBox);
        card.append(information);
        card.append(priceBox);

        slide.append(card);

        productsContainer.append(slide);
      });

      new Swiper(".availableSwiper", {
        modules: [Autoplay, Navigation],

        loop: true,

        slidesPerView: 1.5,

        slidesPerGroup: 1,

        spaceBetween: 12,

        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },

        navigation: {
          nextEl: ".available-prev",
          prevEl: ".available-next",
        },

        breakpoints: {
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      });
    })
    .catch(function (error) {
      console.log("Mojud Error:", error);
    });
}

export default Mojud;
