$(function(){
  function buildHTML(message){
    var image = message.image ?  `<img class="lower-message__image" src="${message.image}" />` : '' ;
    var html =  `<div class='message'>
      <div class='heigher-message'>
        <div class='heigher-message__name'>
          ${message.user_name}
        </div>
        <div class='heigher-message__date'>
          ${message.date}
        </div>
      </div>
      <div class='lower-message'>
        <p class='lower-message__content'>
          ${message.content }
        </p>
        ${image}
      </div>
    </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({scrollTop: 200000});
    })
    .fail(function(){
      alert('error');
    })
  })
});


