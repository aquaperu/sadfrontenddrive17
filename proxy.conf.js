const PROXY_HOST = 'https://192.168.1.86:3033/';
const PROXY_CONFIG = [
    {
        context:['./'],
        target:PROXY_HOST,
        secure:false
    }
];
module.exports = PROXY_CONFIG
