const PROXY_HOST = 'https://splendid-fish-nightgown.cyclic.app/';
const PROXY_CONFIG = [
    {
        context:['/'],
        target:PROXY_HOST,
        secure:false
    }
];
module.exports = PROXY_CONFIG