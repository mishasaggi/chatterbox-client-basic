
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',

  init: function() {
    this.fetch();
    window.setInterval(app.fetch, 6000);
    $(document).ready(function(){
       $("#main").on("click", ".username", function(){
         var $newFriend = $(this).find(".username").context.innerHTML;
         console.log($(this).find(".username"), "whole object");
         console.log($newFriend, "newFriend");
         app.addFriend();
       });

       $("#send").submit(function(event){
         var $pushMessage = $(this).find("#message").val();
         console.log($pushMessage);
         app.handleSubmit($pushMessage);
         event.stopImmediatePropagation(); //lookup
       });
    });
  },

  send: function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: Message sent');
      },
      error: function(data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  fetch: function(message) {
    $.ajax({
      url: app.server,
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        app.clearMessages();
        for(var i=0; i< data.results.length; i++){
            app.addMessage(data.results[i]);
        }
      },
      error: function(data) {
        console.error('chatterbox: Failed to fetch message');
      }
    });
  },

// DOM MODIFICATIONS

  clearMessages: function() {
    $('#chats').children().remove();
  },

  addMessage: function(message) {
     var $post = $('<div class = "post"> </div>');
     var $username = $('<div class = "username"> </div>').text(message.username);
     var $text = $('<div class = "text"> </div>').text(message.text);
     $post.append($username,$text);
     $('#chats').append($post);
  },

  addRoom: function(room) {
    $('#roomSelect').append('<option>' + room + '</option>');
  },

  addFriend: function() {
    // add class 'friend' to the selected username (clicked)
    // add bold to friend css
  },

  handleSubmit: function(message) {
    var msg = {};
    msg.username = window.location.search.split("=")[1];
    msg.text = message;
    app.send(msg);
  }
}

app.init();

/* console.log(data) returns -->
    {
       results: [
          { username: 'John Doe', text: 'Hello!' },
          { username: 'Jenny Doe', text: 'Greetings!' }
       ]
    }
*/
