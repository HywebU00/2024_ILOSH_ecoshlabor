// -----  基本功能開關   ---------------------------------------------------
window.addEventListener('load', () => {
  topNav(); // 手機版顯示nav選單
  xSlider('.language button', 'ul'); //語系
  fontSize(); // 全站字體
  fatFooter(); // fatFooter是否要展開
  scrollTables('.tableWrapper'); // table捲動功能

  // webSearch();

  // tab功能
  tabFunction({
    target: '.tabSet',
    openFirst: false, // 預設先展開所有內容，鍵盤的自動開合功能無效
    openSwitch: true, // 是否可開合/切換
    autoClose: true, // 自動關閉其他開啟內容
    modeSwitch: true, // 預設模式自動切換，尺寸以上tab功能，尺寸以下手風琴功能
    width: 767, // 尺寸以上tab功能，尺寸以下手風琴功能
    index: 0, // 預設開啟第幾個
  });

  tableAddDataAttributes({
    elemClass: '.tableList', // 目標table
    dataName: 'title', // tableList樣式 加上 data-title
  });

  // 手風琴功能
  accordionFunction({
    target: '.accordion',
    openFirst: false, // 預設先展開所有內容，鍵盤的自動開合功能無效
    autoClose: true, // 點擊時自動關閉已展開的項目，若需要此功能需要關閉openFirst
    openSwitch: true, // 是否可開合
    index: 0, // 預設開啟第幾個
    info: {
      open: '展開', // 收合時顯示
      close: '收合', // 展開時顯示
    },
  });

  (function indexVideo() {
    const video = document.querySelectorAll('.videoSection .video .item');
    const indexVideoBtn = document.querySelectorAll('.videoSection .listBox button');

    indexVideoBtn.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        video.forEach((v) => v.classList.remove('active'));
        video[i].classList.add('active');
        indexVideoBtn.forEach((v) => v.classList.remove('active'));
        item.classList.add('active');
      });
    });
  })();
  // -----------------------------------------------------------------------
  // ----- 手機版選單項目無障礙循環 -------------------------------------------------
  // -----------------------------------------------------------------------
  (function menuLoop() {
    const mobileArea = document.querySelector('.mobileArea');
    const sidebarAllFocus = mobileArea.querySelectorAll('a,button,input,select');
    const sidebarClose = document.querySelector('.sidebarClose');

    sidebarClose.addEventListener('keydown', (e) => {
      if (e.code === 'Tab' && e.shiftKey) {
        e.preventDefault();
        jsSlideDown(document.querySelector('.mobileArea .language ul'));
        sidebarAllFocus[sidebarAllFocus.length - 1].focus();
      } else if (e.code === 'Tab') {
        sidebarAllFocus[0].focus();
      }
    });

    sidebarAllFocus[sidebarAllFocus.length - 1].addEventListener('keydown', (e) => {
      if (e.code === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        sidebarClose.focus();
      }
    });
  })();
});
// -----  基本功能開關   ---------------------------------------------------

