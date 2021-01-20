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

    function getEstatisticas(){
      let form = document.getElementById("semana").value;
      let semanaAno = form.split("-"); 
      
      let  semana = semanaAno[1].replace("W","");
      let ano = semanaAno[0];

    let hdr = new Headers();
    hdr.append("Content-type","application/Json");

    let body = {
      semana:semana,ano:ano
    }

    let link = "/getregistos";
    let init = {
        method: "POST",
        headers: hdr,
        body: JSON.stringify(body)
      }

      fetch(link,init).then(
        function(response)
        {
           
          return response.json();
        }
      ).then(
        function(json)
        {
          google.charts.load('current', {'packages':['bar']});
          google.charts.setOnLoadCallback(drawStuff);
          var dados = [];
          json.forEach((json)=>
              {
                dados.push([String(json.registo_data), json.total])
              })
          console.log(dados);
          function drawStuff() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Dia');
            data.addColumn('number', 'Número de Registos');

            data.addRows(dados);
            var options = {
              width: 800,
              legend: { position: 'none' },
              chart: {
                title: '',
                subtitle: '' },
              axes: {
                x: {
                  0: { side: 'top', label: ''} // Top x-axis.
                }
              },
              bar: { groupWidth: "90%" }
            };
    
            var chart = new google.charts.Bar(document.getElementById('top_x_div'));
            // Convert the Classic options to Material options.
            chart.draw(data, google.charts.Bar.convertOptions(options));
          };
         
      });
  }


    

    
