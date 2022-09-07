document.addEventListener('DOMContentLoaded', function () {
  loader()
  uiButton()
  header()
  footer()
  uiScrollTop()
  mainBan()
  slider()
  tabs()
  uiSelect()
  uiRange()
  uiDropFile()
  catalog()
  accordion()
  customPlayer()
  popupGallery()
  flat()
  cookies()
  apartmentLayout()
})

function loader() {
  document.documentElement.style.overflow = 'hidden'
  window.addEventListener('load', function () {
    $('.loader').fadeOut(300)
    document.documentElement.style.overflow = 'revert'
  })
}

function uiButton() {
  const rippleButtons = [...document.querySelectorAll('.ui-button--ripple')]
  for (const button of rippleButtons) {
    button.addEventListener('mouseover', function (event) {
      const span = document.createElement('span')
      span.className = 'ui-button__ripple'
      span.style.top = `${event.offsetY}px`
      span.style.left = `${event.offsetX}px`
      button.append(span)
      setTimeout(() => {
        span.remove()
      }, 500)
    })
  }
}

function header() {
  const callButton = document.querySelector('.header__call-btn')
  const callContent = callButton.querySelector('.header__call-drop')
  callButton.addEventListener('click', function () {
    $(callContent).slideDown()
  })

  $(document).on('click', function (event) {
    if ($(event.target).closest(callButton).length === 0) {
      $(callContent).slideUp()
    }
    event.stopPropagation()
  })

  const search = document.querySelector('.header__search')
  const searchInput = document.querySelector('.header__search-input')
  search.addEventListener('click', function (event) {
    search.classList.add('active')
    searchInput.focus()
  })

  $(document).on('click', function (event) {
    if ($(event.target).closest(search).length === 0) {
      search.classList.remove('active')
    }
    event.stopPropagation()
  })

  const burgerButton = document.querySelector('.header__burger-icon')
  burgerButton.addEventListener('click', function () {
    document.querySelector('.header').classList.toggle('header--burger')
    document.documentElement.classList.toggle('no-scroll')
  })

  const headerArrowLinks = [...document.querySelectorAll('.header__item--arrow .header__link')]
  for (const item of headerArrowLinks) {
    item.addEventListener('click', function (event) {
      if (window.innerWidth < 767 && this.nextElementSibling) {
        this.nextElementSibling.classList.add('active')
        event.preventDefault()
      }
    })
  }

  const backMenuButton = [...document.querySelectorAll('.header__back')]
  for (const item of backMenuButton) {
    item.addEventListener('click', function (event) {
      if (window.innerWidth < 767) {
        if ($(this).parents('.header__submenu').length > 0) {
          $(this).parents('.header__submenu').removeClass('active')
        } else {
          $(this).parents('.header__drop').removeClass('active')
        }
      }
    })
  }

  document.querySelector('.header__shadow').addEventListener('click', function () {
    document.querySelector('.header').classList.remove('header--burger')
    document.documentElement.classList.remove('no-scroll')
  })

  headerSize()
  window.addEventListener('resize', headerSize)
}

function headerSize() {
  const headerHeight = document.querySelector('.header').offsetHeight
  document.documentElement.style.setProperty('--header-height', `${headerHeight}px`)
}

function footer() {
  const dropButton = [...document.querySelectorAll('.footer__heading--arrow')]
  for (const button of dropButton) {
    button.addEventListener('click', function (event) {
      if (window.innerWidth < 767) {
        $(this.nextElementSibling).slideToggle()
        this.classList.toggle('active')
      }
    })
  }
  const dropButtonLinks = [...document.querySelectorAll('.footer__heading--arrow a')]
  for (const link of dropButtonLinks) {
    link.addEventListener('click', function (event) {
      if (window.innerWidth < 767) {
        event.stopPropagation()
      }
    })
  }
}

function uiScrollTop() {
  const scrollButton = document.querySelector('.ui-scroll-top')
  scrollButton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
}

function mainBan() {
  const mainBan = document.querySelector('.main-ban')
  if (mainBan) {
    const mainBanSlider = new Swiper('.main-ban__slider', {
      spaceBetween: 15,
      speed: 500,
      autoplay: {
        delay: 4000
      },
      navigation: {
        nextEl: '.main-ban__button--next',
        prevEl: '.main-ban__button--prev'
      },
      scrollbar: {
        el: '.main-ban__scrollbar'
      }
    })
  }
}

