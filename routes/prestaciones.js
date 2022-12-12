const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
const fetch = (...args) =>
import('node-fetch').then(({default: fetch}) => fetch(...args));
const mysqlConnection  = require('../db/db.js');

router.get('/', function(req, res, next) {
  const query = `SELECT * from mascotas;`;
  mysqlConnection.query(query, (err, rows, fields) => {
    if(!err) {
      if(rows.length == 0){
        res.json(0);
      }else{
        res.json({data:rows});
      }
    } else {
      res.json(err);
    }
  });
});

router.get('/insert', (req, res) => {
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
    let codigoPrestacionEncontrados = '1661370752311';
    let codigoPrestacionPerdidos = '1666277376004';
    
    let url = 'https://servicios-hml.gcba.gob.ar/api/suaci/v1/auth/login';
    // Default options are marked with *
    fetch(url, options).then(res => res.json())
		.then((json) => {
      
      let url2 = 'https://servicios-hml.gcba.gob.ar/api/suaci/v1/administracion/bo/contactos/findByPrestaciones?codigo='+codigoPrestacionPerdidos;
      const options2 = {
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
        let i;
          for(i=0;i<json.length;i++){
            console.log(json);
            let TipoDeCaso= json[i];
            let estadoDelTramite= json[i];
            let Ovservaciones= json[i];
            let FechaInicio= json[i];
            let TipoAnimal= json[i];
            let RazaAnimal= json[i];
            let SexoAnimal= json[i];
            let Tamano= json[i];
            let CaracteristicasParticulares= json[i];
            let emailContacto= json[i];
            let telefono= json[i];
            let NumeroContactoGC= json[i]; 
            let Imagen = json[i];
            const query = `INSERT INTO mascotas (TipoDeCaso, estadoDelTramite, Ovservaciones, FechaInicio, TipoAnimal, RazaAnimal, SexoAnimal, Tmano, CaracteristicasParticulares, emailContacto, telefono, NumeroContactoGC, Imagen) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);`;
            mysqlConnection.query(query,[TipoDeCaso, estadoDelTramite, Ovservaciones, FechaInicio, TipoAnimal, RazaAnimal, SexoAnimal, Tamano, CaracteristicasParticulares, emailContacto, telefono, NumeroContactoGC, Imagen], (err, rows, fields) => {
              if(!err) {
                if(rows.length == 0){
                  res.json(0);
                }else{
                  res.json(rows);
                }
              } else {
                res.json(err);
              }
            });
          }
          
        })
      .catch(err => console.error('error:' + err));;
    })
		.catch(err => console.error('error:' + err));
});

router.post('/servicePrestacion', (req, res) => {
  console.log(req.body);
  let {nombre,apellido,quit,pass,roles_idroles} = req.body;
  const query = `INSERT INTO mascotas (nombre,apellido,quit,pass,roles_idroles) VALUES (?,?,?,?,?);`;
  mysqlConnection.query(query,[nombre,apellido,quit,pass,roles_idroles], (err, rows, fields) => {
    if(!err) {
      if(rows.length == 0){
        res.json(0);
      }else{
        res.json(rows);
      }
    } else {
      res.json(err);
    }
  });
});

module.exports = router;