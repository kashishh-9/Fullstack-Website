const dns = require("dns");

dns.resolveSrv("_mongodb._tcp.cluster0.ccf1g3k.mongodb.net", (err, records) => {
  if (err) {
    console.error("ERROR:", err);
  } else {
    console.log(records);
  }
});