let alphabet01 = 'UdZ7FvkX1fmqx@hSs3wJip09IQaNPDHn!$M6gVAtTeoB?O8W4j2GEYruRybcLK5_Clz'
let alphabet02 = '?tBGbfkLel_jqKWhNY4ZSIH7TFc!uaxX3vn628dzEUP9Cw@DgoryR05Mis1Op$QJAmV'
let alphabet03 = 'Y!ON7BADZhGXbskgaK_WT1w5QVq2CEyrv3zRLJjm9neUStlIducMpiF80$4?HxP6@fo'

Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};

function vigenere(input, alphabet, key) {
  let output = "";
  let indexBefore;
  let indexAfter;
  let inputL = input.length;
  let keyL = key.length;
  let abcL = alphabet.length;
  for (var i = 0; i < inputL; i++) {
    indexBefore = (alphabet.indexOf(input[i.mod(inputL)]) - alphabet.indexOf(key[i.mod(keyL)]));
    indexAfter = (indexBefore.mod(abcL));
    output += alphabet[indexAfter];
  }
  return output;
}

function cesar(str, key, alphabet) {
  var newstr = "";
  for (var j = 0; j < str.length; j++) {
    for (var i = 0; i < alphabet.length; i++) {
      if (str[j] == alphabet[(i  + key) % alphabet.length]) {
        newstr += alphabet[i];
        break;
      }
    }
  }
  return newstr;
}

function swap(str, charA, charB) {
  return str.split(charA).map(s => s.split(charB).join(charA)).join(charB);
}

function swapcase(str) {
    var newstr = "";
    for(var i = 0; i < str.length; i++){
        if(str[i] === str[i].toLowerCase()){
            newstr += str[i].toUpperCase();
        } else {
            newstr += str[i].toLowerCase();
        }
    }
    return newstr;
}

function decrypt() {
  var poslat = document.getElementById("pos").value;
  var ftitre = document.getElementById("titrefilm").value.toLowerCase();
  var fgenre = document.getElementById("genrefilm").value.toLowerCase();
  var vac = document.getElementById("vac").value;
  var toby = parseInt(document.getElementById("toby").value, 10);
  var code = document.getElementById("codeinput").value;
  var bdate = document.getElementById("bday").value.split('/');
  var bday = parseInt(bdate[0], 10);
  var bmonth = parseInt(bdate[1], 10);
  var abc1 = alphabet01;
  var abc2 = alphabet02;
  var abc3 = alphabet03;

  console.log("Code: " + code + ", Film: " + ftitre + ", Genre: " + fgenre + ", Toby: " + toby+ ", Anniv.: " + bday + "/" + bmonth + ", Lat: " + poslat + ", Vac: " + vac);
  console.log("[Code] " + code);
  code = swapcase(code);
  console.log("[Code] SwapCase: " + code);
  code = swap(code, ftitre[0], 's');
  console.log("[Code] Swap ["+ftitre[0]+">s]: " + code);

  if(fgenre == 'horreur') {
      // Remplace tous les g minuscules par des t minuscules,
      // et inversement
      code = swap(code, 'g', 't')
      console.log("[Code] Swap [g->t]: " + code);
      // 'U' devient 'm'
      code = cesar(code, 7, abc1)
      console.log("[Code] César 7, alphabet01: " + code);
  } else {
      code = swap(code, 'g', 'm')
      code = cesar(code, 10, abc2)
      console.log("[Code] César 10, alphabet02: " + code)
  }
  console.log("[Alphabet03] " + abc3)
  abc3 = swap(abc3, ftitre[0], ftitre[1])
  console.log("[Alphabet03] Swap ["+ftitre[0]+">"+ftitre[1]+"]: " + abc3)
  abc3 = swap(abc3, ftitre[2], ftitre[3])
  console.log("[Alphabet03] Swap ["+ftitre[2]+">"+ftitre[3]+"]: " + abc3)
  code = cesar(code, 8, abc3)
  console.log("[Code] César 8, alphabet03: " + code);

  if(toby < 4) {
      code = swapcase(code);
      console.log("[Code] SwapCase: " + code);
  }

  poslat = Math.round(poslat).toString();
  console.log("Code: " + code + ", Alphabet: "+ abc2 + ", Key: "+ poslat)
  console.log(vigenere(code, abc2, poslat));
  code = vigenere(code, abc2, poslat)
  console.log("[Code] Vigenere Alphabet02, Key=" + poslat + ": " + code);
  if(bday < 15) {
      code = swapcase(code)
      console.log("[Code] Swapcase: " + code);
      code = cesar(code, bmonth, abc1)
      console.log("[Code] César " + bmonth + ", alphabet01: " + code);
  }

  code = vigenere(code, abc2, vac.toUpperCase())
  console.log("[Code] Vigenere Alphabet02, Key= " + vac.toUpperCase() + ": " + code);
  document.getElementById("result").value = code;
}
