import base64url from "base64url";
var _crypt =require('cryptlib');

const key = _crypt.getHashSha256(process.env.REACT_APP_ENCRYPTION_KEY, 32);
const iv = parseInt(process.env.REACT_APP_ENCRYPTION_IV) ;


export const encrypt = function (plaintext) {

        let plainText = plaintext;
    // cypherText = _crypt.encrypt(plainText, key, iv);
    //     console.log(cypherText);
    // return cypherText;
    
    let cypherText = _crypt.encrypt(plainText, key, iv);
    var cipher = base64url.fromBase64(cypherText)
    return cipher;

}
export const decrypt= function (cypherText){

    var plaintext = base64url.toBase64(cypherText);
    let plainText = _crypt.decrypt(plaintext, key, iv);
return plainText;

}