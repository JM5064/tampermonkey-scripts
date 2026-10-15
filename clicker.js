// ==UserScript==
// @name         click
// @namespace    http://tampermonkey.net/
// @version      2025-02-01
// @description  try to take over the world!
// @author       You
// @match        
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(async function() {
    async function sleep(ms) {
        await new Promise(r => setTimeout(r, ms));
    }

    async function getElement(query) {
        let attempts = 3;
        for (let i = 0; i < attempts; i++) {
            let element = document.querySelector(query);

            if (element != null) {
                return element;
            }

            await sleep(50);
        }

        return null;
    }

    while (true) {
      for (let i = 0; i < 25; i++) {
          await sleep(300);

          let answer = await getElement("#PDI_answer69331340");
          if (answer != null) {
              answer.click();
          }

          await sleep(100);
          let voteButton = await getElement("button");
          if (voteButton != null) {
              voteButton.click();
          }

          await sleep(1750);
          let reload = await getElement("a");
          if (reload != null) {
              reload.click();
          }
      }

      await sleep(60000);
  }
})();