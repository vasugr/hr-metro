document.addEventListener("DOMContentLoaded", function() {
    const sourceStation = document.getElementById("sourceStation");
    const destinationStation = document.getElementById("destinationStation");
    const calculateRouteButton = document.getElementById("calculateRoute");
    const result = document.getElementById("result");
    const ticketCost = document.getElementById("ticketCost");
    const travelDistance = document.getElementById("travelDistance");
    const travelTime = document.getElementById("travelTime");

    const userForm = document.getElementById("userForm");
    const adminForm = document.getElementById("adminForm");
    const stationForm = document.getElementById("stationForm");
    const newStation = document.getElementById("newStation");
    const modifyMatrix = document.getElementById("modifyMatrix");
    const updateMatrix = document.getElementById("updateMatrix");
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");

    let isAdmin = false;

    // Admin login button click event
    loginButton.addEventListener("click", function() {
        adminForm.style.display = "block";
        userForm.style.display = "none";
        loginButton.style.display = "none";
    });

    // Logout button click event
    logoutButton.addEventListener("click", function() {
        adminForm.style.display = "none";
        userForm.style.display = "block";
        loginButton.style.display = "block";
    });

    function addStation(stationName) {
        // Randomly generate cost values (for all stations) between 1 and 10
        const costValues = {};
        for (const station in costMatrix) {
            costValues[station] = Math.floor(Math.random() * 10) + 1;
        }
        costMatrix[stationName] = costValues;

        // Randomly generate distance values (for all stations) between 5 and 20 kilometers
        const distanceValues = {};
        for (const station in distanceMatrix) {
            distanceValues[station] = Math.floor(Math.random() * 16) + 5;
        }
        distanceMatrix[stationName] = distanceValues;
    }

    stationForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const newStationName = newStation.value.trim();
        if (newStationName) {
            addStation(newStationName);
            // You can update the dropdowns with the new station here
            newStation.value = ""; // Clear the input field
            modifyMatrix.value = JSON.stringify(costMatrix, null, 2); // Update the matrix display
        }
    });

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
        return timeInHours;
    }

    // Call the function to populate the dropdowns
    populateDropdowns();

    calculateRouteButton.addEventListener("click", function() {
        const selectedSource = sourceStation.value;
        const selectedDestination = destinationStation.value;
        const route = `You have selected the route from ${selectedSource} to ${selectedDestination}.`;
        const cost = calculateTicketCost(selectedSource, selectedDestination);
        const distance = distanceMatrix[selectedSource][selectedDestination];
        const time = calculateTravelTime(selectedSource, selectedDestination);
        
        result.textContent = route;
        ticketCost.textContent = `The ticket cost is $${cost}`;
        travelDistance.textContent = `The travel distance is ${distance} kilometers`;
        travelTime.textContent = `The estimated travel time is approximately ${time.toFixed(2)} hours`;
    });
});
