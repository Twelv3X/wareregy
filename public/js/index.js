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
        headers: hdr
      }

      fetch(link,init).then(
        function(response)
        {
           
          return response.json();
        }
      ).then(
        function(json)
        {
         //let tb = document.getElementById("rTable");
         var data = [];
          json.forEach((json)=>
        {
          data.push([json.produto_id,json.produto_nome,json.produto_peso,json.produto_loc,json.registo_hora,json.registo_data]);

         /* let tr = document.createElement("TR");
            let tdId = document.createElement("TD");
            let tdNome = document.createElement("TD");
            let tdPeso = document.createElement("TD");
            let tdLoc = document.createElement("TD");
            let tdHora = document.createElement("TD");
            let tdData = document.createElement("TD");

            tdId.innerHTML = json.produto_id;
            tdNome.innerHTML = json.produto_nome;
            tdPeso.innerHTML = json.produto_peso;
            tdLoc.innerHTML = json.produto_loc;
            tdHora.innerHTML = json.registo_hora;
            tdData.innerHTML = json.registo_data;

            tr.appendChild(tdId);
            tr.appendChild(tdNome);
            tr.appendChild(tdPeso);
            tr.appendChild(tdLoc);
            tr.appendChild(tdHora);
            tr.appendChild(tdData);

            tb.appendChild(tr);*/
        });

        $(document).ready(function() {
          $('#rTable').DataTable( {
              data: data,
              columns: [
                  { title: "#" },
                  { title: "Nome" },
                  { title: "Peso" },
                  { title: "Localização" },
                  { title: "Hora" },
                  { title: "Data" }
              ]
          } );
      

        } );

        });

       
    }

    
