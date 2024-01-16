(function($){
//==================================================*
//	Document:Ready
//==================================================*
$(document).ready(function(){
	// HeroSlide
	//==================================================*
	$(function(){
		let options = {};
		if ( $(".HeroSlideThumb-container .swiper-slide").length == 1 ) {
			options = {
				observer: true,
				observeParents: true,
				watchOverflow: true,
				slidesPerView: 1,
				centeredSlides: true,
				pagination: {
					el: ".HeroSlideThumb-pagination",
					clickable : true,
				},
				on: {
				  init: function init() {
					var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
					var category = slide.data("category");
					var sub = slide.data("sub");
					var title = slide.data("title");
					var date = slide.data("date");
					var locations = slide.data("location");
					var link = slide.data("link");
					$('.HeroSlideText-sub').text(sub);
					$('.HeroSlideTextTitle-text').text(title);
					$('.HeroSlideTextInfo-date').text(date);
					$('.HeroSlideTextInfo-location').text(locations);
					$('.HeroSlideThumbCategory-text').text(category);
					$('.HeroSlideTextTitle-text, .HeroSlideText-arrow, .HeroSlideThumbItem').attr('href',link);
					$('.HeroSlideTextTitle').addClass('is-SlideView');
				  },
				  
				  slideChangeTransitionStart:function(){
					$('.HeroSlideTextTitle').removeClass('is-SlideView');
					var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
					var category = slide.data("category");
					var sub = slide.data("sub");
					var title = slide.data("title");
					var date = slide.data("date");
					var locations = slide.data("location");
					var link = slide.data("link");
					$('.HeroSlideText-sub').text(sub);
					$('.HeroSlideTextTitle-text').text(title);
					$('.HeroSlideTextInfo-date').text(date);
					$('.HeroSlideTextInfo-location').text(locations);
					$('.HeroSlideThumbCategory-text').text(category);
					$('.HeroSlideTextTitle-text, .HeroSlideText-arrow, .HeroSlideThumbItem').attr('href',link);
					setTimeout(function(){
						$('.HeroSlideTextTitle').addClass('is-SlideView');
					},10);
				  }
				},
				
				breakpoints: {
					1024: {
						allowTouchMove: true,
					},
				}
			}
		}else{
			options = {
				observer: true,
				observeParents: true,
				watchOverflow: true,
				slidesPerView: 1,
				centeredSlides: true,
				speed:500,
				loop:true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				  },
				pagination: {
					el: ".HeroSlideThumb-pagination",
					clickable : true,
				},
				on: {
				  init: function init() {
					var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
					var category = slide.data("category");
					var sub = slide.data("sub");
					var title = slide.data("title");
					var date = slide.data("date");
					var locations = slide.data("location");
					var link = slide.data("link");
					$('.HeroSlideText-sub').text(sub);
					$('.HeroSlideTextTitle-text').text(title);
					$('.HeroSlideTextInfo-date').text(date);
					$('.HeroSlideTextInfo-location').text(locations);
					$('.HeroSlideThumbCategory-text').text(category);
					$('.HeroSlideTextTitle-text, .HeroSlideText-arrow, .HeroSlideThumbItem').attr('href',link);
					$('.HeroSlideTextTitle').addClass('is-SlideView');
				  },
				  
				  slideChangeTransitionStart:function(){
					$('.HeroSlideTextTitle').removeClass('is-SlideView');
					var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
					var category = slide.data("category");
					var sub = slide.data("sub");
					var title = slide.data("title");
					var date = slide.data("date");
					var locations = slide.data("location");
					var link = slide.data("link");
					$('.HeroSlideText-sub').text(sub);
					$('.HeroSlideTextTitle-text').text(title);
					$('.HeroSlideTextInfo-date').text(date);
					$('.HeroSlideTextInfo-location').text(locations);
					$('.HeroSlideThumbCategory-text').text(category);
					$('.HeroSlideTextTitle-text, .HeroSlideText-arrow, .HeroSlideThumbItem').attr('href',link);
					setTimeout(function(){
						$('.HeroSlideTextTitle').addClass('is-SlideView');
					},10);
				  }
				},
				
				breakpoints: {
					1024: {
						allowTouchMove: true,
					},
				}
			}
		}
		
		var HeroSlider = new Swiper('.HeroSlideThumb-container', options);
	});
	
	//
	//MainTicketSlide
	$(function(){
		let options = {};
		if ( $(".MainTicketSlide-container .swiper-slide").length == 1 ) {
			options = {
				observer: true,
				observeParents: true,
				centeredSlides: true,
				watchOverflow: true,
				slidesPerView: 'auto', 
				navigation: {
				  nextEl: ".MainTicketSlideBtn-next",
				  prevEl: ".MainTicketSlideBtn-prev",
				},
			}
		}else{
			options = {
				observer: true,
				observeParents: true,
				centeredSlides: true,
				watchOverflow: true,
				slidesPerView: 'auto', 
				loop:true,
				navigation: {
				  nextEl: ".MainTicketSlideBtn-next",
				  prevEl: ".MainTicketSlideBtn-prev",
				},
				pagination: {
					el: ".MainTicketSlide-pagination",
					clickable: true,
				},
			}
		}
		
		var MainTicketSlide = new Swiper('.MainTicketSlide-container', options);
	});
	
	//
	//MainEventSlide
	if($('.MainEventSlide').length > 0){
		var MainEventSlide = new Swiper(".MainEventSlide-container", {
			observer: true,
			observeParents: true,
			watchOverflow: true,
			slidesPerView: 'auto',
			pagination: {
				el: ".MainEventSlide-pagination",
				clickable: true,
			},
		});
	}
	

});
})(jQuery);