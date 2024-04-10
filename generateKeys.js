const rsa = require("node-rsa");
const fs = require("fs");

function GeneratePair() {
  const key = new rsa().generateKeyPair(); // Generating my key pair

  const publicKey = key.exportKey("public");
  const privateKey = key.exportKey("private");

  const publicKeyEncriptor = fs.openSync("./keys/public.pem", "w");
  fs.writeSync(publicKeyEncriptor, publicKey, "utf-8");

  const privateKeyEncriptor = fs.openSync("./keys/private.pem", "w");
  fs.writeSync(privateKeyEncriptor, privateKey, "utf-8");
}

GeneratePair();
