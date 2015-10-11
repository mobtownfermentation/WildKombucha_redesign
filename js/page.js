$(document).ready(function(){

    var menu = document.getElementById('navMenu');
    var trigger = window.outerHeight-menu.offsetHeight;
    var mobileSoc = document.getElementById('mobileSoc');

    window.onscroll = dockMenu;
    var docked = false;
    function dockMenu() {
      //console.log(window)
      if (window.pageYOffset >= trigger && docked == false){
        var menuH = menu.offsetHeight;
        menu.style.position = 'fixed';
        menu.style.top = 0;
        menu.style.height = menuH+'px';
        docked = true;   
        if (window.innerWidth >555){
          mobileSoc.style.display = 'none';
        }else{
          mobileSoc.style.display = 'block';
        }
      }else if (window.pageYOffset < trigger && docked == true){
        menu.style.position = 'absolute';
        var menuH = menu.offsetHeight;
        menu.style.height = menuH+'px';
        menu.style.top = null;
        menu.style.bottom = 0;
        docked = false;
        mobileSoc.style.display = 'none';
      }
    }

   window.onresize = menuChange;
    function menuChange(){
      if (window.innerWidth >550){
        menu.style.height='70px';
        mobileSoc.style.display = 'none';
      }else{
        menu.style.height = '140px';
        if (docked == true){
          mobileSoc.style.display = 'block';
        }
        clearInterval(picInterval);
        $('#picSubRow').animate({marginLeft:'0%'},700);
        $('.galleryBtn.left').css('display','block');
        $('.galleryBtn.right').css('display','none');
      }
    }

    document.getElementsByClassName('toTop')[0].onclick = navigation;
    var navBtns = document.getElementsByClassName('pageNav');
    for (var i=0;i<navBtns.length;i++){
      navBtns[i].onclick = navigation;
    }

    function navigation(e){
      e.preventDefault();
      var scrollId = this.href.split("#")[1];
      var scrollDiv = document.getElementById(scrollId);
      var rect = scrollDiv.getBoundingClientRect();
      var currentScroll = window.scrollY;
      var menuH = menu.offsetHeight;
      var scrollDist = rect.top+currentScroll-(menuH+20);
      $('body').animate({
        scrollTop:scrollDist
      },800)
    }


      //FillDate
    var targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 14);
    var dateString = targetDate.toDateString();
    var dateBits = dateString.split(" ");
    var day = dateBits[0];
        if (day == "Tue"){
            day = "Tuesday"
        } else if (day == "Wed"){
            day = "Wednesday"
        } else if (day == "Thu"){
            day = "Thursday"
        } else if (day == "Sat"){
            day = "Saturday"
        } else {
            day = day+"day"
        };
    var month = dateBits[1];
        if (month == "Jan"){
            month = "January"
        } else if (month == "Feb"){
            month = "February"
        } else if (month == "Mar"){
            month = "March"
        } else if (month == "Apr"){
            month = "April"
        } else if (month == "Jun"){
            month = "June"
        } else if (month == "Jul"){
            month = "July"
        } else if (month == "Aug"){
            month = "August"
        } else if (month == "Sep"){
            month = "September"
        } else if (month == "Oct"){
            month = "October"
        } else if (month == "Nov"){
            month = "November"
        } else if (month == "Dec"){
            month = "December"
        };
    var num = dateBits[2];
        if (num.split("")[0] == 0){
            num = num.split("")[1]
        }
    var dateinfo = day + " " + month + " " + num;
    $("#fillDate").html(dateinfo);

    //datepicker
    $("#datepicker").datepicker({
        minDate: targetDate
    });

    //form
    $(".fillout").on("keyup change", function(){
        var length = $(this).val().length;
        if(length >0){
            $(this).removeClass('empty').addClass('filled');
        }else{
            $(this).removeClass('filled').addClass('empty');
        }
        var empties = $(".empty").length;
        if(empties==0){
            $("#submit").show();
        }else{
            $("#submit").hide();
        }
    });
    $("form").bind("keypress", function (e) {
    if (e.keyCode == 13) {
        $(".fillout").attr('value');
        e.preventDefault();
        }
    });
    $("#submit").on("click", function(){
        alert("Thank you!")
    });
    var urlBase = window.location.toString().split("#")[0];
    $('[name="_next"]').val(urlBase);

    //gallery sliders
    function moveL(){
      $('#picSubRow').animate({marginLeft:'-100%'},700);
      $(this).fadeOut(700)
      $(".galleryBtn.right").fadeIn(700);
    }

    function moveR(){
      $('#picSubRow').animate({marginLeft:'0%'},700);
      $(this).fadeOut(700)
      $(".galleryBtn.left").fadeIn(700);
    }

    $(".galleryBtn.left").on('click',moveL);
    $(".galleryBtn.right").on('click',moveR);

    var picSide = true;
    var picInterval = setInterval(function(){
      if (picSide){
        $('.galleryBtn.right').click();
        picSide = false;
      }else{
        $('.galleryBtn.left').click();
        picSide = true;
      }
    },10000)

    $("#picRow").on("mouseover touchstart",function(){
      clearInterval(picInterval);
    });

    if (window.innerWidth <=550){
      clearInterval(picInterval);
    }
  
  var curr = 0;
  var mv = 0;
  function histWorks(){   
    function moveD(){
      mv += 1;
      curr=257*mv*(-1);
      if (mv==3){
        $('.galleryBtn.down').fadeOut(700);
      }
      if (mv>0){
        $('.galleryBtn.up').fadeIn(700);
      }
      $('#inHistRow').animate({marginTop:curr+'px'},700);
    }

    function moveU(){
      mv -= 1;
      if (mv==-1){mv=0};
      curr =257*mv*(-1);
      if (mv==0){
        $('.galleryBtn.up').fadeOut(700);
      }
      if (mv<3){
        $('.galleryBtn.down').fadeIn(700);
      }
      $('#inHistRow').animate({marginTop:curr+'px'},700); 
    }

    $(".galleryBtn.up").on('click',moveU);
    $(".galleryBtn.down").on('click',moveD);
  }
  histWorks();

  var timeSlider = setInterval(function(){
      mv += 1;

      if (mv == 3){
          $('.galleryBtn.down').fadeOut(700);
      }
      if (mv==4){
        mv=0;
      }
      if (mv == 0){
        $('.galleryBtn.down').fadeIn(700);
        $('.galleryBtn.up').fadeOut(700);
      };
      if (mv>0){
        $('.galleryBtn.up').fadeIn(700);
      }
      curr = 257*mv*(-1);
      $('#inHistRow').animate({marginTop:curr+'px'},700);

    },7000);

  $("#histRow").on("mouseover touchstart",function(){
    clearInterval(timeSlider);
  });

  $("#histRow").on("mouseout touchend", function(){
    timeSlider = setInterval(function(){
      mv += 1;
      if (mv == 3){
          $('.galleryBtn.down').fadeOut(700);
      }
      if (mv==4){
        mv=0;
      }
      if (mv == 0){
        $('.galleryBtn.down').fadeIn(700);
        $('.galleryBtn.up').fadeOut(700);
      };
      if (mv>0){
        $('.galleryBtn.up').fadeIn(700);
      }
      curr = 257*mv*(-1);
      $('#inHistRow').animate({marginTop:curr+'px'},700);

    },7000);
  });

});//pageReady
