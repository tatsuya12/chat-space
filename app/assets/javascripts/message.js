$(function(){
  function buildHTML(message){
    var image = message.image ?  `<img class="lower-message__image" src="${message.image}" />` : '' ;
    var html =  `<div class='message data-message-id="${message.id}"' >
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
      $('.messages').append(html);
      $('.messages').animate({scrollTop: 200000});
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
      buildHTML(data);
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })

  $(function(){
    setInterval(update, 5000);
  });
  function update(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.message:last').data('message_id');
      $.ajax({
        url: location.href,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
        if (messages.length !== 0) {
          messages.forEach(function(message){
            buildHTML(message);
          });
        }
      })
      .fail(function(){
        alert('自動更新に失敗しました')
      })
    } else {
      clearInterval(update);
    }
  }
});


