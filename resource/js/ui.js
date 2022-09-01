UI = {
	load : function(){
		$(document).load(function(){
            AOS.refresh();
		});
	},

	ready : function(){		
		$(document).ready(function(){
            includeHTML();
            AOS.refresh();
            UI.fn_slide_act();
            UI.fn_nav_act();
            UI.fn_header_fix();                       
            UI.fn_tab_act();
            ie_fixed();
            if($('.main-visual').length > 0){
                UI.fn_header_act(); 
            } 
		});
    },
    fn_slide_act : function(){
        var sliders = {
            1: {slider : '.m-slide01', mode : true, btnPrev: '.selector_next', btnNext: '.selector_prev', sPd: 3000},
            2: {slider : '.m-slide02', mode : false, btnPrev: '.selector_next2', btnNext: '.selector_prev2', sPd: 3000}            
        };
        $.each(sliders, function() {
            $(this.slider).slick({
                dots: false,
                slidesToScroll: 1,
                infinite: true,
                autoplay: true,
                autoplaySpeed: this.sPd,
                adaptiveHeight: true,
                speed: 400,
                fade: true,
                arrows:true,
                cssEase: 'linear',
                nextArrow: this.btnNext,
                prevArrow: this.btnPrev
            });
        });
    },
    fn_nav_act : function(){        
        $('body').on('click','#toggleNav', function(){
            if(!$(this).hasClass('active')){
                $(this).addClass('active');
                $('.header').removeClass('shrink');
                Layer_OPEN('.m-menu-pop');
                $('.m-content-tab.only-m').css('z-index','-1');
            }else{
                $(this).removeClass('active');
                $('.header').addClass('shrink');
                Layer_CLOSE('.m-menu-pop');
                $('.m-content-tab.only-m').css('z-index','105');
            }                        
        });
        $('.m-menu-pop .pop-in > ul > li').on('click',function(){
            $(this).toggleClass('open')
        });
    },
	fn_header_act : function (){	
        var header = $('.header');	
        var headerm = $('.header.only-m');        
        var scroll_obj = $(window);
        var detail_tab = $('.m-content-tab.only-m');
        var detail_tab_box = $('.content03').offset().top;
        var contentBox04 = $('.content04').offset().top - 60;
        var contentBox06 = $('.content06').offset().top - 60;
        var contentBox12 = $('.content12').offset().top - 60;

		var movement = function (){			
			if ( scroll_obj.scrollTop() > header.innerHeight() ){
                if(!$('.m-menu-pop').hasClass('open')){
                    header.addClass('shrink');
                }else{
                    header.removeClass('shrink');
                }
			}else {
				header.removeClass('shrink');	
			}
            if(scroll_obj.scrollTop() >= detail_tab_box && scroll_obj.scrollTop() < contentBox12){
                detail_tab.addClass('fixed');
                headerm.fadeOut(200);
                if (scroll_obj.scrollTop() < contentBox04){
                    $('.m-content-tab.only-m ul li').removeClass('active');
                    $('.m-content-tab.only-m ul li').eq(0).addClass('active');            
                }else if(scroll_obj.scrollTop() >= contentBox04 && scroll_obj.scrollTop() < contentBox06){
                    $('.m-content-tab.only-m ul li').removeClass('active');
                    $('.m-content-tab.only-m ul li').eq(1).addClass('active');                
                }else if(scroll_obj.scrollTop() >= contentBox06 && scroll_obj.scrollTop() < contentBox12){
                    $('.m-content-tab.only-m ul li').removeClass('active');
                    $('.m-content-tab.only-m ul li').eq(2).addClass('active');
                }
            }else{
                detail_tab.removeClass('fixed');
                headerm.fadeIn(200);
            }
            return;
        };
        scroll_obj.on({
            resize : function(){                
                detail_tab_box = $('.content03').offset().top;
                contentBox04 = $('.content04').offset().top - 60;
                contentBox06 = $('.content06').offset().top - 60;
                contentBox12 = $('.content12').offset().top - 60;
                scroll_obj.trigger('scroll');                
            },
            scroll : function() {
                movement();
            }
        });
    },
    fn_header_fix: function (){	
        var header = $('.header');       
        var scroll_obj = $(window);

		var movement = function (){			
			if ( scroll_obj.scrollTop() > header.innerHeight() ){
                if(!$('.m-menu-pop').hasClass('open')){
                    header.addClass('shrink');
                }else{
                    header.removeClass('shrink');
                }
			}else {
				header.removeClass('shrink');	
			}
            return;
        };
        scroll_obj.on({
            scroll : function() {
                movement();
            }
        });
    },    
    fn_tab_act : function(){
        $(".m-content-tab li a").on("click", function(e) {
            var targetHash = $(this).attr("href");
            e.preventDefault();
            if($(this).parents('.m-content-tab').hasClass('only-m')){
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');                
            }
            $('html,body').animate({scrollTop : $(targetHash).offset().top - 50},300);           
        });                
    }
}

UI.load();
UI.ready();

var Layer_OPEN = function (obj){
    $(obj).addClass('open');
    $('body, html').css({'height':'auto','overflow':'hidden'});
};

var Layer_CLOSE = function (obj){
    $(obj).removeClass('open');
    $('body, html').css({'height':'','overflow':''});
};

var ie_fixed = function (){
    if(navigator.userAgent.match(/Trident\/7\./)) { // if IE
        $('body').on("mousewheel", function () {
            // remove default behavior
            event.preventDefault(); 
            //scroll without smoothing
            var wheelDelta = event.wheelDelta;
            var currentScrollPosition = window.pageYOffset;
            window.scrollTo(0, currentScrollPosition - wheelDelta);
        });
    }
}
function includeHTML(){ 
    var z, i, elmnt, file, xhttp; z = document.getElementsByTagName("*"); 
    for (i = 0; i < z.length; i++) { 
        elmnt = z[i]; 
        file = elmnt.getAttribute("include-html"); 
        if (file) { 
            xhttp = new XMLHttpRequest(); 
            xhttp.onreadystatechange = function() { 
                if (this.readyState == 4 && this.status == 200) { 
                    elmnt.innerHTML = this.responseText; 
                    elmnt.removeAttribute("include-html"); 
                    includeHTML();
                } 
            } 
            xhttp.open("GET", file, true); 
            xhttp.send(); 
            return; } 
        } 
}



