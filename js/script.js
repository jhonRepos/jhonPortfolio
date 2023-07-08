var bars =document.getElementById('bars');
var xbtn =document.getElementById('xbtn');
var selectionmenu =document.getElementById('selectionmenu');
var clickBtn =document.getElementById('clickBtn');



bars.addEventListener('click',function(){

    bars.style.display='none';
    xbtn.style.display='block';
    selectionmenu.style.display='block';
    clickBtn.style.display='block';
    
});
xbtn.addEventListener('click',function(){
    bars.style.display='block';
    xbtn.style.display='none';
    selectionmenu.style.display='none';
    clickBtn.style.display='none';
});


// AOS.init();


function scrollToview(select){

 var section =document.querySelector('.'+select);
 section.scrollIntoView({behavior:'smooth'});
}


window.addEventListener("scroll", function() {
    var windowBottom = window.pageYOffset + window.innerHeight;
    var slideInElements = document.querySelectorAll(".animation");
    
    slideInElements.forEach(function(element) {
      var objectBottom = element.offsetTop + element.offsetHeight;
      if (objectBottom < windowBottom) {
        element.classList.add("animated");
      }
      else {
        element.classList.remove("animated");
        element.classList.add("scale-out-center");
       
      }
    });
  });
  window.dispatchEvent(new Event("scroll"));



  