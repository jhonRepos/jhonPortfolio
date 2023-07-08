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


AOS.init();


function scrollToview(select){

 var section =document.querySelector('.'+select);
 section.scrollIntoView({behavior:'smooth'});
}