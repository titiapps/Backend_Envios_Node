let Direccion = require("../../models/direccion"); //modelo de Direccion
let Pago = require("../../models/pago");
let Envio = require("../../models/envio");

exports.pago_envio = (req, res) => {
  //variables
  let usuario = req.usuario_token_correcto;
  let id_usuario = usuario._id;
  let { origen, destino, pagoDataInfo, paqueteSeleccionado } = req.body;
  let envio = {
    paqueteria: paqueteSeleccionado.paqueteria,
    servicio: paqueteSeleccionado.servicio,
    carrier_account_id: paqueteSeleccionado.carrier_account_id,
    shipment_id: paqueteSeleccionado.shipment_id
  };
  let id_origen = "";
  let id_destino = "";
  let id_pago_guardado = "";

  let err_origen = null;
  let err_destino = null;
  let err_pago = null;
  let err_envio = null;
  //

  //aqui ya guardamos el pago de manera correcta
  guardarTransaccionConecta(pagoDataInfo)
    .then(pagoGuardado => {
      id_pago_guardado = pagoGuardado._id; //necesitamos unicamente de aqui el id  = pagoDataInfo._id
      //Direccion de origen
      guardarDireccion(origen)
        .then(origenGuardado => {
          id_origen = origenGuardado._id;
          guardarDireccion(destino)
            .then(destinoGuardado => {
              id_destino = destinoGuardado._id;
              let envioguardar = {
                o_origen: id_origen,
                o_destino: id_destino,
                paqueteria: envio.paqueteria,
                servicio: envio.servicio,
                carrier_account_id: envio.carrier_account_id,
                shipment_id: envio.shipment_id
              };
              guardarEnvio(envioguardar)
                .then(envioGuardado => {
                  return res.status(200).send({
                    envioGuardado,
                    id_pago_guardado,
                    id_usuario
                  });
                })
                .catch(err_envio => (err_envio = err_envio));
            })

            .catch(err_destino => (err_destino = err_destino)); //Error en el destino
        })
        .catch(err_origen => (err_origen = err_origen)); //Error en el origen
    })
    .catch(err_pago => (err_pago = err_pago)); //Error en el pago

  //
  //
  //Se regresan los errors
  if (err_pago !== null)
    return regresarError(err_pago, res, "Hubo un error al guardar el Pago");
  if (err_origen !== null)
    return regresarError(err_pago, res, "Hubo un error al guardar el origen");
  if (err_destino !== null)
    return regresarError(
      err_destino,
      res,
      "Hubo un error al guardar el destino"
    );
};

/* ============================================= */
/* ============================================= */
/* ============================================= */
//ESTE METODO GUARDA LA TRANSACCION DE CONEKTA
let guardarTransaccionConecta = pagoDataInfo => {
  return new Promise((resolve, reject) => {
    let nuevoPago = new Pago(pagoDataInfo);
    nuevoPago.save((err, pagoGuardado) => {
      if (err) {
        reject(err);
      }
      resolve(pagoGuardado);
    });
  });
};

/* ============================================= */
/* ============================================= */
/* ============================================= */
/* ESTE METODO GUARDA LA DIRECCION DENTRO DE LA BASE */
let guardarDireccion = direccion => {
  return new Promise((resolve, reject) => {
    let nuevaDireccion = new Direccion(direccion);
    nuevaDireccion.save((err, direccionGuardada) => {
      if (err) {
        reject(err);
      }
      resolve(direccionGuardada);
    });
  });
};

/* ============================================= */
/* ============================================= */
/* ============================================= */
/* ESTE METODO GUARDA EL ENVIO QUE SE GENERA DE EASYPOST CON EL CURRENT ID */
let guardarEnvio = envio => {
  return new Promise((resolve, reject) => {
    let nuevoEnvio = new Envio(envio);
    nuevoEnvio.save((err, envioGuardado) => {
      if (err) {
        reject(err);
      }
      resolve(envioGuardado);
    });
  });
};

/* ============================================= */
/* ============================================= */
/* ============================================= */
/* ESTE METODO REGRESA LOS ERRORES EN CASO DE PRESENTARSE */
let regresarError = (error, res, mensaje) => {
  return res.status(400).send({ mensaje: mensaje, error });
};
