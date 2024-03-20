'use client'
import React, { useEffect } from 'react'

function TakeLocation() {
    const getLocation = ()=>{
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const coordinates = {latitude, longitude}
            localStorage.setItem('location', coordinates)
            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

            return {status:true, coordinates}

        }, function (error) {
            // Handle errors
            console.error("Error getting geolocation:", error);
            return {status:false, error}
        });
    }
    useEffect(() => {
        const location = localStorage.getItem('location')

        if(!location){
            getLocation()
        }
    }, [])

    return (
        <>
        </>
    )
}

export default TakeLocation