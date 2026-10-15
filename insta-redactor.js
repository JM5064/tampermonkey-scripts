// ==UserScript==
// @name         Insta
// @namespace    http://tampermonkey.net/
// @version      2025-02-01
// @description  automatically removes any posts from posters you don't follow on instagram. 
// @author       You
// @match        https://www.instagram.com/
// @icon         https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png?20220518162235
// @grant        none
// ==/UserScript==

(function() {

    function removeContentFromArticle(article) {
        if (!article) {
            return
        }

        // Query all img and video elements for the given post
        let contentElements = article.children[0].children[1].querySelectorAll("img, video")

        // Remove all img and video elements, along with their parent elements
        contentElements.forEach(contentElement => {
            let contentParent = contentElement.parentNode
            contentElement.innerHTML = ""
            contentParent.innerHTML = ""
        })
    }

    async function removeContent() {
        // Keywords that indicate post is by a non-following account
        const keywords = ["Follow", "Sponsored", "Ad"]

        let articleElements = document.querySelectorAll("article")

        // Loop through every post
        articleElements.forEach(article => {
            let articleHeader = article.children[0].children[0]

            // Check if the post contains any of the keywords. If so, remove the post
            for (let keyword of keywords) {
                if (articleHeader.innerText.includes(keyword)) {
                    removeContentFromArticle(article)

                    // Set article header to blank to avoid removing content from same post twice
                    articleHeader.innerHTML = ""

                    break
                }
            }

            // Special case for if the post header contains " and "
            if (articleHeader.innerText.includes(" and ")) {
                // Find the options button
                let moreOptions = articleHeader.querySelector('[role="button"]')

                if (moreOptions) {
                    // Open options dialog
                    moreOptions.click()

                    let dialog = document.querySelector('[role="dialog"]')

                    if (dialog) {
                        // After opening dialog, accounts you don't follow will have a "Not interested" button
                        if (dialog.innerText.includes("Not interested")) {
                            removeContentFromArticle(article)

                            articleHeader.innerHTML = ""
                        } else {
                            // Replace header of checked posts to avoid checking again
                            articleHeader.innerHTML = articleHeader.innerHTML.replaceAll("and", "& ")
                        }
                    }

                    // Close dialog
                    let dialogButtons = dialog.querySelectorAll("button")
                    let cancelButton = dialogButtons[dialogButtons.length-1]
                    cancelButton.click()
                }

            }
        })
    }

    removeContent()

    setInterval(removeContent, 750)

})();


