const googlehome = require('google-home-notifier')

const message = process.argv[2] ? process.argv[2] : 'テストです';
googlehome.ip("192.168.1.17"); // ここはGoogleHomeのIPアドレス
googlehome.device('オフィス', 'ja');  // ここは GoogleHome の名前
googlehome.notify(message,  function(res) {
  console.log(res);
});
