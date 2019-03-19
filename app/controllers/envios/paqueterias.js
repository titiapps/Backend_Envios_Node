"use strict";

const EasyPost = require("@easypost/api");

exports.cotizacion = (req, res) => {
  let api = new EasyPost(process.env.API_KEY_PAQ_SANDBOX);
  const origen = req.body.origen;
  const destino = req.body.destino;
  const paquete_ent = req.body.paquete;

  const fromAddress = new api.Address({
    company: origen.persona,
    street1: origen.street + " " + origen.houseNumber,
    street2: origen.street2,
    country: origen.countryCode,
    city: origen.city,
    state: origen.state,
    zip: origen.postalCode,
    phone: "2223344552"
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
    length: paquete_ent.longitud,
    width: paquete_ent.anchura,
    height: paquete_ent.altura,
    weight: paquete_ent.peso
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
          return tarifa_valores;
        }
      });
      return res.status(200).send({ tarifas });
    } else {
      return res.status(400).send({ message: "no hay tarifa" });
    }
  });
};

exports.comprar = (req, res) => {
  let { id_rate, id_shp } = req.query;

  let api = new EasyPost(process.env.API_KEY_PAQ_SANDBOX);

  api.Shipment.retrieve(id_shp).then(shipment_find => {
    shipment_find
      .buy((rate = { id: id_rate }))
      .then(compra => {
        let compra_envio = compra.postage_label;
        return res.send({ mensaje: compra_envio });
      })
      .catch(err => {
        return res.send({ err: err });
      });
  });
  /*   console.log(ship); */
};


exports.verificarDireccion = (req,res) =>{

  let api = new EasyPost(process.env.API_KEY_PAQ_SANDBOX);

  const verifiableAddress = new api.Address({
    verify: ['delivery'],
    company: "Liverpool",
    street1: "Natal 580",
    street2: "",
    country: "MEX",
    city: "Gustavo A Madero",
    state: "CDMX",
    zip: "07730",
  });
  
  verifiableAddress.save().then((addr) => {
    // verifiableAddress is updated, and also passed into
    // the promise resolve.
  return res.send({"mensaje":addr});
    // 417 Montgomery Street
  
/*     console.log(addr.verifications); */
    /*
    { delivery:
     { success: true,
       errors: [],
         } }
       */
  });


}