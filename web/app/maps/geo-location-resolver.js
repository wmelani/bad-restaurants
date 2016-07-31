import React from "react";

export default class GeoLocationResolver {

    constructor() {
        if (navigator.geolocation == null){
            console.warn("geolocation not enabled");
        }
    }
    static async getGeoLocation(){
        if (!navigator.geolocation){
            throw new Error("Geolocation is not enabled.");
        }
        return new Promise((resolve,reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                    console.log(position.coords);
                    resolve(position.coords);
                },
                reason => {
                    reject(reason);
                }
            );
        });
    }
}