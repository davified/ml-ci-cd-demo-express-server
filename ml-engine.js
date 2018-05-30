const { auth } = require("google-auth-library");

const keysEnvVar = process.env["CREDS"];
if (!keysEnvVar) {
  throw new Error("The $CREDS environment variable was not found!");
}
const keys = JSON.parse(keysEnvVar);

async function makeRequestToMLEngine(userInput) {
  const client = auth.fromJSON(keys);
  client.scopes = ["https://www.googleapis.com/auth/cloud-platform"];
  await client.authorize();

  const config = {
    url:
      "https://ml.googleapis.com/v1/projects/ml-ci-cd-demo/models/nlp_sentiment:predict",
    method: "post",
    data: {
      instances: [userInput]
    }
  };
  const res = await client.request(config);
  return res.data;
}

makeRequestToMLEngine();

module.exports = makeRequestToMLEngine;
