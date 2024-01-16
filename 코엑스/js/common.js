(function($){
	//==================================================*
	//	Document:Cursor
	//==================================================*

	window.addEventListener('resize', function(){
		cursor();
	});

	function cursor(){
		if (window.innerWidth > 1024) {
		  var cursor = document.querySelector(".custom-cursor");
		  var links = document.querySelectorAll("[class*='cursor-']");
		  var medias = document.querySelectorAll(".sb-thumb");
		  var initCursor = false;
		  
		  for (var i = 0; i < links.length; i++) {
			var selfLink = links[i];

			selfLink.addEventListener("mouseover", function() {
			  cursor.classList.add("is-Cursor");
			  if($(this).hasClass('cursor-View')){
				  cursor.classList.add("is-View");
			  }			  
			  
			});
			selfLink.addEventListener("mouseout", function() {
			  cursor.classList.remove("is-Cursor");
			  if($(this).hasClass('cursor-View')){
				  cursor.classList.remove("is-View");
			  }
			});
		  }
		  
		  if($('.sb-thumb').length > 0){
			  for (var i = 0; i < medias.length; i++) {
				var selfMedia = medias[i];

				selfMedia.addEventListener("mouseover", function() {
				  cursor.classList.add("is-Cursor");
				  cursor.classList.add("is-View");	  
				  
				});
				selfMedia.addEventListener("mouseout", function() {
				  cursor.classList.remove("is-Cursor");
				  cursor.classList.remove("is-View");
				});
			  }
		  }

		  window.onmousemove = function(e) {
			var mouseX = e.clientX;
			var mouseY = e.clientY;

			if (!initCursor) {
			  TweenLite.to(cursor, 0.3, {
				opacity: 1
			  });
			  initCursor = true;
			}

			TweenLite.to(cursor, 0, {
			  top: mouseY + "px",
			  left: mouseX + "px"
			});
		  };

		  window.onmouseout = function(e) {
			TweenLite.to(cursor, 0.3, {
			  opacity: 0
			});
			initCursor = false;
		  };
		}
	}

	cursor();

	//==================================================*
	//	Document:Ready
	//==================================================*
	gsap.registerPlugin(ScrollTrigger);
	
	// 
	//highlight onScroll
	function onScroll(event) {
		var scrollPos = $(document).scrollTop();
		$('.PageLeftTab-link').each(function() {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			
			if (refElement.offset().top - $(window).height()/2 <= scrollPos && refElement.offset().top + refElement.height() > scrollPos) {
				$('.PageLeftTab-item').removeClass("is-Current");
				currLink.closest('.PageLeftTab-item').addClass("is-Current");
			} else {
				currLink.closest('.PageLeftTab-item').removeClass("is-Current");
			}
		});
	}
	
	$(document).ready(function(){
		// 
		//fullHeight
		function fullHeight() {
			let vh = 0;

			vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}

		fullHeight();
		window.addEventListener('resize', e => {
			fullHeight()
		});
		
		// 
		//Header Menu
		function headerNav() {
			$('.site').addClass('nav-On');
			$('html').addClass('is-Hidden');
		}
		
		$(document).on('click', '.MobileMenu', headerNav);
		
		// 
		//Header MenuClose
		function headerNavClose() {
			$('.site').removeClass('nav-On');
			$('html').removeClass('is-Hidden');
		}
		
		$(document).on('click', '.MobileMenuClose', headerNavClose);
		
		//
		//Header Scroll Hidden
		var didScroll;
		var lastScrollTop = 0;
		var delta = 5;
		var navbarHeight = $('.site-header').outerHeight();
		
		$(window).scroll(function(event){
			didScroll = true;
		});
		
		setInterval(function() {
			if (didScroll) {
				hasScrolled();
				didScroll = false;
			}
		}, 250);
		
		function hasScrolled() {
			var thisSt = $(this).scrollTop();
			
			if(Math.abs(lastScrollTop - thisSt) <= delta)
				return;
			if (thisSt > lastScrollTop && thisSt > navbarHeight){
				$('.site-header').removeClass('is-Down').addClass('is-Up');
			} else {
				if(thisSt > 10){
					if(thisSt + $(window).height() < $(document).height()) {
						$('.site-header').removeClass('is-Up').addClass('is-Down');
					}
				}else{
					$('.site-header').removeClass('is-Up').removeClass('is-Down');
				}
			}
			lastScrollTop = thisSt;
		}
		$(window).trigger('scroll');
		
		// Mobile Nav Toggle
		//==================================================*
		$(function($){
			var clickAllowed = true;
			var this_index = $(this).parent('li').index();

			$('.SiteMenu-nav .menu-wrapper > .menu-item > a').click(function(){
				if (clickAllowed) {
					$(this).parent('li').toggleClass('is-View').siblings('li').removeClass('is-View');

					if($(this).parent().has('ul').length == 0){
							return true;
					}
					$(this).siblings('ul').stop().slideToggle(300).parent('li').siblings('li').children('ul').stop().slideUp(200);

					return false;
				}
			});
			function onResize() {
				if($(window).width() <= 1024){
					clickAllowed = true;
				}
				else{
					clickAllowed = false;
				}
			}
			onResize();
			var timer;
			$(window).bind('resize', onResize);
		});
		
		//TopBtn
		//==================================================*
		function TopBtn() {
			$('html,body').animate({
				scrollTop:0
			}, 500);
		}
		
		$(document).on('click', '.TopButton', TopBtn);
		
		if($('.AboutHero').length == 0){
			const TopBtns = gsap.timeline({
			  scrollTrigger: {
				trigger: ".site-footer",
				start: "top bottom",
				toggleClass: { 
					className: "is-Stop", 
					targets: ".TopButton" 
				}
			  }
			})
		}
		
		// TopButton
		//==================================================*
		if($('.TopButton').length > 0){
			function TopButtonView() {
				var documentHeight = $(window).outerHeight();
				
				$(window).scroll(function() {
					if ($(document).scrollTop() > documentHeight - 20) {
						$('.TopButton').addClass('is-Open');
						$('#frogue-container').addClass('has-Top');
					}else{
						$('.TopButton').removeClass('is-Open');
						$('#frogue-container').removeClass('has-Top');
					}
					
					if($('.TopButton').hasClass('is-Stop')){
						$('#frogue-container').removeClass('has-Top');
					}
				});
			}
			
			TopButtonView();

			$(window).on('resize', function(){
				TopButtonView();
			});
		}
		
		// FamilySelect
		//==================================================*
		function CustomSelect() {
			var Select = $(this).parent('.FamilySelect');
			if(Select.hasClass('is-Open')){
				Select.removeClass('is-Open');
			}else{
				Select.addClass('is-Open');
			}
		}
		
		$(document).on('click', '.FamilySelect-text', CustomSelect);
		
		
		$(document).mouseup(function (e){
			if(!$('.FamilySelect').is(e.target) && $('.FamilySelect').has(e.target).length === 0){
					$('.FamilySelect').removeClass('is-Open');
			}
		});
		

		// AniView
		//==================================================*
		const throttle = (callback) => {
			let timer;

			return (event) => {
				if (!timer) {
					timer = setTimeout(() => {
						timer = null;
						callback(event);
					}, 200);
				}
			};
		};
		
		function AniView(trigger) {
			function scrollAniView() {
				const items = document.querySelectorAll('.' + trigger);
				const _winHeigth = window.innerHeight;
				const _scroll = window.scrollY + _winHeigth;

				if (document.getElementsByClassName(trigger).length === 0) {
					return;
				}

				items.forEach((item) => {
					const _offSetTop = window.pageYOffset + item.getBoundingClientRect().top;


					if (_scroll > _offSetTop) {
						item.classList.add('is-View');
					}
				});
			}
			scrollAniView(trigger)
			
			document.addEventListener('scroll', throttle((e) =>
				scrollAniView(trigger)));

			document.addEventListener('resize', e => {
				scrollAniView(trigger)
			});
		}
		
		/*실행*/
		AniView('a-TransText');
		AniView('a-TransUp');
		AniView('a-Ani');
		
		function AniViewClass(trigger) {
			function scrollAniViewClass() {
				const items = document.querySelectorAll('.' + trigger);
				const _winHeigth = window.innerHeight;
				const _scroll = window.scrollY + _winHeigth;

				if (document.getElementsByClassName(trigger).length === 0) {
					return;
				}

				items.forEach((item) => {
					const _offSetTop = window.pageYOffset + item.getBoundingClientRect().top;
					const _heightCenter = window.innerHeight/2;

					if (_scroll > _offSetTop + _heightCenter) {
						item.classList.add('is-View');
					}
				});
			}
			scrollAniViewClass(trigger)
			
			document.addEventListener('scroll', throttle((e) =>
				scrollAniViewClass(trigger)));

			document.addEventListener('resize', e => {
				scrollAniViewClass(trigger)
			});
		}
		
		/*실행*/
		AniViewClass('a-Trigger');
		
		//
		//MediaBgScroll
		if($('.a-BgParallax').length > 0){
			gsap.utils.toArray(".a-BgParallax").forEach((section, i) => {
			  const heightDiff = section.offsetHeight - section.parentElement.offsetHeight;
			  
			  gsap.fromTo(section,{ 
				y: -heightDiff
			  }, {
				scrollTrigger: {
				  trigger: section,
				  scrub: true
				},
				y: 0,
				ease: "none"
			  });
			});
		}
		
		//
		//HeadSearchOpen
		function HeadSearchOpen() {
			$('.site-header').addClass('search-On');
			$('.HeadSerchBar-input').focus();
		}
		
		$(document).on('click', '.HeaderSearch-open', HeadSearchOpen);
		
		//
		//HeadSearchClose
		function HeadSearchClose() {
			$('.site-header').removeClass('search-On');
			$('.HeadSerchBar-input').val('');
		}
		
		$(document).on('click', '.HeaderSearch-close', HeadSearchClose);
		
				
		// ShareOpen
		//==================================================*
		function ShareOpen() {
			$('.ShareLink').addClass('is-View');
		}
		
		$(document).on('click', '.ShareLink-link', ShareOpen);
		
		// ShareClose
		//==================================================*
		function ShareClose() {
			$('.ShareLink').removeClass('is-View');
		}
		
		$(document).on('click', '.ShareLinkBoxHeader-btn', ShareClose);
		
		// List Fixed
		//==================================================*
		if($('.ExSide').length > 0){
			function ListSideFixed() {
				if (window.innerWidth > 1024) {
					let offsetTop = $('.ExSide').offset().top;
					let sideHeight = $('.ExhibitionSecFix').outerHeight();
					let cntHeight = $('.ExCnt').outerHeight();
					let screenHeight = $(window).height();
					let scrollHeight = offsetTop + sideHeight - screenHeight;
					let scrollStop = offsetTop + cntHeight - screenHeight;
					let headHeight = $('.site-header').outerHeight();
					
					if(sideHeight < cntHeight){
						if(offsetTop + sideHeight > screenHeight){
							if ($(document).scrollTop() > scrollHeight + 20) {
								$('.ExhibitionSecFix').addClass('is-Fix');
								
								if ($(document).scrollTop() > scrollStop + 20) {
									$('.ExhibitionSecFix').removeClass('is-Fix');
									$('.ExhibitionSecFix').addClass('is-Stop');
								}else{
									$('.ExhibitionSecFix').addClass('is-Fix');
									$('.ExhibitionSecFix').removeClass('is-Stop');
								}
							}else{
								$('.ExhibitionSecFix').removeClass('is-Fix');
							}
						}else{
							if ($(document).scrollTop() > offsetTop - headHeight - 10) {
								$('.ExhibitionSecFix').addClass('is-Top');
								
								if ($(document).scrollTop() > offsetTop + cntHeight - sideHeight - headHeight - 10) {
									$('.ExhibitionSecFix').removeClass('is-Top');
									$('.ExhibitionSecFix').addClass('is-Stop');
								}else{
									$('.ExhibitionSecFix').addClass('is-Top');
									$('.ExhibitionSecFix').removeClass('is-Stop');
								}
							}else{
								$('.ExhibitionSecFix').removeClass('is-Top');
							}
						}
					}
				}
			}
			
			ListSideFixed();
			
			window.addEventListener('scroll', function(){
				ListSideFixed();
			});
			
			window.addEventListener('resize', function(){
				ListSideFixed();
			});
		}
		
		// ExSideView
		//==================================================*
		function ExSideView() {
			if($('.ExSide').hasClass('is-View')){
				$('.ExSide').removeClass('is-View');
				$('html').removeClass('is-Hidden');
				$('.FixBottomBtn').removeClass('is-View').text('행사찾기');
			}else{
				$('.ExSide').addClass('is-View');
				$('html').addClass('is-Hidden');
				$('.FixBottomBtn').addClass('is-View').text('검색하기');
			}
		}
		
		$(document).on('click', '.FixBottomBtn', ExSideView);
		
		if($('.RangeSliderBx').length > 0){
			function RangeSlide() {
				const inputLeft = document.getElementById("input-left");
				const inputRight = document.getElementById("input-right");

				const thumbLeft = document.querySelector(".thumb.left");
				const thumbRight = document.querySelector(".thumb.right");

				const range = document.querySelector(".range");

				const setLeftValue = e => {
				  const _this = e.target;
				  const { value, min, max } = _this;

				  if (+inputRight.value - +value < 11) {
					_this.value = +inputRight.value - 11;
				  }

				  const percent = ((+_this.value - +min) / (+max - +min)) * 100;

				  thumbLeft.style.left = `${percent}%`;
				  range.style.left = `${percent}%`;
				};

				const setRightValue = e => {
				  const _this = e.target;
				  const { value, min, max } = _this;

				  if (+value - +inputLeft.value < 10) {
					_this.value = +inputLeft.value + 10;
				  }

				  const percent = ((+_this.value - +min) / (+max - +min)) * 100;

				  thumbRight.style.right = `${100 - percent}%`;
				  range.style.right = `${100 - percent}%`;
				};

				if (inputLeft && inputRight) {
				  inputLeft.addEventListener("input", setLeftValue);
				  inputRight.addEventListener("input", setRightValue);
				}
			}
			
			RangeSlide();
		}
		
		// SingleThumbFix
		//==================================================*
		if($('.EventDetail').length > 0){
			function SingleThumbFix() {
				if (window.innerWidth > 767) {
					let offsetTop = $('.EventDetail').offset().top;
					let sideHeight = $('.EventDetailThumbFix').outerHeight();
					let cntHeight = $('.EventDetailBox').outerHeight();
					let sideWidth = $('.EventDetailThumb').innerWidth();
					let screenHeight = $(window).height();
					let scrollStop = offsetTop + cntHeight - sideHeight;
					let headHeight = $('.site-header').outerHeight();
					
					$('.EventDetailThumbFix').css('width', sideWidth + 'px')
					
					if ($(document).scrollTop() > offsetTop - headHeight - 20) {
						$('.EventDetailThumbFix').addClass('is-Fix');
						
						if ($(document).scrollTop() > scrollStop + headHeight) {
							$('.EventDetailThumbFix').removeClass('is-Fix');
							$('.EventDetailThumbFix').addClass('is-Stop');
						}else{
							$('.EventDetailThumbFix').addClass('is-Fix');
							$('.EventDetailThumbFix').removeClass('is-Stop');
						}
					}else{
						$('.EventDetailThumbFix').removeClass('is-Fix');
					}
				}
			}
			
			SingleThumbFix();
			
			window.addEventListener('scroll', function(){
				SingleThumbFix();
			});
			
			window.addEventListener('resize', function(){
				SingleThumbFix();
			});
		}
		
		// FixLeftTab
		//==================================================*
		if($('.PageLeftTab').length > 0){
			function FixLeftTab() {
				if (window.innerWidth > 1280) {
					let offsetTop = $('.PageMediaWallSec').offset().top;
					let sideHeight = $('.PageLeftTab').outerHeight();
					let cntHeight = $('.HighlightBody').outerHeight();
					let cntHeightTop = $('.HighlightBody').offset().top;
					let screenHeight = $(window).height();
					let scrollStop = offsetTop + cntHeight - sideHeight;
					let headHeight = $('.site-header').outerHeight();
					
					if ($(document).scrollTop() > offsetTop - screenHeight/2 + sideHeight/2) {
						$('.PageLeftTab').addClass('is-Fix');
						$('.PageLeftTab').removeClass('is-Stop');
						
						if ($(document).scrollTop() > cntHeightTop + cntHeight - screenHeight - sideHeight/2) {
							$('.PageLeftTab').removeClass('is-Fix');
							$('.PageLeftTab').addClass('is-Stop');
						}
					}else{
						$('.PageLeftTab').removeClass('is-Fix');
					}
				}
			}
			
			FixLeftTab();
			
			window.addEventListener('scroll', function(){
				FixLeftTab();
			});
			
			window.addEventListener('resize', function(){
				FixLeftTab();
			});
		}
		
		
		// PostSelectOpen
		//==================================================*
		function PostSelectOpen() {
			var Select = $(this).parent('.PostSelect');
			if(Select.hasClass('is-Open')){
				Select.removeClass('is-Open');
			}else{
				Select.addClass('is-Open');
			}
		}
		
		$(document).on('click', '.PostSelectText', PostSelectOpen);
		
		$(document).mouseup(function (e){
			if(!$('.PostSelect').is(e.target) && $('.PostSelect').has(e.target).length === 0){
					$('.PostSelect').removeClass('is-Open');
			}
		});
		
		function PostSelectText() {
			var _this = $(this);
			var this_text = _this.text();
			_this.closest('.PostSelect').removeClass('is-Open');
			_this.closest('li').addClass('is-Current').siblings('li').removeClass('is-Current');
			_this.closest('.PostSelect').find('.PostSelectText-txt').text(this_text);
			return false;
		}
		
		$(document).on('click', '.PostSelectList-txt', PostSelectText);		
		
		// MapPageList
		//==================================================*
		function MapPageList() {
			const parent = $(this).closest('.MapPageList-item');
			const _link =  $(this).data('link');
			var idx = $(this).parent('.MapPageList-item').index();
			
			
			if($('.ParkingExit').length > 0){
				if($(this).parent().has('ul').length == 0){
					if(!parent.hasClass('is-Current')){
						$('.MapPageList-item').removeClass('is-Current');
						parent.addClass('is-Current');
						$('.MapPageListBxSub-item').removeClass('is-Current');
						$('.Maping-zoom').attr("src", _link);
					}
				}else{
					$('.MapPageList-item').removeClass('is-Current');
					$('.MapPageListBxSub-item').removeClass('is-Current');
					parent.addClass('is-Current');
				}
			}else{
				if(!parent.hasClass('is-Current')){
					parent.addClass('is-Current').siblings('.MapPageList-item').removeClass('is-Current');
					$('.Maping-zoom').attr("src", _link);
					if($('.MapMeans-item:nth-child(1)').hasClass('is-Current')){
						$('.MapInfoSec:nth-child(1)').find('.MapInfoSec-item').eq(idx).addClass('is-Current').siblings('.MapInfoSec-item').removeClass('is-Current');
					}else if($('.MapMeans-item:nth-child(2)').hasClass('is-Current')){
						$('.MapInfoSec:nth-child(2)').find('.MapInfoSec-item').eq(idx).addClass('is-Current').siblings('.MapInfoSec-item').removeClass('is-Current');
					}else if($('.MapMeans-item:nth-child(3)').hasClass('is-Current')){
						$('.MapInfoSec:nth-child(3)').find('.MapInfoSec-item').eq(idx).addClass('is-Current').siblings('.MapInfoSec-item').removeClass('is-Current');
					}else if($('.MapMeans-item:nth-child(4)').hasClass('is-Current')){
						$('.MapInfoSec:nth-child(4)').find('.MapInfoSec-item').eq(idx).addClass('is-Current').siblings('.MapInfoSec-item').removeClass('is-Current');
					}
				}
			}
		}
		
		$(document).on('click', '.MapPageListBxTitle-link', MapPageList);
		
		function MapPageListSub() {
			const parent = $(this).closest('.MapPageListBxSub-item');
			const _link =  $(this).data('link');
			var idx = $(this).parent('.MapPageListBxSub-item').index();
			
			
			if($(this).parent().has('ul').length == 0){
				if(!parent.hasClass('is-Current')){
					$('.MapPageListBxSub-item').removeClass('is-Current');
					parent.addClass('is-Current');
					$('.Maping-zoom').attr("src", _link);
				}
			}
		}
		
		$(document).on('click', '.MapPageListBxSub-link', MapPageListSub);
		
		// MapMeans
		//==================================================*
		function MapMeans() {
			var idx = $(this).parent('.MapMeans-item').index();
			const _link = $('.MapPageListSubCnt-item').eq(idx).find('.MapPageList-item:first-child .MapPageListBxTitle-link').data('link');
			
			$(this).parent('.MapMeans-item').addClass('is-Current').siblings('.MapMeans-item').removeClass('is-Current');
			$('.MapPageListSubCnt-item').eq(idx).addClass('is-Current').siblings('.MapPageListSubCnt-item').removeClass('is-Current');
			$('.MapPageListSubCnt-item').eq(idx).find('.MapPageList-item:first-child').addClass('is-Current').siblings('.MapPageList-item').removeClass('is-Current');
			$('.Maping-zoom').attr("src", _link);
			$('.MapInfoSec').eq(idx).addClass('is-Current').siblings('.MapInfoSec').removeClass('is-Current');
			$('.MapInfoSec').eq(idx).find('.MapInfoSec-item:first-child').addClass('is-Current').siblings('.MapInfoSec-item').removeClass('is-Current');
		}

		$(document).on('click', '.MapMeans-link', MapMeans);
		
		// MapTabOpen
		//==================================================*
		function MapTabOpen() {
			const nextItem = $(this).next('.MobileOpenBx');
			
			if(nextItem.hasClass('is-View')){
				nextItem.removeClass('is-View');
				$('html').removeClass('is-Hidden');
				$('.MapPageList-text').text(' 열기');
			}else{
				nextItem.addClass('is-View');
				$('html').addClass('is-Hidden');
				$('.MapPageList-text').text(' 닫기');
			}
		}
		
		$(document).on('click', '.MapPageList-link', MapTabOpen);
		
		// Highlight Nav Scroll
		//==================================================*
		$(document).on("scroll", onScroll);

		$('.PageLeftTab-link').on('click', function(e) {
			e.preventDefault();
			$(document).off("scroll");
			const navbarHeight = $('.site-header').outerHeight();

			$('.PageLeftTab-link').each(function() {
				$(this).closest('.PageLeftTab-item').removeClass('is-Current');
			})
			
			$(this).closest('.PageLeftTab-item').addClass('is-Current');
			
			var target = this.hash,
				menu = target;
				$target = $(target);
			
			var offsetTop = $target.offset().top - navbarHeight - 40;
			
			
			$('html, body').stop().animate({
				'scrollTop': offsetTop
			}, 300, 'swing', function() {
				$(document).on("scroll", onScroll);
			});
		});
		
		// 
		//InterestPopup Open
		function InterestPopup() {
			$('.Popup').addClass('is-View');
			$('html').addClass('is-Hidden');
		}
		
		$(document).on('click', '.ico-Notification', InterestPopup);	
		
		// 
		//InterestPopupClose
		function InterestPopupClose() {
			$('.InterestPopup').removeClass('is-View');
			$('html').removeClass('is-Hidden');			
		}
		
		$(document).on('click', '.PopupBox-close', InterestPopupClose);
		
		 // 
		// Custom Select
		function CustomSelecter() {
			$(this).parent('.ParkingFloorSelect').toggleClass('is-View');
		}
		
		$(document).on('click', '.ParkingFloorSelect-text', CustomSelecter);
		
		function CustomSelectOption() {
			var _this = $(this);
			var this_text = _this.text();
			const _link =  $(this).data('link');
			const _idx = $(this).closest('.ParkingFloorSelectList-item').index();
			
			_this.closest('.ParkingFloorSelect').removeClass('is-View');
			_this.parent('.ParkingFloorSelectList-item').addClass('is-Current').siblings('.ParkingFloorSelectList-item').removeClass('is-Current'); 
			_this.closest('.ParkingFloorSelectList').prev('.ParkingFloorSelect-text').text(this_text);
			$('.Maping-zoom').attr('src',_link);
			const _positionIdx = $(this).data('position');
			
			if($('.AmenitiesFloor').length > 0){
				$('.AmenitiesFloorListRadio-item').removeClass('is-Current'); 
				const childItem = $(this).find('.AmenitiesFloorListRadioItem');
				$('.ShopList-item').addClass('is-Current');
				var index;
				
				switch(_idx){
					case 1 :
						$('.AmenitiesFloorListRadio-item:nth-child(3) .AmenitiesFloorListRadioItem').attr('data-check', '/wp-content/uploads/2023/11/maps-amenities2-3b.png');
						$('.AmenitiesFloorListRadio-item:nth-child(5) .AmenitiesFloorListRadioItem').attr('data-check', '/wp-content/uploads/2023/11/maps-amenities2-5b.png');
					break
					case 2 :
						$('.AmenitiesFloorListRadio-item:nth-child(3) .AmenitiesFloorListRadioItem').attr('data-check', '/wp-content/uploads/2023/11/maps-amenities3-3b.png');
						$('.AmenitiesFloorListRadio-item:nth-child(5) .AmenitiesFloorListRadioItem').attr('data-check', '/wp-content/uploads/2023/12/maps-amenities3-5b.png');
					break
					case 3 :
						$('.AmenitiesFloorListRadio-item:nth-child(3) .AmenitiesFloorListRadioItem').attr('data-check', '/wp-content/uploads/2023/11/maps-amenities4-3b.png');
						$('.AmenitiesFloorListRadio-item:nth-child(5) .AmenitiesFloorListRadioItem').attr('data-check', '/wp-content/uploads/2023/11/maps-amenities4-5b.png');
					break
					default :
						$('.AmenitiesFloorListRadio-item:nth-child(3) .AmenitiesFloorListRadioItem').attr('data-check', '/wp-content/uploads/2023/11/maps-amenities1-3b.png');
						$('.AmenitiesFloorListRadio-item:nth-child(5) .AmenitiesFloorListRadioItem').attr('data-check', '/wp-content/uploads/2023/11/maps-amenities1-5b.png');
					break
				}
				
				$('.ParkingAmenities-item').eq(_idx).addClass('is-Current').siblings('.ParkingAmenities-item').removeClass('is-Current'); 
			}
			
			return false;
		}
		
		$(document).on('click', '.ParkingFloorSelectList-link', CustomSelectOption);
		
		$(document).mouseup(function (e){
				if(!$('.ParkingFloorSelect').is(e.target) && $('.ParkingFloorSelect').has(e.target).length === 0){
					$('.ParkingFloorSelect').removeClass('is-View');
				}
		});
		
		// 
		// amenities List
		function AmenitiesList() {
			const parent = $(this).closest('.AmenitiesFloorListRadio-item');
			const _idx = $(this).closest('.AmenitiesFloorListRadio-item').index();
			let _floor = $('.ParkingFloorSelect-text').text();
			let first_floor = _floor.charAt(0);
			var _data = $(this).data('check');
			const _src = '/wp-content/uploads/2023/11/maps-amenities';
			const _positionIdx = $(this).data('position');
			
			if(!parent.hasClass('is-Current')){
				parent.addClass('is-Current').siblings('.AmenitiesFloorListRadio-item').removeClass('is-Current');
				$('.Maping-zoom').attr('src',_data);
				
				$('.ShopList-item[data-position="' + _positionIdx + '"]').addClass('is-Current').siblings('.ShopList-item').removeClass('is-Current')
				
				switch(_idx){		
					case 2 :
						if(first_floor == 2){
							$('.ParkingFloorSelect-text').text('2F');
							$('.Maping-zoom').attr('src',_src + '2-3b.png');
							$('.ParkingFloorSelectList-item').eq(1).addClass('is-Current').siblings('.ParkingFloorSelectList-item').removeClass('is-Current');
							$('.ParkingAmenities-item').eq(1).addClass('is-Current').siblings('.ParkingAmenities-item').removeClass('is-Current'); 
						}else if(first_floor == 3){
							$('.ParkingFloorSelect-text').text('3F'); 
							$('.Maping-zoom').attr('src',_src + '3-3b.png');
							$('.ParkingFloorSelectList-item').eq(2).addClass('is-Current').siblings('.ParkingFloorSelectList-item').removeClass('is-Current');
							$('.ParkingAmenities-item').eq(2).addClass('is-Current').siblings('.ParkingAmenities-item').removeClass('is-Current'); 
						}else if(first_floor == 4){
							$('.ParkingFloorSelect-text').text('4F'); 
							$('.Maping-zoom').attr('src',_src + '4-3b.png');
							$('.ParkingFloorSelectList-item').eq(3).addClass('is-Current').siblings('.ParkingFloorSelectList-item').removeClass('is-Current');
							$('.ParkingAmenities-item').eq(3).addClass('is-Current').siblings('.ParkingAmenities-item').removeClass('is-Current'); 
						}else{
							$('.ParkingFloorSelect-text').text('1F'); 
							$('.Maping-zoom').attr('src',_src + '1-3b.png');
							$('.ParkingFloorSelectList-item').eq(0).addClass('is-Current').siblings('.ParkingFloorSelectList-item').removeClass('is-Current');
							$('.ParkingAmenities-item').eq(0).addClass('is-Current').siblings('.ParkingAmenities-item').removeClass('is-Current'); 
						}
					break
					
					case 4 :
						if(first_floor == 2){
							$('.ParkingFloorSelect-text').text('2F'); 
							$('.Maping-zoom').attr('src',_src + '2-5b.png');
							$('.ParkingFloorSelectList-item').eq(1).addClass('is-Current').siblings('.ParkingFloorSelectList-item').removeClass('is-Current');
							$('.ParkingAmenities-item').eq(1).addClass('is-Current').siblings('.ParkingAmenities-item').removeClass('is-Current'); 
						}else if(first_floor == 3){
							$('.ParkingFloorSelect-text').text('3F'); 
							$('.Maping-zoom').attr('src', '/wp-content/uploads/2023/12/maps-amenities3-5b.png');
							$('.ParkingFloorSelectList-item').eq(2).addClass('is-Current').siblings('.ParkingFloorSelectList-item').removeClass('is-Current');
							$('.ParkingAmenities-item').eq(2).addClass('is-Current').siblings('.ParkingAmenities-item').removeClass('is-Current'); 
						}else if(first_floor == 4){
							$('.ParkingFloorSelect-text').text('4F'); 
							$('.Maping-zoom').attr('src',_src + '4-5b.png');
							$('.ParkingFloorSelectList-item').eq(3).addClass('is-Current').siblings('.ParkingFloorSelectList-item').removeClass('is-Current');
							$('.ParkingAmenities-item').eq(3).addClass('is-Current').siblings('.ParkingAmenities-item').removeClass('is-Current'); 
						}else{
							$('.ParkingFloorSelect-text').text('1F'); 
							$('.Maping-zoom').attr('src',_src + '1-5b.png');
							$('.ParkingFloorSelectList-item').eq(0).addClass('is-Current').siblings('.ParkingFloorSelectList-item').removeClass('is-Current');
							$('.ParkingAmenities-item').eq(0).addClass('is-Current').siblings('.ParkingAmenities-item').removeClass('is-Current'); 
						}
					break
					
					case 7 :
						$('.ParkingFloorSelect-text').text('3F'); 
						$('.ParkingFloorSelectList-item').eq(2).addClass('is-Current').siblings('.ParkingFloorSelectList-item').removeClass('is-Current');
						$('.ParkingAmenities-item').eq(2).addClass('is-Current').siblings('.ParkingAmenities-item').removeClass('is-Current'); 
					break
					
					
					default :
						$('.ParkingFloorSelect-text').text('1F');
						$('.ParkingFloorSelectList-item').eq(0).addClass('is-Current').siblings('.ParkingFloorSelectList-item').removeClass('is-Current');
						$('.ParkingAmenities-item').eq(0).addClass('is-Current').siblings('.ParkingAmenities-item').removeClass('is-Current'); 
					break
				}
				
			}else{
				parent.removeClass('is-Current');
				$('.Maping-zoom').attr('src',_src + first_floor +'.png');
				$('.ShopList-item').addClass('is-Current');
			}
		}
		
		$(document).on('click', '.AmenitiesFloorListRadioItem', AmenitiesList);
		
		// 
		// PopupOpen
		function PopupOpen() {
			const data = $(this).data('openpop');
			$("#" + data).addClass('is-View');
			$('html').addClass('is-Hidden');
		}
		
		$(document).on('click', '[data-openpop]', PopupOpen);
		
		// Tabe Drag Cookie
		//==================================================*
		var setCookie = function(cname, cvalue, exdays) {
		  var d = new Date();
		  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		  var expires = "expires=" + d.toUTCString();
		  document.cookie = cname + "=" + cvalue + "; " + expires;
		}

		var getCookie = function(cname) {
		  var name = cname + "=";
		  var ca = document.cookie.split(';');
		  for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		  }
		  return "";
		}
		
		  if (getCookie("closed") == "closed") {
			$(".ScrollEvent").addClass('is-Hidden');
			$(".ScrollEvent").removeClass('is-View');
		  }else{
			$(".ScrollEvent").removeClass('is-Hidden');
			$(".ScrollEvent").addClass('is-View');
		  }

		  $(".ScrollEvent-bg").click(function() {
			$(".ScrollEvent").addClass('is-Hidden');
			$(".ScrollEvent").removeClass('is-View');
			setCookie("closed", "closed", 365)
		  });
		  
		// ScrollTable Check
		//==================================================*
		 function ScrollEventCheck() {
			 if($('.ScrollEvent').length > 0){
				if($('.ColorTable').length > 0){
					$('.ScrollEvent').each(function(){
						var scrollWidth = $(this).find('.ColorTable').prop("scrollWidth");
						if($(window).width() <= 1024){
							$.fn.hasScrollBar = function() {
								return (this.prop("scrollWidth") == 0 && this.prop("clientWidth") == 0) || (this.prop("scrollWidth") > this.prop("clientWidth"));
							  };
							
							if($(this).hasScrollBar()){
								$(this).addClass('is-Scroll');
							 }else{
								$(this).removeClass('is-Scroll');
							}
						}else{
							$(this).removeClass('is-Scroll');
						}
					});
				}else{
					$('.ScrollEvent').each(function(){
						var scrollWidth = $(this).find('.j-ScrollTbl').prop("scrollWidth");
						if($(window).width() <= 1024){
							$.fn.hasScrollBar = function() {
								return (this.prop("scrollWidth") == 0 && this.prop("clientWidth") == 0) || (this.prop("scrollWidth") > this.prop("clientWidth"));
							  };
							
							if($(this).hasScrollBar()){
								$(this).addClass('is-Scroll');
							 }else{
								$(this).removeClass('is-Scroll');
							}
						}else{
							$(this).removeClass('is-Scroll');
						}
					});
				}
			}
		 }
		ScrollEventCheck();
		$(window).on('resize', ScrollEventCheck);
		
		// OrganizationTab
		//==================================================*
		function OrganizationTab() {
			let _position = $(this).data('position');
			let _name = $(this).data('name');
			$('.OrganizationTab-text').text(_position);
			$('.OrganizationTab-name').text(_name);
		}
		
		$(document).on('click', '.OrganizationList-link, .OrganizationDepth-link', OrganizationTab);
		
		// HistorySubTab
		//==================================================*
		if($('.HistorySubTab').length > 0){ 
			function HistorySubTab() {
				const _scroll = $(document).scrollTop();
				let elemTop = $('.HistorySubTab').offset().top;
				
				if(_scroll > elemTop){
					$('.HistorySubTab .BoxTab').addClass('is-Fixed');
				}else{
					$('.HistorySubTab .BoxTab').removeClass('is-Fixed');
				}
			}
			
			HistorySubTab();
			$(window).on('scroll', HistorySubTab);
			$(window).on('resize', HistorySubTab);
		}
		
		// anKerSmooth
		//==================================================*
		function anKerSmooth() {
			var $root = $('html, body');
			var href = $.attr(this, 'href');

			$root.animate({
				scrollTop: $(href).offset().top
			}, 500, function () {
				window.location.hash = href;
			});
			return false;
		}
		
		$(document).on('click', '.HistorySubTab .BoxTab-link', anKerSmooth);
		
		
		// scrollHistory
		//==================================================*
		if($('.HistorySubTab').length > 0){ 
			function scrollHistory() {
				const _scroll = $(document).scrollTop();
				const _header = $('.site-header').outerHeight();
				const _navBox = $('.BoxTab').outerHeight();
				const _siteHead = _header + _navBox;
				
				$('.HistoryList-item[id*="history"]').each(function(idx){
					let elm = $(this).offset().top;
					if(_scroll > elm - _siteHead){
						$('.HistorySubTab .BoxTab-item').eq(idx).addClass('is-Current').siblings('.HistorySubTab .BoxTab-item').removeClass('is-Current');
					}else{
						
					}
					
				})
			}
			
			scrollHistory();
			$(window).on('scroll', scrollHistory);
			$(window).on('resize', scrollHistory);
		}
		
		//
		//TopSlideBanner Slider
		if($('.TopSlideBanner').length > 0){   
			$('.TopSlideBanner').each(function(){
				var _this = $(this);
				var _container = $(this).find('.TopSlideBanner-container');
				var _prev = $(this).find('.TopSlideBanner-prev');
				var _next = $(this).find('.TopSlideBanner-next');
				var _paging = $(this).find('.TopSlideBanner-pagination');
				var _swiperItem = $(this).find('.TopSlideBanner-item');
				
				if($(_swiperItem).length == 1){ 
					$(_paging).addClass('is-None');
				}
				
				gamesSwiper = new Swiper(_container, {      
					observer: true,
					observeParents: true,
					watchOverflow: true,
					slidesPerView: 1,
					navigation: {
					  nextEl: _next,
					  prevEl: _prev,
					},
					pagination: {
						el: _paging,
						clickable: true,
					},
					on: {
					  init: function init() {
						if(_this.hasClass('Small')){     
							var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
							var text = slide.data("text");
							$('.CaptionPost-text').text(text);
						}
						
						if(_this.hasClass('Type-color')){     
							var sub = slide.data("sub");
							var title = slide.data("title");
							var text = slide.data("text");
							$('.SkewBannerCnt-sub').text(sub);
							$('.SkewBannerCnt-title').text(title);
							$('.SkewBannerCnt-text').text(text);
						}
					  },
					  
					  slideChangeTransitionStart:function(){
						if(_this.hasClass('Small')){       
							var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
							var text = slide.data("text");
							$('.CaptionPost-text').text(text);
						}
						
						if(_this.hasClass('Type-color')){     
							var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
							var sub = slide.data("sub");
							var title = slide.data("title");
							var text = slide.data("text");
							$('.SkewBannerCnt-sub').text(sub);
							$('.SkewBannerCnt-title').text(title);
							$('.SkewBannerCnt-text').text(text);
						}
					  }
					},
				}); 
			}); 
		}
		
		// JsTab
		//==================================================*
		function JsTab() {
			const parent = $(this).closest('.j-ThisPrant');
			var idx = $(this).parent('.j-ThisPrant').index();

			if(!parent.hasClass('is-Current')){
				parent.addClass('is-Current').siblings('.j-ThisPrant').removeClass('is-Current');
				$('.j-BodyItem').eq(idx).addClass('is-Current').siblings('.j-BodyItem').removeClass('is-Current');
			}
		}
		
		$(document).on('click', '.j-TabLink', JsTab);
	});
})(jQuery);