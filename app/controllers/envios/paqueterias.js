"use strict";
//AQUI ESTAN TODOS LOS METODOS DE EASY POST TANTO PARA COTIZAR COMO PARA COMPRAR UNA ORDEN
const EasyPost = require("@easypost/api");
//aqui esta el respectivo para cotizar con easy poast
exports.cotizacion = (req, res) => {
  let api = new EasyPost(process.env.API_KEY_PAQ_SANDBOX);
  let origen = req.body.origen;
  let destino = req.body.destino;
  let paquete = req.body.paquete;

  const fromAddress = new api.Address({
    company: origen.persona,
    street1: origen.street + " " + origen.houseNumber,
    street2: origen.street2,
    country: origen.countryCode,
    city: origen.city,
    state: origen.state,
    zip: origen.postalCode,
    phone: "2223344552" //el telefono es NECESARIO CHECARLO
  });

  fromAddress.save().then(() => {});

  const toAddress = new api.Address({
    company: destino.persona,
    street1: destino.street + " " + destino.houseNumber,
    street2: destino.street2,
    /*  country: destino.country,
    city: destino.county, */
    country: destino.countryCode,
    city: origen.city,
    state: destino.state,
    zip: destino.postalCode,
    phone: "2223344552"
  });

  toAddress.save().then(() => {});

  const parcel = new api.Parcel({
    length: paquete.paquete_longitud,
    width: paquete.paquete_anchura,
    height: paquete.paquete_altura,
    weight: paquete.paquete_peso
  });

  parcel.save().then(() => {});

  const shipment = new api.Shipment({
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel
  });

  shipment.save().then(s => {
    console.log("---------------------------------------");
    if (s.rates.length > 0) {
      let tarifas = s.rates.filter(tarifa_valores => {
        if (tarifa_valores.currency === "MXN" && tarifa_valores.rate > 0.1) {
          return tarifa_valores; //el 17%
        }
      });

      for (let i = 0; i < tarifas.length; i++) {
        console.log(tarifas[i].rate);
        tarifas[i].rate = parseFloat(tarifas[i].rate * 1.17)
          .toFixed(2)
          .toString();
      }
      return res.status(200).send({ tarifas });
    } else {
      return res.status(400).send({ message: "no hay tarifa" });
    }
  });
};

exports.comprarEtiqueta = (req, res) => {
  let { shipment_id, rate_id } = req.body;

  let api = new EasyPost(process.env.API_KEY_PAQ_SANDBOX); //se tiene que cambiar esa api key para que regrese la etiqueta  bien

  api.Shipment.retrieve(shipment_id).then(shipment_find => {
    shipment_find
      .buy({ id: rate_id })
      .then(compraCompletadaEtiqueta => {
        return res.send({
          compraCompletadaEtiqueta,
          COMPLETADO: "SE COMPLETO"
        });
      })
      .catch(err => {
        return res.send({ err: err });
      });
  });
  /*   console.log(ship); */
};

exports.verificarDireccion = (req, res) => {
  let api = new EasyPost(process.env.API_KEY_PAQ_SANDBOX);

  const verifiableAddress = new api.Address({
    verify: ["delivery"],
    company: "Liverpool",
    street1: "Natal 580",
    street2: "",
    country: "MEX",
    city: "Gustavo A Madero",
    state: "CDMX",
    zip: "07730"
  });

  verifiableAddress.save().then(addr => {
    // verifiableAddress is updated, and also passed into
    // the promise resolve.
    return res.send({ mensaje: addr });
    // 417 Montgomery Street

    /*     console.log(addr.verifications); */
    /*
    { delivery:
     { success: true,
       errors: [],
         } }
       */
  });
};
