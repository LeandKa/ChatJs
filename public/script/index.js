function rodar(){
    var usuarios = ['Francis','Bruna','Howard','Franchine'];

    var numero = Math.floor(Math.random() * 4); 
    
    var usuarioNome =  document.getElementById('usuarioView').value = usuarios[numero];
    console.log(usuarioNome);
}

