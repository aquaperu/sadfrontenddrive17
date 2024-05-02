const PROXY_HOST = 'https://4200-monospace-sadfrontenddrive17-1713883251017.cluster-2xid2zxbenc4ixa74rpk7q7fyk.cloudworkstations.dev';
const PROXY_CONFIG = [
    {
        context:['./'],
        target:PROXY_HOST,
        secure:false
    }
];
module.exports = PROXY_CONFIG