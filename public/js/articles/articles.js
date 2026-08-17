import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

function Articles() {
  fetch("http://localhost:3000/articles")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Articles Data:", data);

      let articlesContainer = document.getElementById("articles-container");

      console.log("Articles Container:", articlesContainer);

      data.forEach(function (article) {
        console.log("Article Image:", article.image);

        let slide = document.createElement("div");

        slide.className = "swiper-slide h-auto";

        let card = document.createElement("a");

        card.href = article.link || "#";

        card.className =
          "flex flex-col bg-white rounded-xl shadow-md article-card";

        let image = document.createElement("img");

        image.src = article.image;

        image.alt = article.title;

        image.className = "w-full aspect-[16/10] object-cover rounded-xl";

        let information = document.createElement("div");

        information.className =
          "bg-white rounded-b-xl px-4 h-[78px] flex items-center justify-center text-center overflow-hidden";

        let title = document.createElement("h3");

        title.innerText = article.title;

        title.className =
          "article-title text-xs md:text-sm leading-7 text-gray-800";

        information.append(title);

        card.append(image);
        card.append(information);

        slide.append(card);

        articlesContainer.append(slide);
      });

      new Swiper(".articlesSwiper", {
        modules: [Autoplay, Pagination],

        loop: true,

        slidesPerView: 1,

        slidesPerGroup: 1,

        spaceBetween: 12,

        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },

        pagination: {
          el: ".articles-pagination",
          clickable: true,
        },

        breakpoints: {
          426: {
            slidesPerView: 2,
            spaceBetween: 16,
          },

          769: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
      });
    })
    .catch(function (error) {
      console.log("Articles Error:", error);
    });
}

let button = document.getElementById("button");

if (button) {
  button.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

export default Articles;

