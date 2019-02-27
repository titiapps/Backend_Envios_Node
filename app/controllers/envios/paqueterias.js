const EasyPost = require("@easypost/api");

exports.cotizacion = (req, res) => {
  const api = new EasyPost(process.env.API_KEY_PAQ_SANDBOX);

  const origen = req.body.origen;
  const destino = req.body.destino;
  const paquete_ent = req.body.paquete;

  const fromAddress = new api.Address({
    company: origen.persona,
    street1: origen.street + " " + origen.houseNumber,
    street2: origen.street2,
    country: origen.country,
    city: origen.county,
    state: origen.state,
    zip: origen.postalCode,
    phone: ""
  });

  fromAddress.save().then(console.log);

  const toAddress = new api.Address({
    company: destino.persona,
    street1: destino.street + " " + destino.houseNumber,
    street2: destino.street2,
    country: destino.country,
    city: destino.county,
    state: destino.state,
    zip: destino.postalCode,
    phone: ""
  });

  toAddress.save().then(console.log);

  const parcel = new api.Parcel({
    length: 9,
    width: 6,
    height: 2,
    weight: 10
  });

  parcel.save().then(console.log);

  const shipment = new api.Shipment({
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel
  });

  shipment.save().then(data => {
    console.log("---------------------------------------");
    res.status(200).send({ message: data });
  });
};
