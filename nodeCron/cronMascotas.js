const nodeCron = require("node-cron");
const fetch = (...args) =>
import('node-fetch').then(({default: fetch}) => fetch(...args));
const mysqlConnection  = require('../db/db.js');
const {urlAd,urlHml,urlProd,ambiente} = require('../db/vars.js');
let data = {
    "usuario": "20333447658",
    "password": "Troquel1"
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    let codigoPrestacionPerdidos = '1661370752311';
    let codigoPrestacionEncontrados = '1666277376004';
    
let url = urlAd;
let url2 = "";
let url3 = "";
async function getDataGC() {
    fetch(url, options).then(res => res.json())
    .then((json) => {
        if(ambiente == 'produccion'){
          url2 = urlProd+codigoPrestacionEncontrados+'&estadoGeneral=Abierto';
        }else{
          url2 = urlHml+codigoPrestacionEncontrados+'&estadoGeneral=Abierto';
        }
        //let url2 = 'https://servicios-hml.gcba.gob.ar/api/suaci/v1/administracion/bo/contactos/findByPrestaciones?codigo='+codigoPrestacionEncontrados+'&estadoGeneral=Abierto';
        const options2 = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+json.token,
            //'client_id': JSON.stringify(data.usuario),
            //'client_secret': JSON.stringify(data.password)
            }
        };
        if(ambiente == 'produccion'){
          url3 = urlProd+codigoPrestacionPerdidos+'&estadoGeneral=Abierto';
        }else{
          url3 = urlHml+codigoPrestacionPerdidos+'&estadoGeneral=Abierto';
        }
        //let url3 = 'https://servicios-hml.gcba.gob.ar/api/suaci/v1/administracion/bo/contactos/findByPrestaciones?codigo='+codigoPrestacionPerdidos+'&estadoGeneral=Abierto';
        const options3 = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+json.token,
            //'client_id': JSON.stringify(data.usuario),
            //'client_secret': JSON.stringify(data.password)
            }
        };
        fetch(url2, options2).then(res => res.json())
        .then((json) => {
          const query = `TRUNCATE mascotas;`;
            mysqlConnection.query(query,[], (err, rows, fields) => {
            if(!err) {
              if(rows.length == 0){
                //res.json(0);
              }else{
                //res.json(rows);
              }
            } else {
              //res.json(err);
            }
          });
        let i;
        for(i=0;i<json.length;i++){
        if(json[i].cuestionarioRespondido[0] == undefined){
           var cuestionarioRespondido1 = "null";
        }else{
          var cuestionarioRespondido1 = json[i].cuestionarioRespondido[0].split("|");
        }
        
        if(json[i].cuestionarioRespondido[1] == undefined){
          var cuestionarioRespondido2 = 'null';
        }else{
          var cuestionarioRespondido2 = json[i].cuestionarioRespondido[1].split("|");
        }
        
        if(json[i].cuestionarioRespondido[2] == undefined){
          var cuestionarioRespondido3 = 'null';
        }else{
          var cuestionarioRespondido3 = json[i].cuestionarioRespondido[2].split("|");
        }
        
        if(json[i].cuestionarioRespondido[3] == undefined){
          var cuestionarioRespondido4 = 'null';
        }else{
          var cuestionarioRespondido4 = json[i].cuestionarioRespondido[3].split("|");
        }

        if(json[i].cuestionarioRespondido[4] == undefined){
          var cuestionarioRespondido5 = 'null';
        }else{
          var cuestionarioRespondido5 = json[i].cuestionarioRespondido[4].split("|");
        }
        
        let TipoDeCaso= json[i].nombrePrestacion;
        let EstadoDelTramite= json[i].estadoGeneral;
        let Ovservaciones= json[i].observaciones;
        let FechaInicio= json[i].fechaInicio;
        let TipoAnimal= cuestionarioRespondido1[2];
        let RazaAnimal= cuestionarioRespondido2[2];
        let Tamano= cuestionarioRespondido3[2];
        let Edad = cuestionarioRespondido4[2];
        let SexoAnimal = cuestionarioRespondido5[2];
        let NumeroContactoGC= json[i].numeroContacto;
		if(json[i].imagenes[0] == undefined){
          var Imagen = 'null';
        }else{
          var Imagen = json[i].imagenes[0].archivo;
        }
        const query2 = `INSERT INTO mascotas (TipoDeCaso, EstadoDelTramite, Ovservaciones, FechaInicio, TipoAnimal, RazaAnimal, SexoAnimal, Tamano, NumeroContactoGC, Imagen, Edad) VALUES (?,?,?,?,?,?,?,?,?,?,?);`;
        mysqlConnection.query(query2,[TipoDeCaso, EstadoDelTramite, Ovservaciones, FechaInicio, TipoAnimal, RazaAnimal, SexoAnimal, Tamano, NumeroContactoGC, Imagen, Edad], (err, rows, fields) => {
          if(!err) {
            if(rows.length == 0){
              //res.json(0);
            }else{
              //res.json(rows);
            }
          } else {
            //res.json(err);
          }
        });
      }
      
    }).catch(err => console.error('error:' + err));

    fetch(url3, options3).then(res => res.json())
    .then((json) => {
        let i;
        for(i=0;i<json.length;i++){
            if(json[i].cuestionarioRespondido[0] == undefined){
           var cuestionarioRespondido1 = "null";
        }else{
          var cuestionarioRespondido1 = json[i].cuestionarioRespondido[0].split("|");
        }
        
        if(json[i].cuestionarioRespondido[1] == undefined){
          var cuestionarioRespondido2 = 'null';
        }else{
          var cuestionarioRespondido2 = json[i].cuestionarioRespondido[1].split("|");
        }
        
        if(json[i].cuestionarioRespondido[2] == undefined){
          var cuestionarioRespondido3 = 'null';
        }else{
          var cuestionarioRespondido3 = json[i].cuestionarioRespondido[2].split("|");
        }
        
        if(json[i].cuestionarioRespondido[3] == undefined){
          var cuestionarioRespondido4 = 'null';
        }else{
          var cuestionarioRespondido4 = json[i].cuestionarioRespondido[3].split("|");
        }

        if(json[i].cuestionarioRespondido[4] == undefined){
          var cuestionarioRespondido5 = 'null';
        }else{
          var cuestionarioRespondido5 = json[i].cuestionarioRespondido[4].split("|");
        }
        
        let TipoDeCaso= json[i].nombrePrestacion;
        let EstadoDelTramite= json[i].estadoGeneral;
        let Ovservaciones= json[i].observaciones;
        let FechaInicio= json[i].fechaInicio;
        let TipoAnimal= cuestionarioRespondido1[2];
        let RazaAnimal= cuestionarioRespondido2[2];
        let Tamano= cuestionarioRespondido3[2];
        let Edad = cuestionarioRespondido4[2];
        let SexoAnimal = cuestionarioRespondido5[2];
        let NumeroContactoGC= json[i].numeroContacto;
		if(json[i].imagenes[0] == undefined){
          var Imagen = 'null';
        }else{
          var Imagen = json[i].imagenes[0].archivo;
        }
            const query3 = `INSERT INTO mascotas (TipoDeCaso, EstadoDelTramite, Ovservaciones, FechaInicio, TipoAnimal, RazaAnimal, SexoAnimal, Tamano, NumeroContactoGC, Imagen, Edad) VALUES (?,?,?,?,?,?,?,?,?,?,?);`;
            mysqlConnection.query(query3,[TipoDeCaso, EstadoDelTramite, Ovservaciones, FechaInicio, TipoAnimal, RazaAnimal, SexoAnimal, Tamano, NumeroContactoGC, Imagen, Edad], (err, rows, fields) => {
            if(!err) {
                if(rows.length == 0){
                //res.json(0);
                }else{
                //res.json(rows);
                }
            } else {
                //res.json(err);
            }
            });
        }
    }).catch(err => console.error('error:' + err));
}).catch(err => console.error('error:' + err));
}
// Schedule a job to run every two minutes
const job = nodeCron.schedule("*/1 * * * *", getDataGC);
