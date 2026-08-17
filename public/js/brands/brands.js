import Swiper from "swiper";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";

function Brands() {
  fetch("http://localhost:3000/popularBrands")
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      let brandsContainer = document.getElementById("brands-container");

      data.forEach(function (brand) {
        let slide = document.createElement("div");

        slide.className =
          "swiper-slide h-auto flex items-center justify-center";

        let brandLink = document.createElement("a");

        brandLink.href = brand.link || "#";

        brandLink.className =
          "brand-card flex items-center justify-center bg-white rounded-xl shadow-md w-full h-[130px] p-3";

        let image = document.createElement("img");

        image.src = brand.image;

        image.alt = brand.title;

        image.className = "w-24 h-24 object-contain";

        brandLink.append(image);

        slide.append(brandLink);

        brandsContainer.append(slide);
      });

      new Swiper(".brandsSwiper", {
        modules: [Autoplay, Navigation],

        loop: true,

        slidesPerView: 2,

        slidesPerGroup: 1,

        spaceBetween: 12,

        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },

        navigation: {
          nextEl: ".brands-prev",
          prevEl: ".brands-next",
        },

        breakpoints: {
          426: {
            slidesPerView: 4,
            spaceBetween: 20,
          },

          769: {
            slidesPerView: 6,
            spaceBetween: 20,
          },

          1280: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        },
      });
    })

    .catch(function (error) {
      console.log("Brands Error:", error);
    });
}

export default Brands;
