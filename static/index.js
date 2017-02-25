//Variable setup.
var openpgp;
var privkey;
var pubkey;
var passp;
function startChat(){
  document.getElementById('chatModal').disabled = true;
  document.getElementById('chatModalBody').innerHTML = "<br><br><center>waiting for room to start on the server...</center><br><br>";
  //check keys - make sure they are PGP.
  //then start chat..
  document.getElementById('chatModal').disabled = false;
}
function genKeys(){
  if(document.getElementById('privatekey').innerHTML !== "" || document.getElementById('publickey').innerHTML !== "" || document.getElementById('keypass').value !== ""){
    checkKeys();
    return;
  }
  document.getElementById('genk').disabled = true;
  //Do things
  var openpgp = window.openpgp;
  openpgp.initWorker({ path:'./dist/js/openpgp.worker.js' });
  openpgp.config.aead_protect = true;
  var passp = genString();
  var options = {
    userIds: [{ name:document.getElementById('username').value, email:document.getElementById('email').value }], // multiple user IDs
    numBits: 4096,                                            // RSA key size
    passphrase: passp         // protects the private key
  };
  openpgp.generateKey(options).then(function(key) {
      var privkey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
      var pubkey = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
      document.getElementById('privatekey').innerHTML = privkey;
      document.getElementById('publickey').innerHTML = pubkey;
      document.getElementById('keypass').value = passp;
      document.getElementById('startc').disabled = false;
  });
}
function saveKey(){

}
function genString(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 26; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function checkKeys(){
  alert("Looks like data is not clean - clean inputs and try again!");


  return;
}
function tos(){

}
function startModal(){
  $(function () {
        $('#chatModal').modal({
            show: true,
            keyboard: false,
            backdrop: 'static'
        });
    });
}
function stopModal(){
  //Do stuff like close chat and logoff.

  //Then close the modal.
  $(function () {
        $('#chatModal').modal('hide');
    });
}
