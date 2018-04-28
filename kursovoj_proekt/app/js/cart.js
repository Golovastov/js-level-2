'use strict';

// Модуль каталога
var catalog = (function($) {
 
    // Инициализация модуля
    function init() {
        _render();
    }
 
    // Рендер
    function _render() {
        var template = _.template($('#featured_items_template').html()),
            $featuredItems = $('#item');
 
        $.getJSON('', function(data) {
            $goods.html(template({goods: data}));
        });
    }
 
    // Экспортируем наружу
    return {
        init: init
    }
     
})(jQuery);



















if (!localStorage.getItem("cart")) {
    $.getJSON('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/patch-1/responses/getBasket.json', function(data) {
        localStorage.setItem("cart", data);
    });
}
let goodsInCart = JSON.parse(localStorage.getItem('cart'));
const cart = {
    totalCart: {
        totalQty: 0,
        totalPrice: 0
    },
    createTotalCart() {
        for (let i = 0; i < goodsInCart.length; i++) {
            this.totalCart.totalQty += goodsInCart[i].qty;
            this.totalCart.totalPrice += goodsInCart[i].price * goodsInCart[i].qty;
        }
    },
    init() {
        const btnAddToCart = document.querySelectorAll('.add_to_cart');
        this.createTotalCart();
        this.outputQtyTotalPrice();
        this.createListContainer();
        this.addProductToCart(btnAddToCart);
    },
    /**
     * Выводит общее количество и окончательную цену
     */
    outputQtyTotalPrice() {
        document.querySelector('.totalQty').innerHTML = this.totalCart.totalQty;
        document.querySelector('.totalPrice_price').innerHTML = this.totalCart.totalPrice;
    },

    addProductToCart(btnAddToCart) {
        for (let i = 0; i < btnAddToCart.length; i++) {
            btnAddToCart[i].addEventListener('click', (event) => this.addToCart(event))
        }
    },

    /**
     * Добавляет товар в корзину
     * @param {MouseEvent} event Событие клика мышью
     */
    addToCart(event) {
        this.checkForAvailability(event);
        this.createListContainer();
        this.changeTotalCounter(event);
    },

    /**
     * Проверяет есть ли такой товар в корзине
     * @param {MouseEvent} event Событие клика мышью
     */
    checkForAvailability(event) {
        for (let i = 0; i < goodsInCart.length; i++) {
            if (goodsInCart[i].id === +event.target.dataset.id) {
                goodsInCart[i].qty += 1;
                localStorage.setItem("cart", JSON.stringify(goodsInCart));
                return;
            }
        }
        this.addNewGoods(event);
    },

    /**
     * Добавляет товар в корзину если его там нет
     * @param {MouseEvent} event Событие клика мышью
     */
    addNewGoods(event) {
        $.getJSON('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json', function(data) {
            if (data.result === 1) {
                goodsInCart.push({
                    'id': +event.target.dataset.id,
                    'name': event.target.dataset.name,
                    'price': +event.target.dataset.price,
                    'img': event.target.dataset.img,
                    'qty': 1,
                });
                localStorage.setItem("cart", JSON.stringify(goodsInCart));
            } else
                alert('Ошибка связи с сервером.');   
        });
        
    },

    /**
     * Пересчитывет количество товара в корзине и общую стоимость
     * @param event
     */
    changeTotalCounter(event) {
        this.totalCart.totalQty += 1;
        this.totalCart.totalPrice += +event.target.dataset.price;
        this.outputQtyTotalPrice();
    },

    /**
     * Выводит товары в корзину
     */
    createListContainer() {
        const goodsInCartContainer = document.querySelector('.goodsInCart');
        goodsInCartContainer.innerHTML = '';

        for (let i = 0; i < goodsInCart.length; i++) {
            const productWrap = document.createElement('article');
            productWrap.classList.add('productCartCard');
            goodsInCartContainer.appendChild(productWrap);

            const imgLink = document.createElement('a');
            imgLink.setAttribute('href', 'single.html?id=' + goodsInCart[i].id);
            imgLink.classList.add('productCartCard_image');
            productWrap.appendChild(imgLink);

            const image = new Image();
            image.src = `img/${goodsInCart[i].img}`;
            image.alt = goodsInCart[i].name;
            imgLink.appendChild(image);

            const productInfo = document.createElement('div');
            productInfo.classList.add('productCartInfo');
            productWrap.appendChild(productInfo);

            const productName = document.createElement('div');
            productName.classList.add('product_name');
            productInfo.appendChild(productName);

            const productLink = document.createElement('a');
            productLink.setAttribute('href', 'single.html?id=' + goodsInCart[i].id);
            productLink.classList.add('product_name_link');
            productLink.innerHTML = goodsInCart[i].name;
            productName.appendChild(productLink);

            const productPrice = document.createElement('div');
            productPrice.classList.add('productCartPrice');
            productPrice.innerHTML = `<span class="productCartQty">${goodsInCart[i].qty} </span>x 
                                      <span class="productCartPrice"> ${goodsInCart[i].price} руб.</span>`;
            productInfo.appendChild(productPrice);

            const productButtonWrap = document.createElement('div');
            productButtonWrap.classList.add('productCartButton');
            productWrap.appendChild(productButtonWrap);

            const productButton = document.createElement('button');
            productButton.classList.add('productCartButton');
            productButton.innerHTML = `Del`;
            productButton.setAttribute('data-id', goodsInCart[i].id);
            productButton.addEventListener('click', (event) => {
                event.stopPropagation();
                this.deleteFromCart(event)
            });
            productButtonWrap.appendChild(productButton);
        }
    },

    /**
     * Удаляет товар из корзины
     * @param {MouseEvent} event Событие клика мышью
     */
    deleteFromCart(event) {
        for (let i = 0; i < goodsInCart.length; i++) {
            if (goodsInCart[i].id === +event.target.dataset.id) {
                this.totalCart.totalQty -= goodsInCart[i].qty;
                this.totalCart.totalPrice -= goodsInCart[i].price * goodsInCart[i].qty;
                goodsInCart.splice(i, 1);
            }
        }
        this.createListContainer();
        this.outputQtyTotalPrice();
        localStorage.setItem("cart", JSON.stringify(goodsInCart));
    },
};

