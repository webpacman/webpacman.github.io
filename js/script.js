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

        changeActiveMenuElement(this, 'menu-element__link');
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
            changeActiveMenuElement(sectionMenuLink, 'menu-element__link');
        }
    });
};
const observer = new IntersectionObserver(callback, options);
document.querySelectorAll(".observer-section").forEach(element => {
    observer.observe(element);
});

/* Slider logic */
const achievementsElements = [
    {
        href: "images/achievements/bitrix.webp",
        alt: "Bitrix"
    },
    {
        href: "images/achievements/eldorado2020.webp",
        alt: "Eldorado лучший сотрудник"
    },
    {
        href: "images/achievements/html.webp",
        alt: "html test"
    },
    {
        href: "images/achievements/php.webp",
        alt: "php test"
    },
    {
        href: "images/achievements/js.png",
        alt: "js картинка example"
    },
    {
        href: "images/achievements/skillbox.webp",
        alt: "skillbox php курс"
    },
    {
        href: "images/achievements/teamlead.webp",
        alt: "teamlead курс"
    },
    {
        href: "images/achievements/css-3.png",
        alt: "css картинка"
    },
    {
        href: "images/achievements/html-5.png",
        alt: "html картинка"
    },
    {
        href: "images/achievements/js.png",
        alt: "js картинка"
    },
];
const booksElements = [
    {
        href: "images/books/7skills.png",
        alt: "7 навыков"
    },
    {
        href: "images/books/clear-code.png",
        alt: "Чистый код"
    },
    {
        href: "images/books/patterns.png",
        alt: "Паттерны"
    },
    {
        href: "images/books/perfect-code.png",
        alt: "Прекрасный код"
    },
    {
        href: "images/books/program-fan.png",
        alt: "Программист фанатик"
    },
    {
        href: "images/books/secret.png",
        alt: "Секрет"
    },
];

createSlider(document.querySelector(".slider.achievements-list"), achievementsElements);
createSlider(document.querySelector(".slider.books-list"), booksElements, 4);

function createSlider(sliderParent, sliderData, countInView = 3, centered = false) {
    if (!sliderParent || !sliderData.length) {
        return false;
    }

    const pagesCount = Math.ceil(sliderData.length / countInView);
    const imageWidth = 100 / countInView;

    // Создаём слайды
    sliderData.forEach((element, index) => {
        const sliderLink = document.createElement("a");
        sliderLink.href = element.href;
        sliderLink.target = "_blank";
        sliderLink.classList.add('slider__link', 'block-center');
        if (centered) {
            sliderLink.classList.add('slider__link--center');
        }
        sliderLink.style.minWidth = `${imageWidth}%`;

        const sliderImage = document.createElement("img");
        sliderImage.classList.add('slider__image');
        sliderImage.src = element.href;
        sliderImage.alt = element.alt;

        sliderLink.appendChild(sliderImage);

        sliderParent.appendChild(sliderLink);
    });

    // Создаём переключатели
    const sliderControlsWrapper = document.createElement("div");
    sliderControlsWrapper.classList.add('slider__controls', 'block-center');

    for (let i = 0; i < pagesCount; i++) {
        const sliderControl = document.createElement("span");
        sliderControl.classList.add('slider__controls-element');
        if (i === 0) {
            sliderControl.classList.add('active');
        }
        sliderControl.addEventListener('click', function (e) {
            if (hasClass(e.target, 'active')) {
                return;
            }

            changeActiveMenuElement(e.target, 'slider__controls-element', sliderParent);

            sliderParent.querySelector(".slider__link:first-of-type").style.marginLeft = `-${i * 100}%`;
        });

        sliderControlsWrapper.appendChild(sliderControl);
    }

    sliderParent.appendChild(sliderControlsWrapper);
}

// Общие функции
/**
 * Меняет активный элемент в пунктах меню
 * @param element Ссылка в меню
 * @param className Название класса для поиска активного элемента
 * @param parent Родительский элемент, если поиск нужно выполнять не глобально
 */
function changeActiveMenuElement(element, className, parent = undefined) {
    const findElement = parent || document;
    const activeElement = findElement.querySelector(`.${className}.active`);
    if (activeElement) {
        activeElement.classList.remove('active');
    }

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
