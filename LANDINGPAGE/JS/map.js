// Google Maps Integration using embedded iframe
function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    // Create iframe with the provided embed code
    const iframe = document.createElement('iframe');
    iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d586.5647742873653!2d124.61540848308216!3d8.50698094999634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32fff3e50e42ff23%3A0xc9cde9915f51bd09!2sGene%27s%20Lechon%20House!5e0!3m2!1sen!2sph!4v1769670809453!5m2!1sen!2sph";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.style.border = "0";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    
    // Clear any existing content and add the iframe
    mapContainer.innerHTML = '';
    mapContainer.appendChild(iframe);
    
    // Add directions functionality
    addDirectionsButton();
}

// Add directions button functionality
function addDirectionsButton() {
    // Try to get user's location for directions
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Gene's Lechon coordinates from embed URL
                const destinationLat = 8.50698094999634;
                const destinationLng = 124.61540848308216;
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                
                // Create directions container
                const directionsContainer = document.createElement('div');
                directionsContainer.className = 'directions-container';
                directionsContainer.style.cssText = `
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 1000;
                    background-color: white;
                    padding: 10px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    justify-content: center;
                    max-width: 90%;
                `;
                
                // Directions to Gene's Lechon button
                const toLechonBtn = document.createElement('button');
                toLechonBtn.innerHTML = '<i class="fas fa-directions"></i> Get Directions to Gene\'s Lechon';
                toLechonBtn.style.cssText = `
                    background-color: #ff4e00;
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-family: Arial, sans-serif;
                    font-size: 14px;
                    white-space: nowrap;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                `;
                
                toLechonBtn.addEventListener('click', () => {
                    const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`;
                    window.open(directionsUrl, '_blank');
                });
                
                // Open in Google Maps app button
                const openMapsBtn = document.createElement('button');
                openMapsBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> Open in Maps App';
                openMapsBtn.style.cssText = `
                    background-color: #4caf50;
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-family: Arial, sans-serif;
                    font-size: 14px;
                    white-space: nowrap;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                `;
                
                openMapsBtn.addEventListener('click', () => {
                    // Google Maps URL for native app
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=Gene%27s+Lechon+House&query_place_id=ChIJ___________`; // Place ID would be needed for exact location
                    
                    // Try to open in app, fallback to web
                    window.open(`https://maps.google.com/maps?q=Gene%27s+Lechon+House+@${destinationLat},${destinationLng}`, '_blank');
                });
                
                directionsContainer.appendChild(toLechonBtn);
                directionsContainer.appendChild(openMapsBtn);
                
                // Add to map container
                const mapContainer = document.getElementById('map');
                mapContainer.style.position = 'relative';
                mapContainer.appendChild(directionsContainer);
                
                // Add responsive handling
                window.addEventListener('resize', () => {
                    if (window.innerWidth < 768) {
                        directionsContainer.style.flexDirection = 'column';
                        directionsContainer.style.alignItems = 'center';
                    } else {
                        directionsContainer.style.flexDirection = 'row';
                    }
                });
                
                // Initial responsive check
                if (window.innerWidth < 768) {
                    directionsContainer.style.flexDirection = 'column';
                    directionsContainer.style.alignItems = 'center';
                }
            },
            (error) => {
                // User denied location or error occurred
                console.log('Location permission denied or error:', error);
                
                // Still add a directions button without user location
                const directionsContainer = document.createElement('div');
                directionsContainer.className = 'directions-container'; 
                directionsContainer.style.cssText = `
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 1000;
                    background-color: white;
                    padding: 10px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                `;
                
                const directionsBtn = document.createElement('button');
                directionsBtn.innerHTML = '<i class="fas fa-directions"></i> Get Directions to Gene\'s Lechon';
                directionsBtn.style.cssText = `
                    background-color: #ff4e00;
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-family: Arial, sans-serif;
                    font-size: 14px;
                `;
                
                directionsBtn.addEventListener('click', () => {
                    // Use just the destination without origin
                    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=8.50698094999634,124.61540848308216&travelmode=driving`;
                    window.open(directionsUrl, '_blank');
                });
                
                directionsContainer.appendChild(directionsBtn);
                
                const mapContainer = document.getElementById('map');
                mapContainer.style.position = 'relative';
                mapContainer.appendChild(directionsContainer);
            }
        );
    } else {
        // Geolocation not supported
        console.log('Geolocation is not supported by this browser.');
        
        // Add basic directions button
        const directionsContainer = document.createElement('div');
        directionsContainer.className = 'directions-container';
        directionsContainer.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            background-color: white;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        `;
        
        const directionsBtn = document.createElement('button');
        directionsBtn.innerHTML = '<i class="fas fa-directions"></i> Get Directions';
        directionsBtn.style.cssText = `
            background-color: #ff4e00;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-family: Arial, sans-serif;
            font-size: 14px;
        `;
        
        directionsBtn.addEventListener('click', () => {
            const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=8.50698094999634,124.61540848308216&travelmode=driving`;
            window.open(directionsUrl, '_blank');
        });
        
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.style.position = 'relative';
            mapContainer.appendChild(directionsContainer);
        }
    }
}

// Add map controls functionality
function addMapControls() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'map-controls';
    controlsContainer.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 10px;
    `;
    
    // Zoom in button
    const zoomInBtn = document.createElement('button');
    zoomInBtn.innerHTML = '<i class="fas fa-plus"></i>';
    zoomInBtn.title = 'Zoom in';
    zoomInBtn.style.cssText = `
        background-color: white;
        color: #333;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    zoomInBtn.addEventListener('click', () => {
        // In a real implementation with Google Maps API, this would zoom in
        // For iframe, we can't control zoom directly, so we'll open in new tab
        window.open('https://www.google.com/maps/place/Gene%27s+Lechon+House/@8.5069809,124.6154085,17z', '_blank');
    });
    
    // Zoom out button
    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.innerHTML = '<i class="fas fa-minus"></i>';
    zoomOutBtn.title = 'Zoom out';
    zoomOutBtn.style.cssText = `
        background-color: white;
        color: #333;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    zoomOutBtn.addEventListener('click', () => {
        // Open with wider view
        window.open('https://www.google.com/maps/place/Gene%27s+Lechon+House/@8.5069809,124.6154085,15z', '_blank');
    });
    
    // Fullscreen button
    const fullscreenBtn = document.createElement('button');
    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullscreenBtn.title = 'Fullscreen view';
    fullscreenBtn.style.cssText = `
        background-color: white;
        color: #333;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    fullscreenBtn.addEventListener('click', () => {
        // Open in new tab for full experience
        window.open('https://www.google.com/maps/place/Gene%27s+Lechon+House/@8.5069809,124.6154085,19z', '_blank');
    });
    
    // Add location info
    const locationInfo = document.createElement('div');
    locationInfo.style.cssText = `
        background-color: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        max-width: 300px;
        margin-top: 10px;
    `;
    
    locationInfo.innerHTML = `
        <h3 style="margin: 0 0 10px 0; color: #ff4e00;">
            <i class="fas fa-map-marker-alt"></i> Gene's Lechon House
        </h3>
        <p style="margin: 0 0 5px 0; font-size: 14px;">
            <i class="fas fa-map-pin"></i> Exact location shown on map
        </p>
        <p style="margin: 0; font-size: 14px; color: #666;">
            <i class="fas fa-clock"></i> Open: 8:00 AM - 10:00 PM
        </p>
    `;
    
    controlsContainer.appendChild(zoomInBtn);
    controlsContainer.appendChild(zoomOutBtn);
    controlsContainer.appendChild(fullscreenBtn);
    controlsContainer.appendChild(locationInfo);
    
    mapContainer.appendChild(controlsContainer);
    
    // Make controls responsive
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            controlsContainer.style.top = '10px';
            controlsContainer.style.right = '10px';
            locationInfo.style.display = 'none';
        } else {
            controlsContainer.style.top = '20px';
            controlsContainer.style.right = '20px';
            locationInfo.style.display = 'block';
        }
    });
    
    // Initial responsive check
    if (window.innerWidth < 768) {
        controlsContainer.style.top = '10px';
        controlsContainer.style.right = '10px';
        locationInfo.style.display = 'none';
    }
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    
    // Add a slight delay to ensure iframe is loaded before adding controls
    setTimeout(() => {
        addMapControls();
    }, 1000);
});

// Also support manual initialization
window.initMap = initMap;

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initMap, addDirectionsButton, addMapControls };
}