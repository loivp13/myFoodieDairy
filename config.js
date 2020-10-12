import getConfig from "./publicRuntimeConfig";
const publicRuntimeConfig = getConfig('public')

console.log("host",process.env.HOST)
export const API = publicRuntimeConfig.API;
export const APP_NAME = publicRuntimeConfig.APP_NAME;
export const PRODUCTIION = publicRuntimeConfig.PRODUCTIION;
export const DOMAIN = publicRuntimeConfig.DOMAIN;
export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;