function slider() {
  const sliderBlocks = [...document.querySelectorAll('.slider')]
  if (sliderBlocks.length > 0) {
    for (const sliderBlock of sliderBlocks) {
      let breakpoints = {
        767: {
          slidesPerView: 3
        },
        999: {
          slidesPerView: 4
        }
      }
      if (sliderBlock.classList.contains('slider--per-view-1')) {
        breakpoints = false
      }
      if (sliderBlock.classList.contains('slider--per-view-3')) {
        breakpoints = {
          999: {
            slidesPerView: 2
          },
          1259: {
            slidesPerView: 3
          }
        }
      }

      const sliderSlider = new Swiper(sliderBlock.querySelector('.slider__wrapper'), {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: sliderBlock.querySelector('.slider__button--next'),
          prevEl: sliderBlock.querySelector('.slider__button--prev')
        },
        breakpoints: breakpoints
      })
    }
  }
}

function tabs() {
  const tabsBlocks = [...document.querySelectorAll('.tabs')]
  for (const tabsBlock of tabsBlocks) {
    const currentTabBlock = tabsBlock.querySelector('.tabs__current')
    const currentTabText = tabsBlock.querySelector('.tabs__current-text')
    const currentTabIcon = tabsBlock.querySelector('.tabs__current .tabs__icon img')
    const tabButtons = [...tabsBlock.querySelector('.tabs__list').querySelectorAll('.tabs__button')]
    const tabContents = [...tabsBlock.querySelector('.tabs__main').querySelectorAll(':scope > .tabs__content')]

    const activeButtonClass = 'tabs__button--active'
    const activeContentClass = 'tabs__content--active'

    for (const button of tabButtons) {
      button.addEventListener('click', function () {
        if (this.dataset.name) {
          try {
            window.location.hash = this.dataset.name
          } catch {}
        }

        if (!this.querySelector('a')) {
          currentTabText.textContent = this.textContent
          if (currentTabIcon) {
            currentTabIcon.src = this.querySelector('.tabs__icon img').src
          }

          tabButtons.find((tab) => tab.classList.contains(activeButtonClass))?.classList.remove(activeButtonClass)
          this.classList.add(activeButtonClass)
          tabContents.find((content) => content.classList.contains(activeContentClass))?.classList.remove(activeContentClass)
          tabContents[$(this).index()]?.classList.add(activeContentClass)
        }

        if (window.innerWidth < 999) {
          $(currentTabBlock.nextElementSibling).slideUp()
        }
      })
    }

    currentTabBlock.addEventListener('click', function () {
      $(this.nextElementSibling).slideToggle()
    })
  }

  if (tabsBlocks.length > 0) {
    const hash = window.location.hash
    if (hash) {
      $(`[data-name="${hash.slice(1)}"]`).trigger('click')
    }
  }
}

function uiSelect() {
  const selects = document.querySelectorAll('.ui-select select')
  for (const select of selects) {
    const selectParent = select.parentElement
    $(select).select2({
      minimumResultsForSearch: Number.POSITIVE_INFINITY,
      width: 'auto',
      dropdownAutoWidth: true,
      dropdownParent: selectParent,
      placeholder: select.dataset.placeholder ?? ''
    })
  }
}

function uiDropFile() {
  const uiDropFiles = [...document.querySelectorAll('.ui-drop-file')]
  if (uiDropFiles.length > 0) {
    for (const dropFile of uiDropFiles) {
      const dropFileZone = new Dropzone(dropFile, {
        url: '#',
        paramName: 'file',
        uploadMultiple: true,
        createImageThumbnails: false,
        maxFilesize: dropFile.dataset.maxFileSize ?? 256,
        clickable: dropFile.querySelector('.ui-drop-file__button'),
        addRemoveLinks: true,
        error(file, message) {
          if (file.previewElement) {
            file.previewElement.classList.add('has-error')
            file.previewElement.querySelector('.dz-error-message').textContent = 'Ошибка'
          }
        }
      })
    }
  }
}

