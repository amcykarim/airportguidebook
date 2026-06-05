let airportData = {};

// 1. Automatically load the data file when a traveler opens the site
async function loadAirportData() {
    try {
        const response = await fetch('airports.json');
        airportData = await response.json();
        console.log("Database file loaded successfully!");
    } catch (error) {
        console.error("Could not load data file:", error);
    }
}

// 2. This runs when someone types a code and clicks "Search"
function searchAirport() {
    const userInput = document.getElementById('search-input').value.toUpperCase().trim();
    
    if (!userInput) {
        alert("Please type a 3-letter airport code (like JFK, DEL, or SIN)!");
        return;
    }

    // If the airport matches a code in our upcoming data file
    if (airportData[userInput]) {
        const airport = airportData[userInput];
        
        // This temporarily swaps your home page cards out for the real guide details!
        document.getElementById('main-content-area').innerHTML = `
            <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); margin-top: 20px; text-align: left;">
                <h2 style="font-size: 2.2rem; font-weight: bold; color: #004b87; margin-bottom: 5px;">${airport.name} (${userInput})</h2>
                <p style="color: #666; font-size: 1.1rem; margin-bottom: 25px;">${airport.city}, ${airport.country}</p>
                
                <hr style="border: 0; border-top: 1px solid #eee; margin-bottom: 25px;">
                
                <h3 style="font-weight: bold; font-size: 1.3rem; color: #111; margin-bottom: 8px;">✈️ Terminal & Gate Layout</h3>
                <p style="margin-bottom: 25px; color: #444; line-height: 1.6;">${airport.terminal_guide}</p>
                
                <h3 style="font-weight: bold; font-size: 1.3rem; color: #111; margin-bottom: 8px;">🚇 Ground Transportation & Trains</h3>
                <p style="margin-bottom: 25px; color: #444; line-height: 1.6;">${airport.transportation}</p>
                
                <h3 style="font-weight: bold; font-size: 1.3rem; color: #111; margin-bottom: 8px;">🏨 Nearby Hotels & Transit Stays</h3>
                <p style="margin-bottom: 30px; color: #444; line-height: 1.6;">${airport.nearby_hotels}</p>
                
                <button onclick="window.location.reload()" style="background: #004b87; color: white; padding: 12px 24px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;">
                    ← Go Back Home
                </button>
            </div>
        `;
    } else {
        alert("Airport code not found. Try searching for JFK, DXB, or SIN once our database is added!");
    }
}

// Start loading the database immediately
loadAirportData();
