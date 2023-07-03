const menuHeight = document.querySelector(".header-top").clientHeight;

/* Active link after click */
/*$(".menu-element__link").click(function() {
    const thisElement = $(this);

    if (thisElement.hasClass('active')) {
        return;
    }

    const linkHref = thisElement.attr("href");
    const hrefElement = $(linkHref);

    const paddingTop = parseInt(hrefElement.css("padding-top"));
    const menuHeight = $(".header-top").height();

    $([document.documentElement, document.body]).animate({
        scrollTop: hrefElement.offset().top - paddingTop - menuHeight
    }, 1500);

    $(".menu-element__link.active").removeClass('active');
    thisElement.addClass('active');
});*/
document.querySelectorAll(".menu-element__link").forEach(element => {
    element.addEventListener("click", function (e) {
        e.preventDefault();

        if (hasClass(this, 'active')) {
            return;
        }

        const linkHref = this.getAttribute("href");
        const hrefElement = document.getElementById(linkHref.replace("#", ""));

        const paddingTop = parseInt(getComputedStyle(document.querySelector('#work')).paddingTop);

        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: hrefElement.offsetTop - paddingTop - menuHeight
        });

        changeActiveMenuElement(this);
    });
});

/* Active link on scroll to section */
const options = {
    threshold: 0.3
}
const callback = function(entries) {
    entries.forEach(entry => {
        const sectionMenuLink = document.querySelector(`.menu-element__link[href='#${entry.target.id}']`);
        if (entry.isIntersecting && !hasClass(sectionMenuLink, 'active')) {
            changeActiveMenuElement(sectionMenuLink);
        }
    });
};
const observer = new IntersectionObserver(callback, options);
document.querySelectorAll(".observer-section").forEach(element => {
    observer.observe(element);
});

/* Слайдеры изображений */
const swiper = new Swiper('.achievements-list', {
    loop: true,

    slidesPerView: 3,
    spaceBetween: 30,
    //centeredSlides: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        bulletClass: 'slider__controls-element',
        bulletActiveClass: 'slider__controls-element-active'
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    keyboard: {
        enabled: true,
    },
    //
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },

    /*breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 4,
            spaceBetween: 40
        }
    }*/
});
const swiper2 = new Swiper('.books-list', {
    loop: true,

    slidesPerView: 4,
    spaceBetween: 20,
    //centeredSlides: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        bulletClass: 'slider__controls-element',
        bulletActiveClass: 'slider__controls-element-active'
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    keyboard: {
        enabled: true,
    },
    //
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },

    /*breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 4,
            spaceBetween: 40
        }
    }*/
});

Fancybox.bind("[data-fancybox]", {});

// Общие функции
/**
 * Меняет активный элемент в пунктах меню
 * @param element Ссылка в меню
 */
function changeActiveMenuElement(element) {
    document.querySelector(".menu-element__link.active").classList.remove('active');
    element.classList.add('active');
}

/**
 * Проверяет наличие класса у элемента
 * @param element
 * @param className
 */
function hasClass(element, className) {
    return element.classList.contains(className);
}
