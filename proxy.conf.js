const PROXY_HOST = 'https://miniature-space-zebra-7v7j9qg6xrjx266g-4200.app.github.dev/';
const PROXY_CONFIG = [
    {
        context:['./'],
        target:PROXY_HOST,
        secure:false
    }
];
module.exports = PROXY_CONFIG