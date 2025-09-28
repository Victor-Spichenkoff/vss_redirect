import type { Request } from "express"
import os from "os"
import type { IpApiResponse } from "../types/ip.js"
import axios, { isAxiosError } from "axios"


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
    if (!nets[name])
      return null

    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address
      }
    }
  }
  return null
}

export const getInfosFromIp = async (ip: string): Promise<IpApiResponse | null> => {
  try {
    // ipapi.co permite chamadas sem key para dados básicos (mas tem limite)
    const res = await axios(`https://ipinfo.io/${encodeURIComponent(ip)}/json`)

    const data = res.data

    if(data.bogon)
      return {
      ip: data.ip,
      city: "[ HOME ]",
      region: data.region,
      country: "BR",
      country_name: "Brasil",
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      org: data.org,
    }
    console.log(data)

    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      country_name: data.country_name,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      org: data.org,
    }
  } catch (err: any) {
    if (isAxiosError(err))
      console.log("ERROR AXIOS IP INFOS GET: " + err.response?.data)
    return null
  }
}




//running this to use the IP V4
const normalizeIp = (ip?: string) => {
  if (!ip) return ip
  // remove IPv6 prefix ::ffff:
  return ip.replace(/^::ffff:/, '')
}