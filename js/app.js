(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.querySelectorAll("a").forEach((el => {
        el.addEventListener("click", (e => {
            e.preventDefault();
        }));
    }));
    const columnTitl = document.querySelectorAll(".data-tabs");
    const columnList = document.querySelectorAll(".data-open");
    const column = document.querySelectorAll(".column");
    if (document.documentElement.clientWidth < 479) {
        function openTabs(i = 0) {
            columnList[i].classList.remove("hidden");
            columnList[i].classList.add("show");
            columnTitl[i].classList.add("actev");
        }
        function closeTabs() {
            columnList.forEach((el => {
                el.classList.add("hidden");
                el.classList.remove("show");
            }));
            columnTitl.forEach((el => {
                el.classList.remove("actev");
            }));
        }
        closeTabs();
        openTabs();
        column.forEach((el => {
            el.addEventListener("click", (e => {
                if (e.target && e.target.classList.contains("data-tabs")) columnTitl.forEach(((el, i) => {
                    if (e.target == el) {
                        closeTabs();
                        openTabs(i);
                    }
                }));
            }));
        }));
    }
    window["FLS"] = true;
    isWebp();
    menuInit();
})();