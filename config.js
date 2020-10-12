import getConfig from "./publicRuntimeConfig";
<<<<<<< HEAD
const publicRuntimeConfig = getConfig('public')
=======
const publicRuntimeConfig = process.env.HOST==='myfoodiediary.dev' ? getConfig('public'): getConfig("private");
>>>>>>> 6050df49af0b98d3cc25eb82ff4d2afa3cea804d

console.log("host",process.env.HOST)
export const API = publicRuntimeConfig.API;
export const APP_NAME = publicRuntimeConfig.APP_NAME;
export const PRODUCTIION = publicRuntimeConfig.PRODUCTIION;
export const DOMAIN = publicRuntimeConfig.DOMAIN;
export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;
