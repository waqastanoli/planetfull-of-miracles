$(document).ready(function(){
  $('#oneslider').slick({
  	arrows:false,
  	autoplay: true,
  	dots: true,
  	dotsClass: 'slick-dots',
});
  $('#thumbSlider').slick({
  	arrows:false,
  	autoplay: true,
  	dots: true,
  	dotsClass: 'slick-dots',
  	fade: true,
  	draggable: false,
});

  
  $('.TabFirst').tabslet();
  $('.TabSecond').tabslet();
  
// Get the modal
var body = document.getElementsByTagName("body")[0];
var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
if(btn)
btn.onclick = function() {
  modal.style.display = "block";
  body.classList.add("hidden");
}
if(span)
span.onclick = function() {
  modal.style.display = "none";
  body.classList.remove("hidden");
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    body.classList.remove("hidden");
  }
}
});