/**
 * Объект карзины, для вывода на страницу
 */
const pageCart = {
    init() {
        this.createCart()
    },

    createCart() {
        const cartContainer = $('.cart__table');
        cartContainer.html('');
        for (let i = 0; i < goodsInCart.length; i++) {
            let tableTr = $('<tr/>');
            tableTr.appendTo(cartContainer);

            let tableTh = $('<th/>', {class: 'text-center'}).html(i + 1);
            tableTh.appendTo(tableTr);

            let tableTdPhoto = $('<td/>', {class: 'text-center'});
            let photo = $('<img>', {src: 'img/' + goodsInCart[i].img, 'alt': goodsInCart[i].title, style: 'width: 50px'});
            photo.appendTo(tableTdPhoto);
            tableTdPhoto.appendTo(tableTr);

            let tableTdName = $('<td/>', {class: 'text-center'});
            let link = $('<a/>', {href: 'products.html?id=' + goodsInCart[i].id}).html(goodsInCart[i].name);
            link.appendTo(tableTdName);
            tableTdName.appendTo(tableTr);

            let tableTdQty = $('<td/>', {class: 'text-center'}).html(goodsInCart[i].qty);
            tableTdQty.appendTo(tableTr);

            let tableTdPrice = $('<td/>', {class: 'text-center'}).html(goodsInCart[i].price + ' руб.');
            tableTdPrice.appendTo(tableTr);

            let tableTdSum = $('<td/>', {class: 'text-center'}).html(goodsInCart[i].qty * goodsInCart[i].price + ' руб.');
            tableTdSum.appendTo(tableTr);

            let tableTdBtn = $('<button/>', {class: 'productCartButton', 'data-id': goodsInCart[i].id});
            tableTdBtn.click((event) => {
                this.refreshCart(event)
            });
            tableTdBtn.html('Del').appendTo(tableTr);
        }
    },

    refreshCart(event) {
        cart.deleteFromCart(event);
        this.createCart();
    }
};

cart.init();
/**
 * Выпадающая корзина с товарами
 */
$('.cart').hover(function(){
    $('.dropdown_cart').css('display', 'block');
    },
function(){
    setTimeout(function() {
        $('.dropdown_cart').css('display', 'none');
    }, 10000)
 });