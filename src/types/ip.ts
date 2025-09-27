export type IpApiResponse = {
  ip?: string;
  city?: string;
  region?: string;
  country?: string;       
  country_name?: string;  
  latitude?: number;
  longitude?: number;
  postal?: string;
  timezone?: string;
  org?: string;
  [k: string]: any;
};