function uiRange() {
  $('.ui-range input').ionRangeSlider({
    type: 'double',
    skin: 'round',
    hide_min_max: true,
    hide_from_to: true,
    force_edges: true,
    onStart: function (data) {
      $(data.input).parents('.ui-range').find('.ui-range__val--from').text(data.from)
      $(data.input).parents('.ui-range').find('.ui-range__val--to').text(data.to)
    },
    onChange: function (data) {
      $(data.input).parents('.ui-range').find('.ui-range__val--from').text(data.from)
      $(data.input).parents('.ui-range').find('.ui-range__val--to').text(data.to)
    }
  })
}

function catalog() {
  const catalogFilter = document.querySelector('.catalog__filter')
  if (catalogFilter) {
    catalogFilter.querySelector('.ui-button').addEventListener('click', function (event) {
      event.preventDefault()
      const uiRanges = [...catalogFilter.querySelectorAll('.ui-range input')]
      for (const range of uiRanges) {
        $(range).data('ionRangeSlider').reset()
      }
      const uiSelects = [...catalogFilter.querySelectorAll('.ui-select select')]
      for (const select of uiSelects) {
        select.selectedIndex = 0
      }
      $('.ui-select select').trigger('change').trigger('change.select2')
    })
  }
}

function accordion() {
  const accordionHeads = [...document.querySelectorAll('.accordion-item__head')]
  for (const accordionHead of accordionHeads) {
    accordionHead.addEventListener('click', function () {
      this.classList.toggle('accordion-item__head--active')
      $(this.nextElementSibling).slideToggle()
    })
  }
}

function customPlayer() {
  const videoWrappers = [...document.querySelectorAll('.js-custom-player')]
  for (const videoWrapper of videoWrappers) {
    const player = new Plyr(videoWrapper, {
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'pip', 'airplay', 'fullscreen']
    })
  }
}

function getPopup(popup, source) {
  const popupSource = source || popup.data('src')
  Fancybox.show(
    [{
      src: popupSource,
      preload: false
    }],
    {
      mainClass: 'popup',
      parentEl: document.querySelector('.wrapper'),
      showClass: 'fancybox-fadeIn',
      hideClass: 'fancybox-fadeOut',
      hideScrollbar: true,
      touch: false,
      autoFocus: true,
      trapFocus: true,
      dragToClose: false
    })
  Fancybox.defaults.ScrollLock = false
  return false
}

function flat() {
  const paginationItems = [...document.querySelectorAll('.flat__pagination-item')]
  for (const paginationItem of paginationItems) {
    paginationItem.addEventListener('click', function () {
      document.querySelector('.flat__slider .slider__wrapper')?.swiper.slideTo(+paginationItem.dataset.toSlide - 1)
    })
  }
}

function popupGallery() {
  Fancybox.bind('[data-fancybox-single], [data-fancybox]', {
    mainClass: 'popup',
    parentEl: document.querySelector('.wrapper'),
    showClass: 'fancybox-fadeIn',
    hideClass: 'fancybox-fadeOut',
    infinite: false,
    Carousel: {
      friction: 0.85
    },
    clickContent: false,
    Toolbar: false,
    Thumbs: false,
    hideScrollbar: true,
    dragToClose: false
  })
}

function cookies() {
  const cookiesButton = document.querySelector('.cookies .ui-button')
  if (cookiesButton) {
    cookiesButton.addEventListener('click', function () {
      $(this.closest('.cookies')).fadeOut()
    })
  }
}

function apartmentLayout() {
  const tabBLocks = [...document.querySelectorAll('.apartment-layout')]
  for (const tabBLock of tabBLocks) {
    const tabContents = [...tabBLock.querySelectorAll('.apartment-layout__content')]
    const activeTabClass = 'apartment-layout__tab--active'
    const activeContentClass = 'apartment-layout__content--active'
    const tabLines = [...tabBLock.querySelectorAll('.apartment-layout__tabs')]

    for (const tabLine of tabLines) {
      const tabItems = [...tabLine.querySelectorAll('.apartment-layout__tab')]

      for (const tabItem of tabItems) {
        tabItem.addEventListener('click', function () {
          if (tabItem.dataset.tab) {
            tabItems.find((tab) => tab.classList.contains(activeTabClass))?.classList.remove(activeTabClass)
            this.classList.add(activeTabClass)
            tabContents.find((content) => content.classList.contains(activeContentClass))?.classList.remove(activeContentClass)
            tabBLock.querySelector(`[data-content="${tabItem.dataset.tab}"]`).classList.add(activeContentClass)
          }
        })
      }
    }
  }
}
