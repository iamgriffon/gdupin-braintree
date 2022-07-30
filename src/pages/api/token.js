import { BTGateway } from "../../services/braintree"

export default function (req, res) {
  var gateway = BTGateway();

  async function getToken() {
    await gateway.clientToken.generate({}, (err, response) => {
      const clientToken = response.clientToken;
      res.status(200).send(clientToken);
    });
  }
  getToken();
}
