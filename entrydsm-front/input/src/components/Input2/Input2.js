function Male() {
    var male = document.getElementById("btn_male");
    var female = document.getElementById("btn_female");

    male.style.backgroundColor = "#a0bbe8";
    female.style.backgroundColor = "#dbdde0";
}

function Female() {
    var male = document.getElementById("btn_male");
    var female = document.getElementById("btn_female");

    male.style.backgroundColor = "#dbdde0";
    female.style.backgroundColor = "#a0bbe8";
}

function ChooseDomain() {
    var x = document.getElementById("select_domain").value;
    var input = document.getElementById("write_domain");

    if(x=="write") {
        if (input.style.display === 'block') {
        input.style.display = 'none';
        } else {
            input.style.display = 'block';
        }
    } else {
        console.log("11")
        input.style.display = 'none';
    }
}

function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "file.png";
  }

}
