//Cache reference to window and animation items
var $timeLineBoxes= $(".timelineElement");


$(window).on("load",function() {
    $(window).on('scroll', animateOnScroll);
    $(".timelineElement").children().each(function(){
        $(this).css("opacity", 0);
    });
    adjustHeadings();
    $(window).trigger('scroll');




});

function animateOnScroll(){

    // $animation_elements.(function() {
    //     var objectBottom = $(this).offset().top + $(this).outerHeight();
    //     var windowBottom = $(window).scrollTop() + $(window).innerHeight();
    //
    //     if (objectBottom < windowBottom) { //object comes into view (scrolling down)
    //
    //     }
    //     else{
    //         if ($(this).css("opacity")==1) {$(this).fadeTo(500,0);}
    //     }
    //
    // });



    $(".timelineElement").children().each(function() {
        var objectBottom = $(this).offset().top + $(this).outerHeight();
        var objectTop =  $(this).offset().top;
        var windowBottom = $(window).scrollTop() + $(window).innerHeight();

        if (objectBottom < windowBottom) { //object comes into view (scrolling down)
            $(this).addClass("in-view");
            //we don't want to have to undo all the animations and show them again once they've already happened once
            //because it'd be annoying to implement and also annoying to the user
            //so we just fade them in and out on scroll
            if ($(this).hasClass("finished-animation")) {

                if($(this).css("opacity") <= 0.05){$(this).fadeTo(500, 1);}
            }
            else{
                if ($(this).is("h2")) {


                    if ($(this).parent().is(".right")) {
                        $(this).animate(
                            {
                                // to animate it moving towards the right
                                'margin-left': '10%',
                                'opacity': '1'

                            }, 500,
                            function () {
                                //finished animating
                                $(this).addClass("finished-animation");
                            }
                        );
                    }
                    if ($(this).parent().is(".left")) {
                        $(this).animate(
                            {
                                // to animate it moving towards the left
                                'margin-right': '10%',
                                'opacity': '1'

                            }, 500,
                            function () {
                                //finished animating
                                $(this).addClass("finished-animation");
                            }
                        );
                    }

                }
                if ($(this).is("h3")) {

                    $(this).animate(
                        {
                            //animated to move down
                            'background-size': '100%',
                            'margin-top': '0px',
                            'opacity': '1'

                        }, 500,
                        function () {
                            $(this).addClass("finished-animation");
                        }
                    );

                }
                if ($(this).is("h4")) {
                    $(this).animate(
                        {
                            //leave this negative margin to compensate for the height of the text, we actually want
                            // to pretend the text isn't there
                            'margin-top': '-22px',
                            'opacity': '1'
                        }, 500,
                        function () {
                            $(this).addClass("finished-animation");
                        }
                    );

                }

                else
                    $(this).animate(
                        {

                            //fade elements in on scroll by default
                            'opacity': '1'

                        }, 500,
                        function () {
                            $(this).addClass("finished-animation");
                        }
                    );

            }
        }

        else if(objectTop > windowBottom){ //object comes fully out of view
            $(this).removeClass("in-view");
            //fade out animation elements that have completed their animation in
            if($(this).css("opacity") > 0.95 && $(this).hasClass("finished-animation")){$(this).css("opacity", 0)}

        }
    });

    /*
    $(".timelineElement").children(".finished-animation").each(function(){
            if($(this).hasClass("in-view")) {
                if($(this).css("opacity") == 0){$(this).fadeTo(500, 1);}
            }
            else
                if($(this).css("opacity") == 1){$(this).fadeTo(500, 0);}
        }

    );
    */


}
//adjust size of timeLine element heading if it has no information / paragraph box
function adjustHeadings(){
    $timeLineBoxes.each(function() {
        //select timeline divs that don't contain a p tag
        if($(this).has("p").length == false) {
            $(this).find("h3").css("padding-top", 25);
            $(this).find("h3").css("padding-bottom", 25);
            //$(this).find("h3").css("background-image", 'url(img/titleBackground.png)');
        }
    })
}

/*
function addIncreaseInfoBoxSizeButton(){
    $timeLineBoxes.each(function() {

        var element = $(this).find("p");
        //if our paragraph element has overflowed
        if (element[0].scrollWidth >  element.innerWidth()) {
            //add increase size button
           element.after("<h3> test </h3>");
        }
})
}
*/


