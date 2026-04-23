/* ========== 归档页条目 stagger 动画 ========== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.querySelector('.template-archives')) return;
  var delay = 0.08;
  document.querySelectorAll('.template-archives .archives-group').forEach(function (group, gi) {
    var groupBase = 0.1 + gi * 0.12;
    group.querySelectorAll('.article-list--compact article').forEach(function (article, i) {
      article.style.animation = 'archiveItemIn 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94) both';
      article.style.animationDelay = (groupBase + i * delay) + 's';
    });
  });
});

/* ========== 切换深色/亮色时出现小豆泥 ========== */
(function () {
  var darkSrc  = '/stickers/azuki/030.png';
  var lightSrc = '/stickers/azuki/029.png';
  var $s = null;
  var hideTimer = null;

  function getOrCreate() {
    if (!$s) {
      $s = document.createElement('img');
      $s.alt = '';
      Object.assign($s.style, {
        position:     'fixed',
        bottom:       '72px',
        left:         '20px',
        width:        '72px',
        height:       '72px',
        borderRadius: '14px',
        opacity:      '0',
        transform:    'scale(0.5) rotate(-10deg)',
        transition:   'opacity 0.35s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents:'none',
        zIndex:       '9998',
      });
      document.body.appendChild($s);
    }
    return $s;
  }

  function show(src) {
    var el = getOrCreate();
    var toggle = document.getElementById('dark-mode-toggle');
    el.src = src;
    if (toggle) {
      var rect = toggle.getBoundingClientRect();
      if (window.innerWidth < 768) {
        el.style.left   = (rect.left - 84) + 'px';
        el.style.top    = (rect.top + rect.height / 2 - 36) + 'px';
        el.style.bottom = 'auto';
      } else {
        el.style.left   = (rect.right + 12) + 'px';
        el.style.top    = (rect.top + rect.height / 2 - 36) + 'px';
        el.style.bottom = 'auto';
      }
    } else {
      el.style.left   = '20px';
      el.style.bottom = '72px';
      el.style.top    = 'auto';
    }
    el.style.opacity   = '1';
    el.style.transform = 'scale(1) rotate(0deg)';
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      el.style.opacity   = '0';
      el.style.transform = 'scale(0.6) rotate(8deg)';
    }, 2500);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('dark-mode-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      setTimeout(function () {
        var isDark = document.documentElement.dataset.scheme === 'dark';
        show(isDark ? darkSrc : lightSrc);
      }, 50);
    });
  });
})();

/* ========== 唐老师彩蛋 ========== */
(function () {
  var pool = [
    '/stickers/azuki/003.png',
    '/stickers/azuki/005.png',
    '/stickers/azuki/007.png',
    '/stickers/azuki/011.png',
    '/stickers/azuki/014.png',
    '/stickers/azuki/021.png',
    '/stickers/azuki/029.png',
    '/stickers/azuki/036.png',
  ];
  var cooldown = false;

  function wrapTangLaoshi(node) {
    if (node.nodeType !== 3) return;
    var text = node.textContent;
    if (text.indexOf('唐老师') === -1) return;
    var parts = text.split('唐老师');
    var frag = document.createDocumentFragment();
    parts.forEach(function (part, i) {
      if (part) frag.appendChild(document.createTextNode(part));
      if (i < parts.length - 1) {
        var span = document.createElement('span');
        span.className = 'tang-laoshi';
        span.textContent = '唐老师';
        frag.appendChild(span);
      }
    });
    node.parentNode.replaceChild(frag, node);
  }

  function init() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(wrapTangLaoshi);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('click', function (e) {
    if (cooldown) return;
    var el = e.target.closest('.tang-laoshi');
    if (!el) return;
    cooldown = true;
    setTimeout(function () { cooldown = false; }, 800);
    var rect = el.getBoundingClientRect();
    var img = document.createElement('img');
    img.src = pool[Math.floor(Math.random() * pool.length)];
    img.alt = '';
    Object.assign(img.style, {
      position:     'fixed',
      left:         (rect.left + rect.width / 2 - 40) + 'px',
      top:          (rect.top - 90) + 'px',
      width:        '80px',
      height:       '80px',
      borderRadius: '16px',
      opacity:      '0',
      transform:    'scale(0.4) translateY(20px) rotate(-10deg)',
      transition:   'opacity 0.35s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      pointerEvents:'none',
      zIndex:       '9999',
    });
    document.body.appendChild(img);
    requestAnimationFrame(function () {
      img.style.opacity   = '1';
      img.style.transform = 'scale(1) translateY(0) rotate(0deg)';
    });
    setTimeout(function () {
      img.style.opacity   = '0';
      img.style.transform = 'scale(0.7) translateY(-10px) rotate(6deg)';
      setTimeout(function () { img.remove(); }, 400);
    }, 1400);
  });
})();

