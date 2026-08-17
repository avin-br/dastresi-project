import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";

function Slider() {
  let sliderWrapper = document.getElementById("slider-wrapper");

  fetch("/dastresi-project/db.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      data.slider.forEach(function (item) {
        let slide = document.createElement("div");

        slide.classList.add("swiper-slide");

        let img = document.createElement("img");

        img.src = item.image;
        img.alt = item.alt;

        img.classList.add("block", "w-full", "rounded-xl");

        slide.append(img);
        sliderWrapper.append(slide);
      });

      new Swiper(".mySwiper", {
        modules: [Autoplay, EffectFade, Pagination],

        effect: "fade",

        fadeEffect: {
          crossFade: true,
        },

        rewind: true,

        speed: 1500,

        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    })
    .catch(function (error) {
      console.log("Slider Error:", error);
    });
}

export default Slider;
