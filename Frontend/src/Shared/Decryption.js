import base64url from "base64url";
var _crypt =require('cryptlib');

const key = _crypt.getHashSha256(process.env.REACT_APP_ENCRYPTION_KEY, 32);
const iv = parseInt(process.env.REACT_APP_ENCRYPTION_IV) ;


export const decrypt= function (cypherText){
    var plaintext = base64url.toBase64(cypherText);
    let plainText = _crypt.decrypt(plaintext, key, iv);
return plainText;

}