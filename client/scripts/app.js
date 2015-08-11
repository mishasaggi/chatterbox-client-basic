
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
var app = {
  init: function() {
    //messages should pop up
    //textbox to post messages

    $(document).ready(function(){
      console.log("Hi!");
    });
  },

// sending message to the server
  send: function(message) {
          console.log(app.server);
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        var msg = message.username + ': ' + message.text; // do we need to handle this in success at all?
        console.log(msg);
        console.log('chatterbox: Message sent');
      },
      error: function(data) {

        console.error('chatterbox: Failed to send message');
      }
    });
  },

// fetching messages from the server
// for loop to grab messages from the server
  fetch: function(message) {
    $.ajax({
      type: 'GET',
      data: JSON.stringify(message), //?
      contentType: 'application/json',
      success: function(data) { //which is the array/stack of messages?
        // for(var i=0; i<.length; i++){
        //     // iterate through all msgs and use addMessage()
        // }
        console.log('chatterbox: Message recieved');
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
     console.log(typeof message);
     console.log(message);
     $('#chats').append('<div class="posts">' + message.username + " : " + message + "</div>").show();
//$('#chats').append('<div class="posts">' + message + "</div>");
  },

  addRoom: function(room) {
    $('#roomSelect').append('<option>' + room + '</option>');
  }


}


// working version of submit button
// $('.submitButton').on('click', function () {
//   var test = $('.userInput').val();
//   // app.addMessage(test);  // we need to connect it to some ajax method
// });
