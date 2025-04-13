$(document).ready(function() {
    // declare slideIndex at top
    let slideIndex = 1;
    
    // showSlides function
    const showSlides = function(n) {
        const slides = $(".mySlides");
        const dots = $(".dot");
        
        // wrap around if at end
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        
        // hide all slides
        slides.hide();
        dots.removeClass("active");
        
        // current slide 
        $(slides[slideIndex-1]).show();
        $(dots[slideIndex-1]).addClass("active");
    };

    // next/prev
    const plusSlides = function(n) {
        showSlides(slideIndex += n);
    };
    
    // thumbnail/dot 
    const currentSlide = function(n) {
        showSlides(slideIndex = n);
    };
    
    // initialize
    showSlides(slideIndex);
    
    // event handlers
    $(".slideshow-prev").on("click", function() {
        plusSlides(-1);
    });
    
    $(".slideshow-next").on("click", function() {
        plusSlides(1);
    });
    
    $(".dot").on("click", function() {
        currentSlide($(this).index() + 1);
    });
    
    $(".thumbnail").on("click", function() {
        currentSlide($(this).index() + 1);
    });
    
    // advance every 5 seconds
    setInterval(function() {
        plusSlides(1);
    }, 5000);
});