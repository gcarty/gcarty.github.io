
// Define Variables
var locations = [{
    name: 'Clearwater Beach',
    geoCord: [27.981691, -82.826892],
    type: 'Beach',
    viewBiz: "",
    markerNo: 0
}, {
    name: 'Bush Gardens',
    geoCord: [28.036513, -82.421032],
    type: 'Theme Park and Zoo',
    viewBiz: "",
    markerNo: 1
}, {
    name: 'Ybor City',
    geoCord: [27.966347, -82.435266],
    type: 'Culutural and Historic District',
    viewBiz: "",
    markerNo: 2
}, {
    name: 'Dunedin',
    geoCord: [28.019722, -82.764961],
    type: 'Village',
    viewBiz: "",
    markerNo: 3
}, {
    name: 'Fort Desoto Beach',
    geoCord: [27.618998, -82.720987],
    type: 'Beach and Park',
    viewBiz: "",
    markerNo: 4
}, {
    name: 'Hyde Park, South Tampa',
    geoCord: [27.936653, -82.474432],
    type: 'Village',
    viewBiz: "",
    markerNo: 5
}, {
    name: 'Pass-a-Grille Beach',
    geoCord: [27.699928, -82.736954],
    type: 'Beach',
    viewBiz: "",
    markerNo: 6
}];
var filteredLocations = locations;
var locs, infoWindows = [];

// Make observable
var makeLocation = function(data) {
    this.name = ko.observable(data.name);
    this.geoCord = ko.observable(data.geoCord);
    this.markerNo = ko.observable(data.markerNo);
    this.type = ko.observable(data.type);
    this.viewBiz = ko.observable(data.viewBiz);
};

/* TES TEST
$.getScript("https://maps.googleapis.com/maps/api/js?libraries=places?key=AIzaSyCTcEivvVtA_1o6r4uo-yecUNSm6ruZm1s&callback=googleSuccess", function () {
  console.log("success");
});

googleSuccess = function () {};

googleError = function(){
  console.log("error");
  return;
}
*/

// Foursquare Feed -- Build the URL then cycle through the returned result to separate venue data.
var getFourSqData = function(loc) {
    locations[loc].viewBiz = locations[loc].viewBiz + '<h4>Things Nearby...</h4>'; // For earch location add a heading before list fo venues
    var urlOpen = "https://api.foursquare.com/v2/venues/search?";
    var auth = "client_id=CLJIEPYODSCQ4VW2QEDY5ERBWOG2UUHOD1KYWMQN1IGWXSHL&client_secret=PZLZBI3SG54SGTTH0VW4DZRENN1DMDI5PGIZ3A14MFMTEFWC";
    var urlClose = "v=20151022&m=foursquare";
    var articleLimit = 3; // set the number of venues returned
    var fourSqInfo = [];

    var fourSqUrl = urlOpen + 'll=' + locations[loc].geoCord[0] + ',' + locations[loc].geoCord[1] + '&' + auth + '&' + urlClose;

    $.getJSON(fourSqUrl, function(data) {

            venues = data.response.venues;
            for (i = 0; i < articleLimit; i++) { //extract the number of articles up the limit set
                var article = venues[i];
                fourSqInfo[i] = '<h5>' + article.name + '</h5><p>' + article.location.formattedAddress + '</p>';
                locations[loc].viewBiz = locations[loc].viewBiz + fourSqInfo[i];
            }
        })
        .error(function() {
            locations[loc].viewBiz = "Sorry! We are having temporary problems with our data feed";
        });
};

//Populate viewable venues with FourSquare data
for (i = 0; i < locations.length; i++) {
    getFourSqData(i);
}

// Start of ViewModel
var ViewModel = function() {
    var self = this;
    this.filteredList = ko.observableArray([]); //list filtered by search keyword
    this.locationList = ko.observableArray([]);
    this.markers = ko.observableArray([]);

    locations.forEach(function(idx) {
        self.locationList.push(new makeLocation(idx)); // used to track the original list of locations -- remained unchanged
        self.filteredList.push(new makeLocation(idx)); // used to track what is filtered/displayed -- controlled by user
    });

    // Initialize the Map
    if (typeof google !== 'undefined') { // Check if "google" var is available (successful load of API). If no, then error
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: new google.maps.LatLng(27.849484, -82.521038),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    } else {
        //API didn't loaded,display error message
        $('#map').html('<h4>Sorry!</h4><p>Our map feed has encountered a problem. Please refresh your browser and try again.</p>');
    };

    var infowindow = new google.maps.InfoWindow();

    // CREATE MARKERS ON MAP
    locs = this.filteredList();
    this.currentLocation = ko.observable(this.locationList()[0]);
    var displayMarkers = function() {

        //start build and display markers
        var bounds = new google.maps.LatLngBounds();
        var marker, i;
        for (i = 0; i < filteredLocations.length; i++) {
            myLatLng = new google.maps.LatLng(filteredLocations[i].geoCord[0], filteredLocations[i].geoCord[1])
            marker = new google.maps.Marker({
                position: myLatLng,
                animation: google.maps.Animation.DROP,
                map: map
            });
            //add an event listener and set the intial info window with the name of the place
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(filteredLocations[i].viewBiz);
                    infowindow.open(map, marker);
                    self.markers()[i].setAnimation(google.maps.Animation.DROP);
                };
            })(marker, i));
            self.markers().push(marker); //push marker to the array
            bounds.extend(myLatLng);
        }
        map.fitBounds(bounds);
    };
    displayMarkers();

    // When clicked by user, open the selected marker InfoWindow
    this.selectMarker = function(clicked) {
        var clickedMarker = this.markerNo();

        infowindow.setContent(locations[clickedMarker].viewBiz);
        infowindow.open(map, self.markers()[clickedMarker]);
        self.markers()[clickedMarker].setAnimation(google.maps.Animation.DROP);
        map.panTo(self.markers()[clickedMarker].getPosition());
    };

    // Filter locations based on user input
    this.filterKeyword = ko.observable('');
    this.filterFunction = function() {
        var locs = self.locationList();
        var searchWord = self.filterKeyword().toLowerCase();
        self.filteredList([]); //first clear the filteredList array

        //Loop through the locations and build new array with matched keywords
        for (var i = 0; i < locations.length; i++) {
            if (locations[i].name.toLowerCase().indexOf(searchWord) != -1) {
                self.markers()[i].setVisible(true);
                self.filteredList.push(locs[i]); //build list if search matches a location
            } else {
                self.markers()[i].setVisible(false);
            }
        }
        return self.filteredList;
    };
};
allgood = function() {
  ko.applyBindings(new ViewModel());
}