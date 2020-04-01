// Main js file

$(document).ready(function () {

  function inputKeyUpHandler(that) {
    if ($(that).val() === '' && $(that).hasClass('active')) {
      $(that).removeClass('active')
             .blur();
    }else{
      $(that).addClass('active');
    } 
  }

  function focusinHandler(that) {
    if (!$(that).hasClass('active')) {
      $(that).addClass('active');
    }
  }

  function focusoutHandler(that) {
    if ($(that).val() === '') {
      $(that).removeClass('active');
    }
  }

  $('.form__input').focusin(function(e){
    focusinHandler(this)
  })

  $('.form__input').focusout(function(e){
    focusoutHandler(this)
  })

  $('.form__textarea').focusin(function(e){
    focusinHandler(this)
  })

  $('.form__textarea').focusout(function(e){
    focusoutHandler(this)
  })

  $('.form__input').keyup(function(){
    inputKeyUpHandler(this);
  })

  $('.form__textarea').keyup(function(){
    inputKeyUpHandler(this);
  })

  $('.form__dropdown--toggle').on('click', function(){
    $(this).toggleClass('active');

    $(this).parents('.form__dropdown')
           .find('.form__dropdown-body')
           .fadeToggle(400);
  })

  $('.form__dropdown-body-item').on('click', function(e){
    var parent = $(this).parents('.form__dropdown'),
        body = $(parent).find('.form__dropdown-body'),
        toggleBtn = $(parent).find('.form__dropdown--toggle'),
        text = $(toggleBtn).find('.form__dropdown-text'),
        value = $(this).text();
    
    if(value !== '') {
      $(toggleBtn).addClass('selected')
      $(text).text(value);
    }else{
      $(toggleBtn).removeClass('selected');
      $(text).text('');
    }

    $(body).fadeOut(400);
    $(toggleBtn).removeClass('active');
  })

  $('.mobile-menu--open').on('click', function(){
    var wrapper = $('.mobile-menu-wrapper'),
        menu = $(wrapper).find('.mobile-menu');

    $(wrapper).addClass('active');
    $(menu).addClass('active');
  })

  $('.mobile-menu--close').on('click', function(){
    var wrapper = $('.mobile-menu-wrapper'),
        menu = $(wrapper).find('.mobile-menu');

    $(wrapper).removeClass('active');
    $(menu).removeClass('active');
  })

  $( "#slider-range" ).slider({
    range: "max",
    min: 1,
    max: 5,
    value: 4
  });

  $('.smooth-goto').on('click', function() {  
    $('html, body').animate({scrollTop: $(this.hash).offset().top - 50}, 500);
    return false;
  });

  $('.form__dropdown-body').mCustomScrollbar({
    axis:"y",
    theme:"dark",
    scrollInertia: 50,
    snapAmount: 1,
    snapOffset: 1,
    mouseWheel:{ scrollAmount: 100 },
    
  });
  

  /* init */

  $('.form__input').parents('.form__input-wrapper')
                   .find('.form__input-placeholder')
                   .css({'transition': 'none'});

  $('.form__input').each(function() {
    if ($(this).val() !== '') {
      $(this).addClass('active');
      
    }
  })

  setTimeout(function(){
    $('.form__input').parents('.form__input-wrapper')
                     .find('.form__input-placeholder')
                     .removeAttr('style');
  }, 50)

  $('.form__dropdown-placeholder').css({'transition': 'none'})

  $('.form__dropdown--toggle').addClass('selected');
  $('.form__dropdown-text').text('1983');
  
  setTimeout(function(){
    $('.form__dropdown-placeholder').removeAttr('style');
  }, 50)

  $('.form__textarea').parent()
                      .find('.form__textarea-placeholder')
                      .css({'transition': 'none'});

  $('.form__textarea').addClass('active');

  setTimeout(function(){
    $('.form__textarea').parent()
                        .find('.form__textarea-placeholder')
                        .removeAttr('style');
  }, 50)
  
});