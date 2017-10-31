function getString() {
    var n = parseInt(document.getElementById('no').value);
    numberToString(n);
};

function numberToString(n) {
    var word = '';
    var numName = ["one ", "two ", "three ", "four ", "five ", "six ", "seven ", "eight ", "nine ", "ten ",
                    "eleven ", "twelve ", "thirteen ", "fourteen ", "fifteen ", "sixteen ", "seventeen ", "eighteen ", "ninteen ", "twenty " ];
    var decName = ["ten", "twenty ", "thirty ", "fourty ", "fifty ", "sixty ", "seventy ", "eighty ", "ninty "];
    var placeName = ["ten ", "hundred ", "thousand ", "Ten thousand ", "lakh ", "Ten lakh "];
    if(n == 0) {
        word = word.concat('Zero');
        document.getElementById('result').innerHTML = word;
    } else {
      while(n > 0) {
          if(n > 0 && n < 1000) {
              if(Math.trunc(n / 100) != 0) {
                  word = word.concat(numName[Math.trunc(n / 100) - 1]);
                  word = word.concat(placeName[1]);
              }
              n = n % 100;
              if(n <= 20) {
                  word = word.concat(numName[n - 1]);
              } else {
                  word = word.concat(decName[Math.trunc(n / 10) - 1]);
                  if(n % 10 != 0) {
                  word = word.concat(numName[(n % 10) - 1]);
                  }
              }
              n = 0;
          } else {
              var m = 0;
              if(n.toString().length % 2 == 0) {
                  m = n.toString().length - 1;
              }else {
                  m = n.toString().length - 2;
              }
              var divider = Math.pow(10, m);
              if((Math.trunc(n / divider) - 1) < 10){
              word = word.concat(numName[Math.trunc(n / divider) - 1]);
              } else{
                  word = word.concat(decName[((Math.trunc(n / divider)-1) % 10) - 1]);
                  if(((Math.trunc(n / divider) - 1) % 10) != 0) {
                      word = word.concat(numName[((Math.trunc(n / divider)) % 10) - 1]);
                  }
              }
              word = word.concat(placeName[m - 1]);
          }
          n = n % divider;
      }
    }
    document.getElementById('result').innerHTML = word;
};