/* ========== GLightbox 初始化 ========== */
window.addEventListener('load', function () {
  setTimeout(function () {
    if (typeof GLightbox === 'undefined') return;
    GLightbox({
      selector:        '.glightbox',
      touchNavigation: true,
      loop:            true,
      openEffect:      'zoom',
      closeEffect:     'fade',
      slideEffect:     'slide'
    });
  }, 100);
});

/* ========== 文章页左侧边栏图标栏模式 ========== */
(function () {
  if (!document.body.classList.contains('article-page')) return;
  if (window.location.pathname.startsWith('/about/')) return;

  var main = document.querySelector('main.main');
  if (!main) return;

  if (window.innerWidth < 768) return;

  if (localStorage.getItem('article-sidebar-rail') === '1') {
    document.body.classList.add('is-sidebar-rail');
  }

  setTimeout(function () {
    var sidebar = document.querySelector('.left-sidebar');
    var trigger = document.createElement('div');
    trigger.className = 'sidebar-edge-trigger';
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('aria-label', document.body.classList.contains('is-sidebar-rail') ? '展开侧边栏' : '收起侧边栏');
    document.body.appendChild(trigger);

    // 展开和收起两个状态的触发器基准位置（相对于视口）
    var expandedLeft = 0, railLeft = 0;

    // 无闪烁地测量两种状态下 main 的左边界
    function measureBothStates() {
      var wasRail = document.body.classList.contains('is-sidebar-rail');
      // 暂时禁用过渡，避免测量过程中触发动画
      document.body.classList.add('no-sidebar-anim');

      if (wasRail) document.body.classList.remove('is-sidebar-rail');
      sidebar.offsetHeight; // 强制同步 layout
      expandedLeft = Math.max(0, main.getBoundingClientRect().left - 4);

      document.body.classList.add('is-sidebar-rail');
      sidebar.offsetHeight;
      railLeft = Math.max(0, main.getBoundingClientRect().left - 4);

      if (!wasRail) document.body.classList.remove('is-sidebar-rail');
      sidebar.offsetHeight;
      document.body.classList.remove('no-sidebar-anim');
    }

    // 立即（无动画）将触发器定位到当前状态
    function snapTriggerPosition() {
      var isRail = document.body.classList.contains('is-sidebar-rail');
      trigger.style.transition = 'none';
      trigger.style.left = expandedLeft + 'px';
      trigger.style.transform = 'translateX(' + (isRail ? railLeft - expandedLeft : 0) + 'px)';
      trigger.offsetHeight; // flush
      trigger.style.transition = '';
    }

    measureBothStates();
    snapTriggerPosition();

    window.addEventListener('resize', function () {
      measureBothStates();
      snapTriggerPosition();
    });

    function toggle() {
      var goingToRail = !document.body.classList.contains('is-sidebar-rail');
      // 预先设置目标 transform，CSS transition 会同步驱动动画
      trigger.style.transform = 'translateX(' + (goingToRail ? railLeft - expandedLeft : 0) + 'px)';
      document.body.classList.toggle('is-sidebar-rail');
      var isRail = document.body.classList.contains('is-sidebar-rail');
      trigger.setAttribute('aria-label', isRail ? '展开侧边栏' : '收起侧边栏');
      localStorage.setItem('article-sidebar-rail', isRail ? '1' : '0');
    }

    trigger.addEventListener('click', toggle);
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  }, 600);
})();


