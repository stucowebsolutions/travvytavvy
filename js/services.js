/* =========================================================
   SERVICES PAGE INTERACTIONS
   The Travvy Tavvy
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /*
   * -------------------------------------------------------
   * INCLUDED SERVICE CARDS
   *
   * Desktop:
   *   Hover reveals details.
   *
   * Mobile / touch:
   *   Click toggles details.
   *
   * Only one card is expanded at a time on touch devices.
   * -------------------------------------------------------
   */

  const includedCards =
    document.querySelectorAll(".included-card");

  const isTouchDevice =
    window.matchMedia("(hover: none)").matches;

  if (includedCards.length) {

    includedCards.forEach(card => {

      card.addEventListener("click", () => {

        if (!isTouchDevice) {
          return;
        }

        const wasOpen =
          card.classList.contains("is-open");

        includedCards.forEach(otherCard => {
          otherCard.classList.remove("is-open");
        });

        if (!wasOpen) {
          card.classList.add("is-open");
        }

      });

    });

  }


  /*
   * -------------------------------------------------------
   * EXPERIENCE SELECTOR
   *
   * Weddings
   * Corporate & Community
   * Private Events
   * Mocktails
   *
   * The HTML remains fully readable without JS because
   * every panel exists in the document.
   * -------------------------------------------------------
   */

  const experienceTabs =
    document.querySelectorAll(".experience-tab");

  const experiencePanels =
    document.querySelectorAll(".experience-panel");

  if (
    experienceTabs.length &&
    experiencePanels.length
  ) {

    experienceTabs.forEach(tab => {

      tab.addEventListener("click", () => {

        const target =
          tab.dataset.experience;

        /*
         * Update tab state
         */
        experienceTabs.forEach(otherTab => {

          const isActive =
            otherTab === tab;

          otherTab.classList.toggle(
            "is-active",
            isActive
          );

          otherTab.setAttribute(
            "aria-selected",
            String(isActive)
          );

        });


        /*
         * Update content
         */
        experiencePanels.forEach(panel => {

          const isTarget =
            panel.dataset.panel === target;

          if (isTarget) {

            panel.hidden = false;

            /*
             * Restart the entrance animation
             * when switching categories.
             */
            panel.style.animation = "none";

            requestAnimationFrame(() => {
              panel.style.animation = "";
            });

          } else {

            panel.hidden = true;

          }

        });

      });

    });

  }


  /*
   * -------------------------------------------------------
   * PACKAGE CARD EMPHASIS
   *
   * When the user hovers a package, slightly de-emphasize
   * the other packages. This makes the three-tier route
   * feel intentional without becoming a carousel.
   * -------------------------------------------------------
   */

  const packageCards =
    document.querySelectorAll(".package-card");

  if (packageCards.length) {

    packageCards.forEach(card => {

      card.addEventListener("mouseenter", () => {

        packageCards.forEach(otherCard => {

          if (otherCard !== card) {
            otherCard.style.filter =
              "brightness(.82)";
          }

        });

      });


      card.addEventListener("mouseleave", () => {

        packageCards.forEach(otherCard => {
          otherCard.style.filter = "";
        });

      });

    });

  }


  /*
   * -------------------------------------------------------
   * KEYBOARD ACCESSIBILITY
   *
   * Allow the experience selector to move between tabs
   * using ArrowLeft / ArrowRight.
   * -------------------------------------------------------
   */

  experienceTabs.forEach((tab, index) => {

    tab.addEventListener("keydown", event => {

      let newIndex = null;

      if (event.key === "ArrowRight") {
        newIndex =
          (index + 1) % experienceTabs.length;
      }

      if (event.key === "ArrowLeft") {
        newIndex =
          (index - 1 + experienceTabs.length)
          % experienceTabs.length;
      }

      if (newIndex !== null) {

        event.preventDefault();

        experienceTabs[newIndex].focus();
        experienceTabs[newIndex].click();

      }

    });

  });

});
