import type { Request } from "express"
import os from "os"


export const getRequesterId = (req: Request) => {
    const xff = req.headers['x-forwarded-for']
    // xff pode ser uma lista: "203.0.113.195, 198.51.100.17"
    let ipFromXff = null
    if (!xff)
        return normalizeIp(req.socket.remoteAddress || req.ip)

    ipFromXff = Array.isArray(xff) ? xff[0] : xff.split(',')[0]?.trim()

    return normalizeIp(ipFromXff || req.socket.remoteAddress || req.ip)
}

// or:
//req.socket.remoteAddress

export const getLocalNetworkIp = () => {
  const nets = os.networkInterfaces()

  for (const name of Object.keys(nets)) {
    if(!nets[name])
        return null

    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return null
}


//running this to use the IP V4
const normalizeIp = (ip?: string) => {
  if (!ip) return ip;
  // remove IPv6 prefix ::ffff:
  return ip.replace(/^::ffff:/, '');
}