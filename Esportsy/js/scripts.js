$(document).ready(function(){

  var elemLeftPos,
      elemWidth,
      targetPos,
      sidebarBottomPos = $('.sidebar').offset().top + $('.sidebar').height() + 22,
      contentBottomPos = $('.content').offset().top + $('.content').height() + 22,
      counter = 1;

  $(window).on('scroll', sidebarFixed);
  $(window).on('scroll', infiniteScroll);
  $(window).on('resize', sidebarResponsive);



  // functions
  function sidebarFixed() {
    var scrollPos = $(this).height() + $(this).scrollTop();

    if(scrollPos >= sidebarBottomPos) {
      elemLeftPos = $(".content").offset().left;
      elemWidth = $(".content").width() + 22;
      currentPos = elemLeftPos + elemWidth;

      $(".sidebar").css({
        "position": "fixed",
        "left": currentPos,
        "bottom": "0"
      });
    } else {
      $(".sidebar").css({
        "position": "static"
      });
    }
  }

  function sidebarResponsive() {
    if ($(".sidebar").css("position") !== "fixed") {
      $(".sidebar").css({
        "position": "static"
      });
    } else {
      elemLeftPos = $(".content").offset().left;
      elemWidth = $(".content").width() + 22;
      currentPos = elemLeftPos + elemWidth;
      $(".sidebar").css({
        "position": "fixed",
        "left": currentPos,
        "bottom": "0"
      });
    }
  }

  function infiniteScroll(){
    var scrollPos = $(this).height() + $(this).scrollTop();
    if (scrollPos == contentBottomPos) {

      $(".preloader").css("display", "block");

      if (counter == 5) {
        $(".preloader").css("display", "none");
        $(".content").append("<p class='no-more-posts'>There are no more posts to display.</p>")
        return;
      }

      setTimeout(function(){

          $.ajax({
            dataType: "html",
            url: "new-posts-" + counter + ".html",
            success: function (data) {
                $(".preloader").before(data);
                $(".preloader").css("display", "none");
                contentBottomPos = $('.content').offset().top + $('.content').height() + 22;
                counter++;

            }
          });

      }, 3000)
    }
  }

})
