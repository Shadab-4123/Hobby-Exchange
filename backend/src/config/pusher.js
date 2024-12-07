const Pusher = require('pusher');

const pusher = new Pusher({
    appId: "1907369",
    key: "c1e05ef18df32ca6fa74",
    secret: "047e0258c696fa1efe23",
    cluster: "ap2",
    useTLS: true
  });

module.exports = pusher;
