
export const convert = (n) => {
    var x = n.toString();
    var ans = x.substring(x.length-3,x.length);
    var y = x.substring(0,x.length-3);
    while(y.length > 0 ){

    var z = y.substring(y.length-2,y.length);

    ans = z + ','+ans;
    y = y.substring(0,y.length-2);
    }
    return '₹ '+ans;
}