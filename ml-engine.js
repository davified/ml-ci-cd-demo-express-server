const { auth } = require("google-auth-library");

async function makeRequestToMLEngine(userInput) {
  const client = await auth.getClient({
    scopes: "https://www.googleapis.com/auth/cloud-platform"
  });

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
