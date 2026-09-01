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
    if (!toc) return;
    toc.querySelectorAll("li").forEach((li) => {
      const sublist = li.querySelector(":scope > ol, :scope > ul");
      if (!sublist) return;
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
        link.addEventListener("click", () => li.classList.remove(collapsedClass));
      }
    });
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
    setupCollapsibleToc();
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
    greenContract: '<svg class="glyph-contract" viewBox="0 0 16 16" width="16" height="16"><path d="M3.5 7.5 L7.5 3.5 V7.5 Z M12.5 8.5 L8.5 12.5 V8.5 Z" fill="rgba(0,0,0,0.62)"/></svg>',
    // 换行按钮双态：默认显示「换行」图标，已换行时换成「不换行」图标
    wrap: '<svg class="glyph-wrap" viewBox="0 0 1024 1024" width="12" height="12"><path d="M358.4 160.64h175.36a300.8 300.8 0 1 1 0 600.96h-49.92v101.76a35.2 35.2 0 0 1-57.6 26.88l-184.96-151.68a33.92 33.92 0 0 1-12.8-26.88 35.2 35.2 0 0 1 12.8-27.52l184.96-151.04a33.92 33.92 0 0 1 37.12-4.48 35.2 35.2 0 0 1 20.48 31.36v101.76h49.92a200.96 200.96 0 1 0 0-401.28H308.48A24.96 24.96 0 0 1 290.56 256a28.16 28.16 0 0 1-7.68-17.92V185.6a25.6 25.6 0 0 1 7.68-17.92 24.96 24.96 0 0 1 17.92-7.04zM59.52 1012.48a32 32 0 0 1-32-32V43.52a32 32 0 0 1 32-32 32 32 0 0 1 32 32v936.96a32 32 0 0 1-32 32zM964.48 1012.48a32 32 0 0 1-32-32V43.52a32 32 0 1 1 64 0v936.96a32 32 0 0 1-32 32z" fill="currentColor"/></svg>',
    unwrap: '<svg class="glyph-unwrap" viewBox="0 0 1024 1024" width="12" height="12"><path d="M117.873778 89.315556c5.688889 0 11.093333 2.332444 15.075555 6.656 3.982222 4.266667 6.257778 10.126222 6.257778 16.156444v796.046222c0 6.087111-2.275556 11.889778-6.257778 16.156445a20.650667 20.650667 0 0 1-15.075555 6.712889h-30.151111a20.650667 20.650667 0 0 1-15.075556-6.712889 23.722667 23.722667 0 0 1-6.257778-16.156445V112.071111c0-6.030222 2.275556-11.889778 6.257778-16.156444a20.650667 20.650667 0 0 1 15.075556-6.712889h30.151111z m509.838222 564.167111l0.056889 250.026666a21.731556 21.731556 0 0 1-7.509333 16.213334 27.306667 27.306667 0 0 1-18.090667 6.712889h-34.076445a27.306667 27.306667 0 0 1-18.147555-6.712889 21.731556 21.731556 0 0 1-7.509333-16.213334v-250.026666h85.333333zM802.133333 323.697778c4.551111 3.072 11.946667 8.419556 21.902223 16.099555a7383.04 7383.04 0 0 1 77.824 60.416l43.008 35.043556c8.590222 7.395556 16.042667 13.994667 22.357333 19.797333 6.257778 5.859556 9.443556 13.084444 9.443555 21.674667 0 7.395556-3.584 15.075556-10.752 23.096889-7.168 7.964444-15.36 15.928889-24.462222 23.950222a3636.622222 3636.622222 0 0 1-79.530666 68.266667 4105.102222 4105.102222 0 0 0-37.888 31.800889 1262.933333 1262.933333 0 0 1-23.608889 19.797333c-13.767111 10.467556-24.974222 12.629333-33.564445 6.485333-8.533333-6.144-13.198222-15.36-13.767111-27.704889v-89.884444H234.382222a22.755556 22.755556 0 0 1-22.755555-22.755556V452.039111c0-12.572444 10.24-22.755556 22.755555-22.755555h518.656V337.521778c0-10.467556 3.868444-18.147556 11.605334-23.04 7.736889-4.949333 20.252444-1.877333 37.432888 9.216z m-199.907555-239.047111a27.306667 27.306667 0 0 1 18.090666 6.656 21.731556 21.731556 0 0 1 7.509334 16.213333v206.848h-85.333334V107.52c0-6.087111 2.730667-11.946667 7.509334-16.213333a27.306667 27.306667 0 0 1 18.147555-6.656h34.076445z" fill="currentColor"/></svg>'
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
      wrapBtn.innerHTML = GLYPHS.wrap + GLYPHS.unwrap;
      wrapBtn.title = "\u81EA\u52A8\u6362\u884C";
      wrapBtn.setAttribute("aria-label", "\u81EA\u52A8\u6362\u884C");
      wrapBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const on = highlight.classList.toggle("code-wrapped");
        wrapBtn.classList.toggle("active", on);
        wrapBtn.title = on ? "\u53D6\u6D88\u6362\u884C" : "\u81EA\u52A8\u6362\u884C";
        wrapBtn.setAttribute("aria-label", wrapBtn.title);
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
      const copyIcon = `<svg viewBox="0 0 1024 1024" width="12" height="12"><path d="M833.33 767.96h-91.9c-21.73 0-39.34-17.6-39.34-39.34s17.62-39.34 39.34-39.34h91.9c8.82 0 15.98-7.18 15.98-15.98V193.8c0-8.8-7.17-15.98-15.98-15.98H353.84c-8.82 0-15.98 7.18-15.98 15.98v90.86c0 21.75-17.62 39.34-39.34 39.34s-39.34-17.6-39.34-39.34V193.8c0-52.21 42.47-94.67 94.67-94.67h479.49c52.19 0 94.67 42.45 94.67 94.67v479.49c-0.01 52.21-42.49 94.67-94.68 94.67z" fill="currentColor"/><path d="M675.96 925.33H196.47c-52.19 0-94.67-42.45-94.67-94.67V351.17c0-52.21 42.47-94.67 94.67-94.67h479.49c52.19 0 94.67 42.45 94.67 94.67v479.49c-0.01 52.22-42.48 94.67-94.67 94.67zM196.47 335.19c-8.82 0-15.98 7.18-15.98 15.98v479.49c0 8.8 7.17 15.98 15.98 15.98h479.49c8.82 0 15.98-7.18 15.98-15.98V351.17c0-8.8-7.17-15.98-15.98-15.98H196.47z" fill="currentColor"/></svg>`;
      highlights.forEach((highlight) => {
        const copyButton = document.createElement("button");
        copyButton.innerHTML = copyIcon;
        copyButton.classList.add("copyCodeButton");
        copyButton.title = "\u590D\u5236\u4EE3\u7801";
        copyButton.setAttribute("aria-label", "\u590D\u5236\u4EE3\u7801");
        highlight.appendChild(copyButton);
        const codeBlock = highlight.querySelector("code[data-lang]");
        if (!codeBlock) return;
        copyButton.addEventListener("click", () => {
          navigator.clipboard.writeText(codeBlock.textContent).then(() => {
            copyButton.classList.add("copied");
            highlight.classList.add("highlight-copied");
            setTimeout(() => {
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
