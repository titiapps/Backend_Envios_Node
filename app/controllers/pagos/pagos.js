var conekta = require("conekta");

exports.pagarconekta = (req, res) => {
  let { nombre, email, telefono, producto, precio, cantidad } = req.body;
  let { token_public_conekta } = req.headers;

  console.log(telefono);
  //necesito recibir nombre,email,telefono,producto,precio,cantidad,token
  conekta.api_key = process.env.API_KEY_CONEKTA;
  conekta.locale = "es";
  conekta.Order.create(
    {
      currency: "MXN",
      customer_info: {
        name: nombre,
        email: email,
        phone: ""
      },
      line_items: [
        {
          name: producto,
          unit_price: precio,
          quantity: cantidad
        }
      ],
      payment_method: {
        //'monthly_installments':9,
        type: "card",
        token_id: token_public_conekta
      } //pa
    },
    (err, respuesta) => {
      if (err) {
        return res.status(400).send({ mensaje: "hubo un problema", err });
      }

      let datospago = respuesta.toObject();

      return res.status(200).send({
        id: datospago.id,
        monto: datospago.amount,
        moneda: datospago.currency,
        datospago
      });
    }
  );
};
