document.addEventListener("DOMContentLoaded", function() {
    const sourceStation = document.getElementById("sourceStation");
    const destinationStation = document.getElementById("destinationStation");
    const calculateRouteButton = document.getElementById("calculateRoute");
   
    const homeTab = document.getElementById("homeTab");
    const faqTab = document.getElementById("faqTab");
    const facilitiesTab = document.getElementById("facilitiesTab");
    const popup = document.getElementById("popup");
    const popupResult = document.getElementById("popup-result");
    const popupTicketCost = document.getElementById("popup-ticketCost");
    const popupTravelDistance = document.getElementById("popup-travelDistance");
    const popupTravelTime = document.getElementById("popup-travelTime");

    // Create a cost matrix and distance matrix
    const costMatrix = {
        "Station 1": {
            "Station 1": 0,
            "Station 2": 2.5,
            "Station 3": 3.0,
            // Add more station costs as needed
        },
        "Station 2": {
            "Station 1": 2.5,
            "Station 2": 0,
            "Station 3": 2.0,
            // Add more station costs as needed
        },
        "Station 3": {
            "Station 1": 3.0,
            "Station 2": 2.0,
            "Station 3": 0,
            // Add more station costs as needed
        },
        // Add more stations as needed
    };

    const distanceMatrix = {
        "Station 1": {
            "Station 1": 0,
            "Station 2": 5.0, // Example distance in kilometers
            "Station 3": 7.0, // Example distance in kilometers
            // Add more station distances as needed
        },
        "Station 2": {
            "Station 1": 5.0, // Example distance in kilometers
            "Station 2": 0,
            "Station 3": 4.0, // Example distance in kilometers
            // Add more station distances as needed
        },
        "Station 3": {
            "Station 1": 7.0, // Example distance in kilometers
            "Station 2": 4.0, // Example distance in kilometers
            "Station 3": 0,
            // Add more station distances as needed
        },
        // Add more stations as needed
    };

    // Function to populate the dropdowns with station data
    function populateDropdowns() {
        const stations = Object.keys(costMatrix);

        stations.forEach(function(station) {
            const option1 = document.createElement("option");
            option1.text = station;
            option1.value = station;
            sourceStation.add(option1);

            const option2 = document.createElement("option");
            option2.text = station;
            option2.value = station;
            destinationStation.add(option2);
        });
    }
    // Function to calculate the ticket cost
    function calculateTicketCost(source, destination) {
        return costMatrix[source][destination];
    }

    // Function to calculate travel time based on distance and average speed
    function calculateTravelTime(source, destination) {
        const distance = distanceMatrix[source][destination];
        const averageSpeed = 40; // Example speed in kilometers per hour
        const timeInHours = distance / averageSpeed;
        return timeInHours * 60; // Convert hours to minutes
    }

    // Call the function to populate the dropdowns
    populateDropdowns();

    // Toggle between Home and FAQ content


    homeTab.addEventListener("click", function() {
        showContent("homeContent");
    });

    faqTab.addEventListener("click", function() {
        showContent("faqContent");
    });

    facilitiesTab.addEventListener("click", function() {
        showContent("facilitiesContent");
    });
    
    calculateRouteButton.addEventListener("click", function() {
        const selectedSource = sourceStation.value;
        const selectedDestination = destinationStation.value;
        const route = `You have selected the route from ${selectedSource} to ${selectedDestination}.`;
        const cost = calculateTicketCost(selectedSource, selectedDestination);
        const distance = distanceMatrix[selectedSource][selectedDestination];
        const travelTimeMinutes = calculateTravelTime(selectedSource, selectedDestination);

        popupResult.textContent = route;
        popupTicketCost.textContent = `The ticket cost is $${cost}`;
        popupTravelDistance.textContent = `The travel distance is ${distance} kilometers`;
        popupTravelTime.textContent = `The estimated travel time is approximately ${travelTimeMinutes} minutes`;

        // Display the popup
        popup.style.display = "block";
    });
});

function showContent(contentId) {
    document.querySelectorAll(".tabcontent").forEach(function(content) {
        content.style.display = "none";
    });
    document.querySelectorAll(".tablinks").forEach(function(tablink) {
        tablink.style.backgroundColor = "#008CBA";
    });
    document.getElementById(contentId).style.display = "block";
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

