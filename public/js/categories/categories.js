import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

function Categories() {
  fetch("http://localhost:3000/selectedCategories")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let desktopContainer = document.getElementById(
        "selected-categories-wrapper",
      );

      let mobileContainer = document.getElementById(
        "selected-categories-mobile",
      );

      data.forEach(function (item) {
        let slide = document.createElement("div");

        slide.className =
          "swiper-slide flex flex-col items-center justify-center";

        slide.innerHTML = `
          <img
            src="${item.image}"
            alt="${item.title}"
            class="w-full object-contain"
          >

          
        `;

        desktopContainer.append(slide);
      });

      data.forEach(function (item) {
        let category = document.createElement("div");

        category.className = "flex flex-col items-center justify-center";

        category.innerHTML = `
          <img
            src="${item.image}"
            alt="${item.title}"
            class="w-full object-contain"
          >

          
        `;

        mobileContainer.append(category);
      });

      new Swiper(".selectedCategoriesSwiper", {
        modules: [Autoplay, Navigation],

        loop: true,

        slidesPerView: 6,

        slidesPerGroup: 1,

        spaceBetween: 20,

        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },

        navigation: {
          nextEl: ".selectedCategoriesSwiper .swiper-button-prev",
          prevEl: ".selectedCategoriesSwiper .swiper-button-next",
        },

        breakpoints: {
          768: {
            slidesPerView: 5,
          },

          1280: {
            slidesPerView: 6,
          },
        },
      });
    })
    .catch(function (error) {
      console.log("Categories Error:", error);
    });
}

export default Categories;
