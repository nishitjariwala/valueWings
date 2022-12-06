const base64url = require('base64url');
var _crypt =require('cryptlib'),

key = _crypt.getHashSha256('Value@Wings#04', 32),
iv = 932730381405572, 


decrypt= function (cypherText){
    console.log("in decryption method....");
        cypherText = cypherText;
    console.log("Cipher Text ======");
    console.log(cypherText);
    
        var plaintext = base64url.toBase64(cypherText);
        plainText = _crypt.decrypt(plaintext, key, iv);
    console.log("Plain Text ======")
    console.log(plainText)
return plainText;

}
module.exports = decrypt;