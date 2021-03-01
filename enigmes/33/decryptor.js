var alphabet01 = 'UdZ7FvkX1fmqx@hSs3wJip09IQaNPDHn!$M6gVAtTeoB?O8W4j2GEYruRybcLK5_Clz'
var alphabet02 = '?tBGbfkLel_jqKWhNY4ZSIH7TFc!uaxX3vn628dzEUP9Cw@DgoryR05Mis1Op$QJAmV'
var alphabet03 = 'Y!ON7BADZhGXbskgaK_WT1w5QVq2CEyrv3zRLJjm9neUStlIducMpiF80$4?HxP6@fo'

function vigenere(input, alphabet, key) {
  let output = ""
  let inputL = input.length;
  let keyL = key.length;
  let longest = (inputL > keyL) ? inputL : keyL;
  for (var i = 0; i < longest; i++) {
    output += alphabet[(alphabet.indexOf(input) - alphabet.indexOf(key) ) % alphabet.length];;
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

  code = swapcase(code);
  code = swap(code, ftitre[0], 's');

  if(fgenre == 'horreur') {
      // Remplace tous les g minuscules par des t minuscules,
      // et inversement
      code = swap(code, 'g', 't')
      // 'U' devient 'm'
      code = cesar(code, 7, alphabet01)
  } else {
      code = swap(code, 'g', 'm')
      code = cesar(code, 10, alphabet02)
  }

  alphabet03 = swap(alphabet03, ftitre[0], ftitre[1])
  alphabet03 = swap(alphabet03, ftitre[2], ftitre[3])
  code = cesar(code, 8, alphabet03)

  if(toby < 4) {
      code = swapcase(code)
  }

  poslat = Math.round(poslat)
  code = vigenere(code, alphabet02, poslat)

  if(bday < 15) {
      code = swapcase(code)
      code = cesar(code, bmonth, alphabet01)
  }

  code = vigenere(code, alphabet02, vac.toUpperCase())

  document.getElementById("result").value = code;
}
