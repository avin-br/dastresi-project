function Header() {
  let mobileMenuButton = document.getElementById("mobile-menu-button");

  let mobileSidebar = document.getElementById("mobile-sidebar");

  let mobileOverlay = document.getElementById("mobile-overlay");

  mobileMenuButton.addEventListener("click", function () {
    mobileSidebar.classList.remove("translate-x-full");

    mobileOverlay.classList.remove("hidden");
  });

  mobileOverlay.addEventListener("click", function () {
    mobileSidebar.classList.add("translate-x-full");

    mobileOverlay.classList.add("hidden");
  });

  let mobileMenuList = document.getElementById("mobile-menu-list");

  let desktopOverlay = document.getElementById("desktop-overlay");

  let desktopMenuItems = document.querySelectorAll(".desktop-menu-item");

  desktopMenuItems.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      if (
        item.querySelector("#accessories-menu") ||
        item.querySelector("#cable-menu")
      ) {
        desktopOverlay.classList.remove("hidden");
      }
    });

    item.addEventListener("mouseleave", function () {
      desktopOverlay.classList.add("hidden");
    });
  });

  fetch("http://localhost:3000/menu")
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      let accessoriesMenu = document.getElementById("accessories-menu");

      let cableMenu = document.getElementById("cable-menu");

      function createDesktopMenu(items, parent) {
        items.forEach(function (item) {
          if (item.children) {
            let box = document.createElement("div");

            box.classList.add("relative", "w-full");

            let link = document.createElement("a");

            link.href = "#";

            link.classList.add(
              "relative",
              "flex",
              "items-center",
              "w-full",
              "py-3",
              "px-3",
              "text-xs",
              "text-gray-400",
              "whitespace-nowrap",
              "hover:bg-[#f5f5f5]",
              "hover:text-[#172554]",
            );

            let title = document.createElement("span");

            title.innerText = item.title;

            title.classList.add("block", "w-full", "text-right");

            let arrow = document.createElement("span");

            arrow.innerText = ">";

            arrow.classList.add(
              "absolute",
              "left-3",
              "top-1/2",
              "-translate-y-1/2",
              "text-lg",
            );

            link.append(title);

            link.append(arrow);

            let subMenu = document.createElement("div");

            subMenu.classList.add(
              "hidden",
              "flex-col",
              "absolute",
              "right-full",
              "top-0",
              "bg-white",
              "shadow-lg",
              "z-50",
              "w-[230px]",
              "p-0",
              "overflow-hidden",
            );

            if (parent === cableMenu) {
              subMenu.classList.add("rounded-bl-md");
            } else {
              subMenu.classList.add("rounded-l-md");
            }

            item.children.slice(0, 5).forEach(function (child) {
              if (typeof child !== "string" && child.children) {
                let childBox = document.createElement("div");

                childBox.classList.add("relative", "w-full");

                let childLink = document.createElement("a");

                childLink.href = "#";

                childLink.classList.add(
                  "relative",
                  "flex",
                  "items-center",
                  "w-full",
                  "h-10",
                  "px-3",
                  "text-xs",
                  "text-gray-400",
                  "whitespace-nowrap",
                  "hover:bg-[#f5f5f5]",
                  "hover:text-[#172554]",
                );

                let childTitle = document.createElement("span");

                childTitle.innerText = child.title;

                childTitle.classList.add("block", "w-full", "text-right");

                let childArrow = document.createElement("span");

                childArrow.innerText = ">";

                childArrow.classList.add(
                  "absolute",
                  "left-3",
                  "top-1/2",
                  "-translate-y-1/2",
                  "text-lg",
                );

                childLink.append(childTitle);

                childLink.append(childArrow);

                let childSubMenu = document.createElement("div");

                childSubMenu.classList.add(
                  "hidden",
                  "flex-col",
                  "absolute",
                  "right-full",
                  "top-0",
                  "bg-white",
                  "shadow-lg",
                  "z-50",
                  "w-[220px]",
                  "p-0",
                  "rounded-l-md",
                  "overflow-hidden",
                );

                child.children.slice(0, 5).forEach(function (subItem) {
                  let subLink = document.createElement("a");

                  subLink.innerText = subItem;

                  subLink.href = "#";

                  subLink.classList.add(
                    "block",
                    "w-full",
                    "h-10",
                    "px-3",
                    "text-xs",
                    "leading-10",
                    "text-gray-400",
                    "text-right",
                    "whitespace-nowrap",
                    "hover:bg-[#f5f5f5]",
                    "hover:text-[#172554]",
                  );

                  childSubMenu.append(subLink);
                });

                childBox.addEventListener("mouseenter", function () {
                  childSubMenu.classList.remove("hidden");

                  childSubMenu.classList.add("flex");
                });

                childBox.addEventListener("mouseleave", function () {
                  childSubMenu.classList.add("hidden");

                  childSubMenu.classList.remove("flex");
                });

                childBox.append(childLink);

                childBox.append(childSubMenu);

                subMenu.append(childBox);
              } else {
                let childLink = document.createElement("a");

                if (typeof child === "string") {
                  childLink.innerText = child;
                } else {
                  childLink.innerText = child.title;
                }

                childLink.href = "#";

                childLink.classList.add(
                  "block",
                  "w-full",
                  "h-10",
                  "px-3",
                  "text-xs",
                  "leading-10",
                  "text-gray-400",
                  "text-right",
                  "whitespace-nowrap",
                  "hover:bg-[#f5f5f5]",
                  "hover:text-[#172554]",
                );

                subMenu.append(childLink);
              }
            });

            box.addEventListener("mouseenter", function () {
              subMenu.classList.remove("hidden");

              subMenu.classList.add("flex");
            });

            box.addEventListener("mouseleave", function () {
              subMenu.classList.add("hidden");

              subMenu.classList.remove("flex");
            });

            box.append(link);

            box.append(subMenu);

            parent.append(box);
          } else {
            let link = document.createElement("a");

            link.innerText = item.title;

            link.href = "#";

            link.classList.add(
              "block",
              "w-full",
              "h-10",
              "px-3",
              "text-xs",
              "leading-10",
              "text-gray-400",
              "text-right",
              "whitespace-nowrap",
              "hover:bg-[#f5f5f5]",
              "hover:text-[#172554]",
            );

            parent.append(link);
          }
        });
      }

      createDesktopMenu(data[1].children, accessoriesMenu);

      createDesktopMenu(data[2].children, cableMenu);

      data.forEach(function (item) {
        if (item.title === "خانه") {
          return;
        }

        let menuItem = document.createElement("div");

        menuItem.classList.add("border-b", "border-gray-200");

        if (item.children) {
          let button = document.createElement("div");

          button.classList.add(
            "flex",
            "items-center",
            "justify-between",
            "py-4",
            "cursor-pointer",
          );

          let title = document.createElement("span");

          title.innerText = item.title;

          let arrow = document.createElement("span");

          arrow.innerText = ">";

          arrow.classList.add("text-xl", "transition-transform");

          button.append(title);

          button.append(arrow);

          let subMenu = document.createElement("div");

          subMenu.classList.add("hidden", "pr-4", "pb-3");

          item.children.forEach(function (child) {
            if (child.children) {
              let childBox = document.createElement("div");

              let childButton = document.createElement("div");

              childButton.classList.add(
                "flex",
                "items-center",
                "justify-between",
                "py-3",
                "cursor-pointer",
              );

              let childTitle = document.createElement("span");

              childTitle.innerText = child.title;

              let childArrow = document.createElement("span");

              childArrow.innerText = ">";

              childArrow.classList.add("text-lg");

              childButton.append(childTitle);

              childButton.append(childArrow);

              let childSubMenu = document.createElement("div");

              childSubMenu.classList.add("hidden", "pr-4");

              child.children.slice(0, 5).forEach(function (subItem) {
                let link = document.createElement("a");

                link.innerText = subItem;

                link.href = "#";

                link.classList.add("block", "text-sm", "text-gray-500", "py-2");

                childSubMenu.append(link);
              });

              childButton.addEventListener("click", function () {
                childSubMenu.classList.toggle("hidden");
              });

              childBox.append(childButton);

              childBox.append(childSubMenu);

              subMenu.append(childBox);
            } else {
              let link = document.createElement("a");

              link.innerText = child.title;

              link.href = "#";

              link.classList.add("block", "py-3", "text-sm");

              subMenu.append(link);
            }
          });

          button.addEventListener("click", function () {
            subMenu.classList.toggle("hidden");
          });

          menuItem.append(button);

          menuItem.append(subMenu);
        } else {
          let link = document.createElement("a");

          link.innerText = item.title;

          link.href = "#";

          link.classList.add("block", "py-4");

          menuItem.append(link);
        }

        mobileMenuList.append(menuItem);
      });
    })

    .catch(function (error) {
      console.log(error);
    });

  let mobileProfileButton = document.getElementById("mobile-profile-button");

  let mobileProfileMenu = document.getElementById("mobile-profile-menu");

  mobileProfileButton.addEventListener("click", function () {
    mobileProfileMenu.classList.toggle("hidden");
  });
}

export default Header;
