let navbar = document.querySelector('.navbar');

document.querySelector("#menu-btn").onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}   

let searchForm =document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});