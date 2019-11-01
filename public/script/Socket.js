
$(function () {
     var socket = io();

    socket.on('user connected',function(){
      var usuarioNome =  document.getElementById('usuarioView').value
        $('#messages').append($('<li>').text( usuarioNome + ' Connected'));
      })
    $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading´
      var usuarioNome =  document.getElementById('usuarioView').value
      var mensagem = usuarioNome+ ':' + $('#m').val(); 
      console.log(mensagem)
      socket.emit('chat message', mensagem);
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    })
  });



 



