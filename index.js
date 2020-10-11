const { networkInterfaces } = require('os');
const nets = networkInterfaces();

class OSPlugin {
    constructor() {
        this.IPS = Object.create(null);
        this.init();
    }

    getIps () {
        return this.IPS;
    }

    init() {
        console.log('initializing plugin..');
        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    if (!this.IPS[name]) {
                        this.IPS[name] = [];
                    }

                    this.IPS[name].push(net.address);
                }
            }
        }
    }
}

function configure () {
    return new OSPlugin();
}

module.exports = {
    OSPlugin,
    configure
}