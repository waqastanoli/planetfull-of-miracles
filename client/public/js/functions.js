
(function($) { 
	"use strict"  
	/* + Document On Ready */
	$(document).on("ready", function() { 
		//spinner -- quantity
		$('.quant-spi').number();

		// Related Product Carousel
		$('.related-product-carousel').owlCarousel({
		    loop:true,
		    margin:50,
		    nav:true,
		    dots: false,
		    responsive:{
		        0:{
		            items:1
		        },
		        600:{
		            items:3
		        },
		        1000:{
		            items:4
		        }
		    }
		})

		// Main Desc Pro Slider 
        $('#pro-desc-gallery').lightSlider({
            gallery:true,
            item:1,
            thumbItem:9,
            slideMargin: 0,
            speed:500,
            auto:true,
            loop:true,
            onSliderLoad: function() {
                $('#pro-desc-gallery').removeClass('cS-hidden');
            }  
        });
	});	
	
	/* - Document On Ready /- */  
})(jQuery); 