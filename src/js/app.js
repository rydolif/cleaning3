import $ from 'jquery';
import slick from 'slick-carousel';
import magnificPopup from 'magnific-popup';

//------------- GOOGLE MAP ----------
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 55.737854, lng: 37.8670967},
    zoom: 16,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  });
}
initMap();

//---------- SLIDER ---------------
$(document).ready(function() {
	 $('.slider-for').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  arrows: true,
	  // fade: true,
	  asNavFor: '.slider-nav'
  });
  $('.slider-nav').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  asNavFor: '.slider-for',
	  dots: false,
	  vertical: true,
	  centerMode: true,
    centerPadding: '179px',
	  focusOnSelect: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,


  });
  $('.reviews__slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,

    // autoplay: true,
    // autoplaySpeed: 5000
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  });
  //------- FIRST SCREEN SLIDER -------------
  $('.first-screen__nav').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    focusOnSelect: true,
    vertical: true,
    centerMode: false,
    // fade: true,
    asNavFor: '.first-screen__elem',

  });
  $('.first-screen__elem').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.first-screen__nav',
    dots: false,
    focusOnSelect: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          arrows: true,
        }
      }
    ],
    // autoplay: true,
    // autoplaySpeed: 5000
  });
  //-------- CLIENTS ----------


  $('.clients__main').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  });

  //--------- ANCHOR --------------------
  $('.nav a[href^="#"]').on('click', function(event) {

    var target = $(this.getAttribute('href'));

    if( target.length ) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 1000);
    }

  });

  //-------- PRELOADER ------------------
  $(window).on('load', function() {
    $('.preloader').delay(1000).fadeOut('slow');
  });
  //--------------- MODAL -------------------


  $('.popup-modal').magnificPopup({
    type: 'inline',
    preloader: false,
    closeOnBgClick: true,
    removalDelay: 300,
    closeBtnInside: false,
    showCloseBtn: true,
    mainClass: 'my-mfp-zoom-in',
    focus: '.focus_contact'
    //modal: true
  });
  $(document).on('click', '.popup-modal-dismiss', function(e) {
    e.preventDefault();
    $.magnificPopup.close();
  });


  let modalDataContentDescription;
  let modalDataContentTitle;
  let modalDataContentSubTitle;
  let modalDataContentLink;

  $('.content_data').click(function() {
    modalDataContentDescription = $(this).attr('data-content-description');
    modalDataContentTitle = $(this).attr('data-content-title');
    modalDataContentSubTitle = $(this).attr('data-content-sub-title');
    modalDataContentLink = $(this).attr('data-content-link');
  });


  $('.popup-modal__servises').magnificPopup({
    type: 'inline',
    preloader: false,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
    closeBtnInside: false,
    showCloseBtn: false,
    callbacks: {
      beforeOpen: function() {
        $('.js-data-descripteon-inner').html(modalDataContentDescription);
        $('.js-data-title-inner').html(modalDataContentTitle);
        $('.js-data-sub-title-inner').html(modalDataContentSubTitle);
        $('a[href].js-data-link-inner').attr('href', modalDataContentLink);
      }
    }
  });

  $(document).on('click', '.js_this_close', function(e) {
    e.preventDefault();
    $.magnificPopup.close('.popup-modal__servises');
  });



  //----- menu ------
  $('.menu__btn, nav').click(function() {
    $('header').toggleClass('active'),
    $('.menu__btn').toggleClass('active');
  });

  //--------- E-mail Ajax Send
  $('form').submit(function() { //Change
    var th = $(this);
    $.ajax({
      type: 'POST',
      url: 'sendmail.php', //Change
      data: th.serialize()
    }).done(function() {
      alert('Спасибо за заявку!');
      setTimeout(function() {
        // Done Functions
        th.trigger('reset');
      }, 1000);
    });
    return false;
  });
});



