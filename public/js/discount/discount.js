function Discounts() {
  let container = document.getElementById("daily-discounts");

  fetch("http://localhost:3000/dailyDiscounts")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.slice(0, 2).forEach(function (item) {
        let product = createProduct(item);

        product.classList.add("lg:flex-col", "lg:pt-10");

        let imageBox = product.firstElementChild;
        let contentBox = imageBox.nextElementSibling;

        imageBox.classList.add("lg:w-[95%]", "lg:h-48");

        contentBox.classList.add("lg:w-[95%]");

        container.append(product);
      });

      let thirdColumn = document.createElement("div");

      thirdColumn.className = `
        flex
        flex-col
        justify-between
        gap-4
        h-full
      `;

      data.slice(2, 4).forEach(function (item) {
        let product = createProduct(item);

        let contentBox = product.firstElementChild.nextElementSibling;

        let firstPriceRow = contentBox.firstElementChild.nextElementSibling;

        firstPriceRow.classList.add("lg:mt-5");

        contentBox.classList.add(
          "lg:w-[56%]",
          "lg:flex-none",
          "lg:min-w-0",
          "lg:overflow-hidden",
        );

        firstPriceRow.classList.add("lg:min-w-0", "lg:w-full");

        let oldPrice = firstPriceRow.firstElementChild;
        let discount = oldPrice.nextElementSibling;

        oldPrice.classList.add("lg:min-w-0");

        discount.classList.add("lg:min-w-0", "lg:max-w-full", "lg:truncate");

        let priceRow = firstPriceRow.nextElementSibling;

        priceRow.classList.add("lg:min-w-0", "lg:w-full");

        let price = priceRow.firstElementChild;
        let toman = price.nextElementSibling;

        price.classList.add("lg:min-w-0", "lg:max-w-full", "lg:truncate");

        toman.classList.add("lg:min-w-0", "lg:max-w-full", "lg:truncate");

        thirdColumn.append(product);
      });

      container.append(thirdColumn);

      startCountdown();
    })
    .catch(function (error) {
      console.log("Discount Error:", error);
    });
}

function createProduct(item) {
  let product = document.createElement("a");

  product.href = "#";

  product.className = `
    bg-white
    rounded-xl
    border
    border-gray-200
    p-3
    flex
    flex-row
    items-center
    gap-3
    transition-all
    duration-200
    hover:shadow-[0_0_12px_rgba(0,0,0,0.12)]
    hover:z-10
  `;

  product.innerHTML = `
    <div class="
      w-32
      lg:w-36
      shrink-0
      flex
      items-center
      justify-center
    ">
      <img
        src="${item.image}"
        alt="${item.title}"
        class="w-full h-full object-contain"
      >
    </div>

    <div class="flex flex-col flex-1 gap-2">

      <h3 class="
        text-sm
        lg:text-base
        font-medium
        text-gray-700
        leading-6
        line-clamp-2
      ">
        ${item.title}
      </h3>

      <div class="flex items-center justify-between gap-2">

        <span class="text-xs text-gray-500 line-through">
          ${item.oldPrice}
        </span>

        <span class="text-xs text-red-500">
          ${item.discount} تومان تخفیف
        </span>

      </div>

      <div class="flex items-center justify-end gap-1">

        <span class="text-lg font-bold text-blue-600">
          ${item.price}
        </span>

        <span class="text-xs text-gray-500">
          تومان
        </span>

      </div>

    </div>
  `;

  return product;
}

function startCountdown() {
  let countdown = document.getElementById("countdown");

  let hours = 33;
  let minutes = 58;
  let seconds = 22;

  setInterval(function () {
    seconds--;

    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }

    if (minutes < 0) {
      minutes = 59;
      hours--;
    }

    if (hours < 0) {
      hours = 24;
      minutes = 0;
      seconds = 0;
    }

    let showHours = hours.toString();
    let showMinutes = minutes.toString();
    let showSeconds = seconds.toString();

    if (showHours.length === 1) {
      showHours = "0" + showHours;
    }

    if (showMinutes.length === 1) {
      showMinutes = "0" + showMinutes;
    }

    if (showSeconds.length === 1) {
      showSeconds = "0" + showSeconds;
    }

    countdown.textContent = showHours + ":" + showMinutes + ":" + showSeconds;
  }, 1000);
}

export default Discounts;
