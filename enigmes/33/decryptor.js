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
  let j = 0;
  for (var i = 0; i < inputL; i++) {
    if (!alphabet.includes(input[i])) {
      output += input[i];
      j++;
    } else {
      indexBefore = (alphabet.indexOf(input[i]) + alphabet.indexOf(key[(i - j).mod(keyL)]));
      indexAfter = (indexBefore.mod(abcL));
      output += alphabet[indexAfter];
    }
  }
  return output;
}

function cesar(str, key, alphabet) {
  var newstr = "";
  for (var j = 0; j < str.length; j++) {
    for (var i = 0; i < alphabet.length; i++) {
      if (str[j] == alphabet[(i - key).mod(alphabet.length)]) {
        newstr += alphabet[i];
        break;
      }
      if (i == alphabet.length - 1) {
        newstr += str[j];
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
  var horreur = document.getElementById("horreur").checked;
  var vac = document.getElementById("vac").value;
  var toby = parseInt(document.getElementById("toby").value, 10);
  var code = document.getElementById("codeinput").value;
  var bdate = document.getElementById("bday").value.split('/');
  var bday = parseInt(bdate[0], 10);
  var bmonth = parseInt(bdate[1], 10);
  var abc1 = alphabet01;
  var abc2 = alphabet02;
  var abc3 = alphabet03;

  code = swapcase(code);
  code = swap(code, ftitre[0], 's');
  if (horreur) {
      // Remplace tous les g minuscules par des t minuscules,
      // et inversement
      code = swap(code, 'g', 't')
      code = cesar(code, 7, abc1)
  } else {
      code = swap(code, 'g', 'm')
      code = cesar(code, 10, abc2)
  }
  abc3 = swap(abc3, ftitre[0], ftitre[1])
  abc3 = swap(abc3, ftitre[2], ftitre[3])
  code = cesar(code, 8, abc3)

  if(toby < 4) {
      code = swapcase(code);
  }

  poslat = Math.round(poslat).toString();
  code = vigenere(code, abc2, poslat)
  if(bday < 15) {
      code = swapcase(code)
      code = cesar(code, bmonth, abc1)
  }

  code = vigenere(code, abc2, vac.toUpperCase())
  return code;
}
