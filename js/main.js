;(function(){
  var current=0;
  grayscale($(".next img"));
  $(".next").click(function(){
    grayscale.reset($(".next img"));
    current++;
    $(".item").eq(current).show().siblings(".item").hide();
    $(".step").children().eq(current).removeClass("next");
    grayscale($(".next img"));
  })
  $(".pop-xieyi").click(function(){
    $(".mask").fadeIn(200);
    setTimeout(function(){
      $(".pop").css("top",0)
    },500)
  })
  $(".close").click(function(){
    $(this).parents(".pop").css("top","-150%");
    setTimeout(function(){
      $(".mask").fadeOut(200)
    },500)
  })
  $("input").change(function(){
    var val=$(this).val();
    $(".form.items").eq(val).show().siblings(".form.items").hide();
  })
})()
;(function(){
  $(".name").click(function(e){
    var e=e||event;
    e.stopPropagation();
    $(this).siblings(".more").slideDown();
  })
  $(document).click(function(){
    $(".more").slideUp();
  })
})()