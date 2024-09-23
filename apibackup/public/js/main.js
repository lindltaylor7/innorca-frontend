/* eslint-env jquery, browser */
$(document).ready(() => {
  window.setTimeout(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
    });
  }, 5000);


  $('.multiselect').select2({
    placeholder: 'Proyecto(s) de interés'
  });
});
$(function () {
  $('#WAButton').floatingWhatsApp({
      phone: '+51977748635',
      showPopup: false,
      backgroundColor: '#F6871B',
      buttonImage: '<img src="/images/whatsapp menorca.svg" />',
      position: "right"

  });
});
const titleMap = document.querySelectorAll(".titleMap");
	if(titleMap){
		for (let i = 0; i < titleMap.length; i++) {
			const data = titleMap[i].getAttribute("content").toString();
			var HTMLelement = document.getElementById("map_"+i)
			HTMLelement.innerHTML = data;  
		}
  }