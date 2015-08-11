
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',

  init: function() {
    app.friends = []; //only runs once vs a property on app directly
    this.fetch();
    window.setInterval(app.fetch, 10000);
    $(document).ready(function(){
       $("#main").on("click", ".username", function(){
         var $newFriend = $(this).find(".username").context.innerHTML;
         app.addFriend($newFriend);
       });

       $("#send").submit(function(event){
         var $pushMessage = $(this).find("#message").val();
         console.log($pushMessage);
         var $room = $(this).find("#roomname").val();
         console.log($room);
         app.handleSubmit($pushMessage, $room);
         event.stopImmediatePropagation(); //lookup
       });
       //submit handler for adding a new room-  using a common one
       //take values from text field and dropdown list? Try one at a time
       //var $pushRoom = $(this).find("#roomname").val();
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

      //Add after the basic structure, if true just addClass to $text
    var $post = $('<div class = "post"> </div>');
    var $username = $('<div class = "username"> </div>').text(message.username);
    var $text = $('<div class = "text"> </div>').text(message.text);
    var $room = $('<div class = "roomname"></div>').text(message.roomname); //filter on roomname
    app.addRoom(message.roomname);

    $post.append($username,$text, $room);
      if (app.friends.indexOf(message.username) >= 0) {
      $text.addClass("friend");
      $('#chats').append($post);
    } else {
      $('#chats').append($post);
    }
  },

  addRoom: function(room) {
    $('#roomSelect').append('<option>' + room + '</option>');
    //this should take the value from submit form(handler) and add the room
    //just like add message
  },
  // friends: [],
  addFriend: function(friend) {
    app.friends.push(friend);
    console.log(app.friends);
  },

  handleSubmit: function(message,room) {
    var msg = {};
    msg.username = window.location.search.split("=")[1];
    msg.text = message;
    msg.roomname = room;
    app.send(msg);
  }
}

app.init();

/* console.log(data) returns -->
    {
       results: [
          { username: 'John Doe', text: 'Hello!', roomname: 'blah' },
          { username: 'Jenny Doe', text: 'Greetings!', roomname: 'blah blah' }
       ]
    }
*/

// one option: create rooms as objects, and add to DOM only the unique ones
/*$("#roomSelect option").each(function() {
      if($.inArray(message.roomname) === -1){
        app.addRoom(message.roomname);
      } */

