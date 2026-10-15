// ==UserScript==
// @name         redirect
// @namespace    http://tampermonkey.net/
// @version      2026-10-15
// @description  redirect a website
// @author       You
// @match        
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("hello");

    window.location.replace('https://google.com/');
})();