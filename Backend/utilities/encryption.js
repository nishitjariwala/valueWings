const base64url = require('base64url');
var _crypt =require('cryptlib'),

key = _crypt.getHashSha256('Value@Wings#04', 32),
iv = 932730381405572, 


encrypt = function (plaintext) {
    console.log("in encryption method.....");
        plainText = plaintext;
    console.log("Plain Text");
    console.log(plainText);
    // cypherText = _crypt.encrypt(plainText, key, iv);
    //     console.log(cypherText);
    // return cypherText;...
    
    cypherText = _crypt.encrypt(plainText, key, iv);
    var cipher = base64url.fromBase64(cypherText)
    console.log("Cipher Text");
    console.log(cipher);
    return cipher;

}

module.exports = encrypt;