// 自行加入的JS請寫在這裡
(function () {
  //newsBox輪播
  const newsBoxSwiper = new Swiper('.newsBox .swiper', {
    slidesPerView: 1,
    loop: false,
    // 切換點
    // pagination: {
    //   el: '.cpSlider .swiperDots',
    //   bulletElement: 'button',
    //   clickable: true,
    // },
    // 切換箭頭
    navigation: {
      nextEl: '.newsBox .nextSlider', //自行設定樣式
      prevEl: '.newsBox .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    // breakpoints: {
    //   100: {
    //     slidesPerView: 2,
    //   },
    //   767: {
    //     slidesPerView: 4,
    //   },
    // },
  });

  //大圖輪播
  let mpSliderItem = document.querySelectorAll('.mpSlider .swiper-slide');
  let mpSliderPagination = [];
  mpSliderItem.forEach((item, index) => {
    mpSliderPagination.push(item.dataset.title);
  });
  const mpSlider = new Swiper('.mpSlider .swiper', {
    slidesPerView: 1,
    loop: false,
    // 切換點
    pagination: {
      el: '.mpSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
      renderBullet: function (index, className) {
        return `<button class="${className} noFonts" aria-label="${mpSliderPagination[index]}">${mpSliderPagination[index]}</button>`;
      },
    },
    // 切換箭頭
    navigation: {
      nextEl: '.mpSlider .nextSlider', //自行設定樣式
      prevEl: '.mpSlider .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
  });

  //廣告輪播
  const adSwiper = new Swiper('.adSlider .swiper', {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: false,
    // 切換點
    pagination: {
      el: '.adSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.adSlider .nextSlider', //自行設定樣式
      prevEl: '.adSlider .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 4,
      },
    },
  });

  //跑馬燈
  const marqueeSwiper = new Swiper('.marquee .swiper', {
    direction: 'vertical',
    // 切換點
    // 切換箭頭
    navigation: {
      nextEl: '.marquee .nextSlider', //自行設定樣式
      prevEl: '.marquee .prevSlider', //自行設定樣式
      disabledClass: '.marquee marquee-arrow-disabled', //不可點選樣式
    },
  });

  //cp_photo
  const navSlider = new Swiper('.cp .navSlider .swiper', {
    lazy: true, // lazy load
    spaceBetween: 10,
    preloadImages: false, // 多筆設定lazy時須設定
    centeredSlides: false, // 多筆設定lazy時須設定
    slidesPerView: 4,
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 3,
      },
    },
  });

  const sliderFor = new Swiper('.cp .sliderFor .swiper', {
    slidesPerView: 1, //顯示張數
    effect: 'fade', //淡入
    fadeEffect: {
      crossFade: true, //上一張淡出，false上一張不淡出，下一張疊在上方
    },
    // watchSlidesProgress: true,
    navigation: {
      nextEl: '.cp .sliderFor .nextSlider', //下一張class，無障礙設定關係需要增加.nextSlider
      prevEl: '.cp .sliderFor .prevSlider', //前一張class，無障礙設定關係需要增加.prevSlider
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    lazy: true,
    thumbs: {
      swiper: navSlider, //設定指向到哪個swiper，使用另一個設定的參數
    },
  });

  const themeSwiper = new Swiper('.innerContent .spaceBox .mainPic .swiper', {
    slidesPerView: 1,
    pagination: {
      el: '.innerContent .spaceBox .swiperPagination',
      clickable: true,
      renderBullet: function (index, className) {
        return `<div class="${className}">${this.slides[index].querySelector('img').alt}</div>`;
      },
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: false,
    },
  });

  const featureSwiper = new Swiper('.featureSwiper .swiper', {
    slidesPerView: 1,
    loop: false,
    // 切換點
    pagination: {
      el: '.featureSwiper .swiperPagination',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.featureSwiper .nextSlider', //自行設定樣式
      prevEl: '.featureSwiper .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
  });
})();

(function () {
  //內頁上方內容背景偏移
  const innerTopBox = document.querySelector('.innerPage .topContent');
  function innerTopCheckScroll() {
    const windowScroll = window.scrollY;
    if (innerTopBox) innerTopBox.style.backgroundPositionY = `${windowScroll * 0.3}px`;
  }
  window.addEventListener('scroll', innerTopCheckScroll);

  const contentMenuCheck = document.querySelector('.innerPage .contentMenu');
  const contentMenu = document.querySelector('.innerPage .contentMenu ul');
  function innerContentMenuCheckScroll() {
    if (contentMenuCheck) {
      const contentMenuTop = contentMenuCheck.getBoundingClientRect().top;
      const headerHeight = document.querySelector('.header');
      if (contentMenuTop <= headerHeight.offsetHeight) {
        contentMenu.style.top = `${headerHeight.offsetHeight}px`;
        contentMenu.classList.add('sticky');
      } else {
        contentMenu.removeAttribute('style');
        contentMenu.classList.remove('sticky');
      }
    }
  }
  window.addEventListener('scroll', innerContentMenuCheckScroll);

  const cpBlockContentBox = document.querySelectorAll('.innerContent .contentBox');
  const cpBlockChangeMenu = document.querySelectorAll('.innerPage .contentMenu button,.innerPage .contentMenu a');

  cpBlockContentBox.forEach((item, index) => {
    item.classList.add('wow');
    item.classList.add('fadeInUp');
    item.setAttribute('data-wow-delay', '0.2s');
  });

  function scrollCheck() {
    const scrollUse = document.querySelector('.scrollUse');

    if (scrollUse)
      cpBlockContentBox.forEach((item, index) => {
        const value = item.getBoundingClientRect();

        if (value.top < window.innerHeight / 3 && value.bottom > window.innerHeight / 3) {
          item.classList.add('active');
          cpBlockChangeMenu[index].classList.add('active');
          cpBlockChangeMenu[index].setAttribute('aria-selected', 'true');
        } else if (value.bottom < window.innerHeight / 3 || value.top > window.innerHeight / 3) {
          item.classList.remove('active');
          cpBlockChangeMenu[index].classList.remove('active');
          cpBlockChangeMenu[index].setAttribute('aria-selected', 'false');
        }
      });
  }
  window.addEventListener('load', scrollCheck);
  window.addEventListener('scroll', scrollCheck);

  //日曆 Html
  const calendarBoxHtml = document.querySelector('.calendarBoxHtml');
  if (calendarBoxHtml) {
    const calendarDay = document.querySelectorAll('.calendarBoxHtml .calendarBody button');

    calendarDay.forEach((item) => {
      item.addEventListener('click', (e) => {
        const siblings = Array.prototype.filter.call(item.parentNode.parentNode.children, (child) => {
          return child !== item.parentNode;
        });

        siblings.forEach((v) => v.classList.remove('active'));
        item.parentNode.classList.add('active');
      });
    });
  }

  // 開啟畫面動態效果
  new WOW({
    boxClass: 'wow', // default
    animateClass: 'animated', // default
    offset: 50, // default
    mobile: true, // default
    live: true, // default
  }).init();
})();

$(function () {
  $.fn.pignoseCalendar('setting', {
    format: 'YYYY-MM-DD',
    language: 'tw',
    languages: {
      tw: {
        weeks: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
        monthsLong: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        controls: {
          ok: '確認',
          cancel: '取消',
        },
      },
    },
  });
});
