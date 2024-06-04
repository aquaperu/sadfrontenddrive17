const PROXY_HOST = 'https://4200-idx-sadfrontenddrive17-1717536473815.cluster-m7tpz3bmgjgoqrktlvd4ykrc2m.cloudworkstations.dev/';
const PROXY_CONFIG = [
    {
        context:['./'],
        target:PROXY_HOST,
        secure:false
    }
];
module.exports = PROXY_CONFIG