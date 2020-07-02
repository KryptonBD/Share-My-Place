const GOOGLE_API_KEY = "API_KEY";


export async function getAddressFromCoords(coords) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    if(!response.ok) {
        throw new Error("Failed to Fetch Address. Please Try Again");
    }
    const data = response.json();
    if(data.error_message) {
        throw new Error(data.error_message);
    }
    const address = data.results[0].formatted_address;
    return address;
}

export async function getCoordsFromAddress(address) {
    const urlAddress = encodeURI(address);
    
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`;
    
    const response = await fetch(url);
    if(!response.ok) {
        throw new Error("Failed to Fetch Coordinates. Please Try Again");
    }
    const data = response.json();
    if(data.error_message) {
        throw new Error(data.error_message);
    }
    console.log("This is Data ", data);
    const coordinates = data.results[0].geometry.location;
    return coordinates;
}