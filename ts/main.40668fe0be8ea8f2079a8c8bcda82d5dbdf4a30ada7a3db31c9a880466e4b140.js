(() => {
  // ns-hugo-imp:/Users/lizi/ionfeather/ionfeather-log/assets/ts/gallery.ts
  var StackGallery = class _StackGallery {
    constructor(container) {
      _StackGallery.createGallery(container);
    }
    static createGallery(container) {
      const images = container.querySelectorAll("img.gallery-image");
      for (const img of Array.from(images)) {
        const paragraph = img.closest("p");
        if (!paragraph || !container.contains(paragraph)) continue;
        if (paragraph.textContent.trim() == "") {
          paragraph.classList.add("no-text");
        }
        let isNewLineImage = paragraph.classList.contains("no-text");
        if (!isNewLineImage) continue;
        const hasLink = img.parentElement.tagName == "A";
        let el = img;
        const figure = document.createElement("figure");
        figure.style.setProperty("flex-grow", img.getAttribute("data-flex-grow") || "1");
        figure.style.setProperty("flex-basis", img.getAttribute("data-flex-basis") || "0");
        if (hasLink) {
          el = img.parentElement;
        }
        el.parentElement.insertBefore(figure, el);
        figure.appendChild(el);
        if (img.hasAttribute("alt")) {
          const figcaption = document.createElement("figcaption");
          figcaption.innerText = img.getAttribute("alt");
          figure.appendChild(figcaption);
        }
        if (!hasLink) {
          figure.className = "gallery-image";
          const a = document.createElement("a");
          a.href = img.getAttribute("data-original") || img.src;
          a.className = "glightbox";
          img.parentNode.insertBefore(a, img);
          a.appendChild(img);
        } else {
          const a = el;
          a.href = img.getAttribute("data-original") || a.href;
          a.classList.add("glightbox");
        }
      }
      const figuresEl = container.querySelectorAll("figure.gallery-image");
      let currentGallery = [];
      for (const figure of figuresEl) {
        if (!currentGallery.length) {
          currentGallery = [figure];
        } else if (figure.previousElementSibling === currentGallery[currentGallery.length - 1]) {
          currentGallery.push(figure);
        } else if (currentGallery.length) {
          _StackGallery.wrap(currentGallery);
          currentGallery = [figure];
        }
      }
      if (currentGallery.length > 0) {
        _StackGallery.wrap(currentGallery);
      }
      document.dispatchEvent(new CustomEvent("stack:gallery-ready"));
    }
    static wrap(figures) {
      const galleryContainer = document.createElement("div");
      galleryContainer.className = "gallery";
      const parentNode = figures[0].parentNode, first = figures[0];
      parentNode.insertBefore(galleryContainer, first);
      for (const figure of figures) {
        galleryContainer.appendChild(figure);
      }
    }
  };
  var gallery_default = StackGallery;

  // ns-hugo-imp:/Users/lizi/ionfeather/ionfeather-log/themes/hugo-theme-stack/assets/ts/color.ts
  var colorsCache = {};
  if (localStorage.hasOwnProperty("StackColorsCache")) {
    try {
      colorsCache = JSON.parse(localStorage.getItem("StackColorsCache"));
    } catch (e) {
      colorsCache = {};
    }
  }
  async function getColor(key, hash, imageURL) {
    if (!key) {
      return await Vibrant.from(imageURL).getPalette();
    }
    if (!colorsCache.hasOwnProperty(key) || colorsCache[key].hash !== hash) {
      const palette = await Vibrant.from(imageURL).getPalette();
      colorsCache[key] = {
        hash,
        Vibrant: {
          hex: palette.Vibrant.hex,
          rgb: palette.Vibrant.rgb,
          bodyTextColor: palette.Vibrant.bodyTextColor
        },
        DarkMuted: {
          hex: palette.DarkMuted.hex,
          rgb: palette.DarkMuted.rgb,
          bodyTextColor: palette.DarkMuted.bodyTextColor
        }
      };
      localStorage.setItem("StackColorsCache", JSON.stringify(colorsCache));
    }
    return colorsCache[key];
  }

  // ns-hugo-imp:/Users/lizi/ionfeather/ionfeather-log/themes/hugo-theme-stack/assets/ts/menu.ts
  var slideUp = (target, duration = 500) => {
    target.classList.add("transiting");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";
    window.setTimeout(() => {
      target.classList.remove("show");
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("transiting");
    }, duration);
  };
  var slideDown = (target, duration = 500) => {
    target.classList.add("transiting");
    target.style.removeProperty("display");
    target.classList.add("show");
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = "0";
    target.style.paddingTop = "0";
    target.style.paddingBottom = "0";
    target.style.marginTop = "0";
    target.style.marginBottom = "0";
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("transiting");
    }, duration);
  };
  var slideToggle = (target, duration = 500) => {
    if (window.getComputedStyle(target).display === "none") {
      return slideDown(target, duration);
    } else {
      return slideUp(target, duration);
    }
  };
  function menu_default() {
    const toggleMenu = document.getElementById("toggle-menu");
    if (toggleMenu) {
      toggleMenu.addEventListener("click", () => {
        if (document.getElementById("main-menu").classList.contains("transiting")) return;
        document.body.classList.toggle("show-menu");
        slideToggle(document.getElementById("main-menu"), 300);
        toggleMenu.classList.toggle("is-active");
      });
    }
  }

  // ns-hugo-imp:/Users/lizi/ionfeather/ionfeather-log/themes/hugo-theme-stack/assets/ts/createElement.ts
  function createElement(tag, attrs, children) {
    var element = document.createElement(tag);
    for (let name in attrs) {
      if (name && attrs.hasOwnProperty(name)) {
        let value = attrs[name];
        if (name == "dangerouslySetInnerHTML") {
          element.innerHTML = value.__html;
        } else if (value === true) {
          element.setAttribute(name, name);
        } else if (value !== false && value != null) {
          element.setAttribute(name, value.toString());
        }
      }
    }
    for (let i = 2; i < arguments.length; i++) {
      let child = arguments[i];
      if (child) {
        element.appendChild(
          child.nodeType == null ? document.createTextNode(child.toString()) : child
        );
      }
    }
    return element;
  }
  var createElement_default = createElement;

  // ns-hugo-imp:/Users/lizi/ionfeather/ionfeather-log/themes/hugo-theme-stack/assets/ts/colorScheme.ts
  var StackColorScheme = class {
    localStorageKey = "StackColorScheme";
    currentScheme;
    systemPreferScheme;
    transitionTimer;
    constructor(toggleEl) {
      this.bindMatchMedia();
      this.currentScheme = this.getSavedScheme();
      if (window.matchMedia("(prefers-color-scheme: dark)").matches === true)
        this.systemPreferScheme = "dark";
      else
        this.systemPreferScheme = "light";
      this.dispatchEvent(document.documentElement.dataset.scheme);
      if (toggleEl)
        this.bindClick(toggleEl);
    }
    saveScheme() {
      localStorage.setItem(this.localStorageKey, this.currentScheme);
    }
    bindClick(toggleEl) {
      toggleEl.addEventListener("click", (e) => {
        if (this.isDark()) {
          this.currentScheme = "light";
        } else {
          this.currentScheme = "dark";
        }
        this.setBodyClass();
        if (this.currentScheme == this.systemPreferScheme) {
          this.currentScheme = "auto";
        }
        this.saveScheme();
      });
    }
    isDark() {
      return this.currentScheme == "dark" || this.currentScheme == "auto" && this.systemPreferScheme == "dark";
    }
    dispatchEvent(colorScheme) {
      const event = new CustomEvent("onColorSchemeChange", {
        detail: colorScheme
      });
      window.dispatchEvent(event);
    }
    setBodyClass() {
      document.documentElement.classList.add("color-scheme-transition");
      if (this.isDark()) {
        document.documentElement.dataset.scheme = "dark";
      } else {
        document.documentElement.dataset.scheme = "light";
      }
      this.dispatchEvent(document.documentElement.dataset.scheme);
      window.clearTimeout(this.transitionTimer);
      this.transitionTimer = window.setTimeout(() => {
        document.documentElement.classList.remove("color-scheme-transition");
      }, 180);
    }
    getSavedScheme() {
      const savedScheme = localStorage.getItem(this.localStorageKey);
      if (savedScheme == "light" || savedScheme == "dark" || savedScheme == "auto") return savedScheme;
      else return "auto";
    }
    bindMatchMedia() {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (e.matches) {
          this.systemPreferScheme = "dark";
        } else {
          this.systemPreferScheme = "light";
        }
        this.setBodyClass();
      });
    }
  };
  var colorScheme_default = StackColorScheme;

  // ns-hugo-imp:/Users/lizi/ionfeather/ionfeather-log/assets/ts/scrollspy.ts
  function debounced(func) {
    let timeout;
    return () => {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }
      timeout = window.requestAnimationFrame(() => func());
    };
  }
  var headersQuery = ".article-content h1[id], .article-content h2[id], .article-content h3[id], .article-content h4[id], .article-content h5[id], .article-content h6[id]";
  var tocQuery = "#TableOfContents";
  var navigationQuery = "#TableOfContents li";
  var activeClass = "active-class";
  var collapsedClass = "toc-collapsed";
  function setupCollapsibleToc() {
    const toc = document.querySelector(".widget--toc.toc-collapsible #TableOfContents");
    if (!toc) return void 0;
    toc.querySelectorAll("li").forEach((li) => {
      const sublist = li.querySelector(":scope > ol, :scope > ul");
      if (!sublist) return;
      li.classList.add(collapsedClass);
      const toggle = document.createElement("button");
      toggle.className = "toc-toggle";
      toggle.type = "button";
      toggle.setAttribute("aria-label", "\u5C55\u5F00/\u6298\u53E0");
      toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        li.classList.toggle(collapsedClass);
      });
      li.insertBefore(toggle, li.firstChild);
      const link = li.querySelector(":scope > a");
      if (link) {
        link.addEventListener("click", () => li.classList.toggle(collapsedClass));
      }
    });
    return (tocElement) => {
      let parent = tocElement.parentElement;
      while (parent && parent !== toc) {
        if (parent.tagName === "LI") {
          parent.classList.remove(collapsedClass);
        }
        parent = parent.parentElement;
      }
    };
  }
  function scrollToTocElement(tocElement, scrollableNavigation) {
    const link = tocElement.querySelector("a");
    if (!link) return;
    const textHeight = link.offsetHeight;
    const tocRect = tocElement.getBoundingClientRect();
    const containerRect = scrollableNavigation.getBoundingClientRect();
    let scrollTop = tocRect.top - containerRect.top + scrollableNavigation.scrollTop - scrollableNavigation.offsetHeight / 2 + textHeight / 2;
    if (scrollTop < 0) {
      scrollTop = 0;
    }
    scrollableNavigation.scrollTo({ top: scrollTop, behavior: "auto" });
  }
  function buildIdToNavigationElementMap(navigation) {
    const sectionLinkRef = {};
    navigation.forEach((navigationElement) => {
      const link = navigationElement.querySelector("a");
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        sectionLinkRef[href.slice(1)] = navigationElement;
      }
    });
    return sectionLinkRef;
  }
  function computeOffsets(headers) {
    let sectionsOffsets = [];
    headers.forEach((header) => {
      const rect = header.getBoundingClientRect();
      sectionsOffsets.push({ id: header.id, offset: rect.top + window.scrollY });
    });
    sectionsOffsets.sort((a, b) => a.offset - b.offset);
    return sectionsOffsets;
  }
  function setupScrollspy() {
    let headers = document.querySelectorAll(headersQuery);
    if (!headers) {
      console.warn("No header matched query", headers);
      return;
    }
    let scrollableNavigation = document.querySelector(tocQuery);
    if (!scrollableNavigation) {
      console.warn("No toc matched query", tocQuery);
      return;
    }
    let navigation = document.querySelectorAll(navigationQuery);
    if (!navigation) {
      console.warn("No navigation matched query", navigationQuery);
      return;
    }
    let sectionsOffsets = computeOffsets(headers);
    let tocHovered = false;
    scrollableNavigation.addEventListener("mouseenter", debounced(() => tocHovered = true));
    scrollableNavigation.addEventListener("mouseleave", debounced(() => tocHovered = false));
    let activeSectionLink;
    let idToNavigationElement = buildIdToNavigationElementMap(navigation);
    const expandTocAncestors = setupCollapsibleToc();
    function scrollHandler() {
      let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
      let newActiveSection;
      sectionsOffsets.forEach((section) => {
        if (scrollPosition >= section.offset - 20) {
          newActiveSection = document.getElementById(section.id);
        }
      });
      let newActiveSectionLink;
      if (newActiveSection) {
        newActiveSectionLink = idToNavigationElement[newActiveSection.id];
      }
      if (newActiveSection && !newActiveSectionLink) {
        console.debug("No link found for section", newActiveSection);
      } else if (newActiveSectionLink !== activeSectionLink) {
        if (activeSectionLink)
          activeSectionLink.classList.remove(activeClass);
        if (newActiveSectionLink) {
          newActiveSectionLink.classList.add(activeClass);
          if (expandTocAncestors)
            expandTocAncestors(newActiveSectionLink);
          if (!tocHovered) {
            scrollToTocElement(newActiveSectionLink, scrollableNavigation);
          }
        }
        activeSectionLink = newActiveSectionLink;
      }
    }
    window.addEventListener("scroll", debounced(scrollHandler));
    function resizeHandler() {
      sectionsOffsets = computeOffsets(headers);
      scrollHandler();
    }
    window.addEventListener("resize", debounced(resizeHandler));
    const articleContent = document.querySelector(".article-content");
    if (articleContent && typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(debounced(resizeHandler));
      ro.observe(articleContent);
    }
  }

  // ns-hugo-imp:/Users/lizi/ionfeather/ionfeather-log/assets/ts/smoothAnchors.ts
  var anchorLinksQuery = "a[href]";
  function setupSmoothAnchors() {
    document.querySelectorAll(anchorLinksQuery).forEach((aElement) => {
      let href = aElement.getAttribute("href");
      if (!href.startsWith("#")) {
        return;
      }
      aElement.addEventListener("click", (clickEvent) => {
        clickEvent.preventDefault();
        const targetId = decodeURI(aElement.getAttribute("href").substring(1)), target = document.getElementById(targetId), offset = target.getBoundingClientRect().top - document.documentElement.getBoundingClientRect().top;
        window.history.pushState({}, "", aElement.getAttribute("href"));
        scrollTo({
          top: offset,
          behavior: "instant"
        });
      });
    });
  }

  // ns-hugo-imp:/Users/lizi/ionfeather/ionfeather-log/assets/ts/codeHeader.ts
  var ALL_STATES = ["code-closed", "code-minimized", "code-expanded"];
  var CONTAINER_DX = -0.8;
  var CONTAINER_DY = 2.2;
  var GLYPHS = {
    red: '<svg viewBox="0 0 16 16" width="16" height="16"><path d="M5.5 5.5 L10.5 10.5 M10.5 5.5 L5.5 10.5" stroke="rgba(0,0,0,0.6)" stroke-width="1.6" stroke-linecap="round" fill="none"/></svg>',
    yellow: '<svg viewBox="0 0 16 16" width="16" height="16"><path d="M5 8 H11" stroke="rgba(0,0,0,0.6)" stroke-width="1.6" stroke-linecap="round" fill="none"/></svg>',
    // macOS 全屏图标：两个等腰直角三角形箭头（与 × 尺寸相当）
    // 默认直角朝外（左上+右下，展开）；已展开时换成朝内的反向三角（收缩）
    greenExpand: '<svg class="glyph-expand" viewBox="0 0 16 16" width="16" height="16"><path d="M5.5 5.5 H9.5 L5.5 9.5 Z M10.5 10.5 H6.5 L10.5 6.5 Z" fill="rgba(0,0,0,0.62)"/></svg>',
    greenContract: '<svg class="glyph-contract" viewBox="0 0 16 16" width="16" height="16"><path d="M3.5 7.5 L7.5 3.5 V7.5 Z M12.5 8.5 L8.5 12.5 V8.5 Z" fill="rgba(0,0,0,0.62)"/></svg>'
  };
  function setupCodeHeader() {
    const highlights = Array.from(document.querySelectorAll(".article-content div.highlight"));
    if (!highlights.length) return;
    highlights.forEach((highlight) => {
      const setState = (state) => {
        const wasOn = highlight.classList.contains(state);
        highlight.classList.remove(...ALL_STATES);
        if (!wasOn) {
          highlight.classList.add(state);
        }
      };
      const container = document.createElement("div");
      container.className = "code-dots";
      const dots = [
        { cls: "code-dot-red", title: "\u6298\u53E0\u4EE3\u7801\u5757", state: "code-closed", glyph: GLYPHS.red },
        { cls: "code-dot-yellow", title: "\u6700\u5C0F\u5316\u4E3A\u9884\u89C8", state: "code-minimized", glyph: GLYPHS.yellow },
        { cls: "code-dot-green", title: "\u5B8C\u6574\u5C55\u5F00", state: "code-expanded", glyph: GLYPHS.greenExpand + GLYPHS.greenContract }
      ];
      dots.forEach(({ cls, title, state, glyph }) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `code-dot ${cls}`;
        btn.title = title;
        btn.setAttribute("aria-label", title);
        btn.innerHTML = glyph;
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          setState(state);
        });
        container.appendChild(btn);
      });
      highlight.appendChild(container);
      const wrapBtn = document.createElement("button");
      wrapBtn.type = "button";
      wrapBtn.className = "codeWrapButton";
      wrapBtn.textContent = "\u21A9";
      wrapBtn.title = "\u81EA\u52A8\u6362\u884C";
      wrapBtn.setAttribute("aria-label", "\u81EA\u52A8\u6362\u884C");
      wrapBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const on = highlight.classList.toggle("code-wrapped");
        wrapBtn.classList.toggle("active", on);
      });
      highlight.appendChild(wrapBtn);
    });
    const updatePositions = () => {
      highlights.forEach((highlight) => {
        const style = getComputedStyle(highlight);
        const padLeft = parseFloat(style.paddingLeft) || 0;
        const padTop = parseFloat(style.paddingTop) || 0;
        const container = highlight.querySelector(".code-dots");
        if (container) {
          container.style.left = `${padLeft + CONTAINER_DX}px`;
          container.style.top = `${padTop + CONTAINER_DY}px`;
        }
      });
    };
    updatePositions();
    window.addEventListener("resize", updatePositions);
  }

  // <stdin>
  var Stack = {
    init: () => {
      menu_default();
      const articleContent = document.querySelector(".article-content");
      if (articleContent) {
        new gallery_default(articleContent);
        setupSmoothAnchors();
        setupScrollspy();
        setupCodeHeader();
      }
      const articleTile = document.querySelector(".article-list--tile");
      if (articleTile) {
        let observer = new IntersectionObserver(async (entries, observer2) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            observer2.unobserve(entry.target);
            const articles = entry.target.querySelectorAll("article.has-image");
            articles.forEach(async (articles2) => {
              const image = articles2.querySelector("img"), imageURL = image.src, key = image.getAttribute("data-key"), hash = image.getAttribute("data-hash"), articleDetails = articles2.querySelector(".article-details");
              const colors = await getColor(key, hash, imageURL);
              articleDetails.style.background = `
                        linear-gradient(0deg, 
                            rgba(${colors.DarkMuted.rgb[0]}, ${colors.DarkMuted.rgb[1]}, ${colors.DarkMuted.rgb[2]}, 0.5) 0%, 
                            rgba(${colors.Vibrant.rgb[0]}, ${colors.Vibrant.rgb[1]}, ${colors.Vibrant.rgb[2]}, 0.75) 100%)`;
            });
          });
        });
        observer.observe(articleTile);
      }
      const highlights = document.querySelectorAll(".article-content div.highlight");
      const copyText = `Copy`, copiedText = `Copied!`;
      highlights.forEach((highlight) => {
        const copyButton = document.createElement("button");
        copyButton.innerHTML = copyText;
        copyButton.classList.add("copyCodeButton");
        highlight.appendChild(copyButton);
        const codeBlock = highlight.querySelector("code[data-lang]");
        if (!codeBlock) return;
        copyButton.addEventListener("click", () => {
          navigator.clipboard.writeText(codeBlock.textContent).then(() => {
            copyButton.textContent = copiedText;
            copyButton.classList.add("copied");
            highlight.classList.add("highlight-copied");
            setTimeout(() => {
              copyButton.textContent = copyText;
              copyButton.classList.remove("copied");
              highlight.classList.remove("highlight-copied");
            }, 1e3);
          }).catch((err) => {
            alert(err);
            console.log("Something went wrong", err);
          });
        });
      });
      new colorScheme_default(document.getElementById("dark-mode-toggle"));
    }
  };
  window.addEventListener("load", () => {
    setTimeout(function() {
      Stack.init();
    }, 0);
  });
  window.Stack = Stack;
  window.createElement = createElement_default;
})();
/*!
*   Hugo Theme Stack
*
*   @author: Jimmy Cai
*   @website: https://jimmycai.com
*   @link: https://github.com/CaiJimmy/hugo-theme-stack
*
*   Site override of themes/hugo-theme-stack/assets/ts/main.ts:
*   adds setupCodeHeader (functional macOS traffic lights on code blocks).
*/
