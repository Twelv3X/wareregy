function generatePassword(e) {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }

    let passwordEle = document.getElementById("password");

    passwordEle.value = password;

    e.preventDefault();

    
}

function getAllRegistos(){

    let hdr = new Headers();
    hdr.append("Content-type","application/json");
    let link = "/carregarAllRegistos";
    let init = {
        method: "GET",
        headers:hdr
      }

      fetch(link,init).then(
        function(response)
        {
            console.log(response);
          return response.text();
        }
      ).then(
        function(texto)
        {

        });
    }

    
