// Write your JavaScript code here!
window.addEventListener("load", function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then( function(json) {
         const div = document.getElementById("missionTarget");
         const p = Math.floor(Math.random() * 6);
         div.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[p].name}</li>
               <li>Diameter: ${json[p].diameter}</li>
               <li>Star: ${json[p].star}</li>
               <li>Distance from Earth: ${json[p].distance}</li>
               <li>Number of Moons: ${json[p].moons}</li>
            </ol>
            <img src="${json[p].image}">
         `
      });
   });
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotName = document.querySelector("input[name=pilotName]").value;
      let copilotName = document.querySelector("input[name=copilotName]").value;
      let fuelLevel = parseInt(document.querySelector("input[name=fuelLevel]").value);
      let cargoMass = parseInt(document.querySelector("input[name=cargoMass]").value);
      let launchStatus = document.getElementById("launchStatus");
      let report = document.getElementById("faultyItems");
      let fuelMessage = "Not enough fuel for the journey";
      let cargoMessage = "There is too much cargo on board to make the journey";

      let pilotTemplate = () => {
         document.getElementById("pilotStatus").innerHTML = 
            `Pilot ${pilotName} is ready for launch`;
         document.getElementById("copilotStatus").innerHTML = 
            `Co-Pilot ${copilotName} is ready for launch`;
         report.style.visibility = "visible";
      }

      let notReady = () => {
         launchStatus.innerText = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
      }
            
      

      if (pilotName === "" || copilotName === "" || fuelLevel === "" || cargoMass === "") {
         alert("All fields are required!");
         // stop the form submission
         event.preventDefault();
      } else if (isNaN(parseInt(pilotName)) === false || isNaN(parseInt(copilotName)) === false) {
         alert("Please enter a name for the Pilot and CoPilot!");
         // stop the form submission
         event.preventDefault();
      } else if (isNaN(fuelLevel) === true || isNaN(cargoMass) === true) {
         alert("Please enter a number in numerical form for the Fuel Level and Cargo Mass (i.e. 1234).");
         // stop the form submission
         event.preventDefault();
      } else if (fuelLevel < 10000 && cargoMass > 10000) {
         notReady();
         document.getElementById("fuelStatus").innerHTML = fuelMessage;
         document.getElementById("cargoStatus").innerHTML = cargoMessage;
         pilotTemplate();
         event.preventDefault();
      } else if (fuelLevel < 10000) {
         notReady();
         document.getElementById("fuelStatus").innerHTML = fuelMessage;
         pilotTemplate();
         event.preventDefault();
      } else if (cargoMass > 10000) {
         notReady();
         document.getElementById("cargoStatus").innerHTML = cargoMessage;
         pilotTemplate();
         event.preventDefault();
      } else {
         pilotTemplate();
         launchStatus.innerText = "Shuttle ready for launch";
         launchStatus.style.color = "green";
         event.preventDefault();
      }
      
   });
   
});



/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
