
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9lbW9udGFsdm8iLCJhIjoiY2xoMWU1amJyMTJmbDNmcDdvaGxwY3F3OSJ9.RFEa3UgfPV3HgPWeKUZMtw';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/satellite-v9',
        projection: 'globe',
        center: [-117.645252649553, 33.635858615890065], // starting position [lng, lat]
        zoom: 16, // starting zoom
        // maxBounds:[[33.63268366054858, -117.65187631959088].reverse(),[33.63912689772006, -117.64000708616877].reverse()]
    });

    map.rotateTo(99);


    var createGeoJSONCircle = function (center, radiusInKm, points) {
        if (!points) points = 64;

        var coords = {
            latitude: center[1],
            longitude: center[0]
        };

        var km = radiusInKm;

        var ret = [];
        var distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
        var distanceY = km / 110.574;

        var theta, x, y;
        for (var i = 0; i < points; i++) {
            theta = (i / points) * (2 * Math.PI);
            x = distanceX * Math.cos(theta);
            y = distanceY * Math.sin(theta);

            ret.push([coords.longitude + x, coords.latitude + y]);
        }
        ret.push(ret[0]);

        return {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [ret]
                    }
                }]
            }
        };
    };



    const transformers = [
        { number: "B5142688", latLon: [33.63441038818917, -117.64462114206243], ideal: true },
        { number: "5142907", latLon: [33.63475108814483, -117.64367540258584] },
        { number: "5142905", latLon: [33.633835032249856, -117.64449754985816] },
        { number: "5142908", latLon: [33.6355426453007, -117.64351628216976], ideal: true },
        { number: "5142940", latLon: [33.636139223632085, -117.64276817299897] },
        { number: "5142939", latLon: [33.636295282929815, -117.64369513705611] },
        { number: "B5143132", latLon: [33.63527952085698, -117.64413361055328] },
        { number: "B5142828", latLon: [33.63551188928903, -117.64455838093063] },
        { number: "5142938", latLon: [33.63665771573886, -117.64395904430616], ideal: true },
        { number: "B5142829", latLon: [33.636146716049, -117.64483228754317], ideal: true },
        { number: "5143125", latLon: [33.63697166297778, -117.64446814961293] },
        { number: "B5143127", latLon: [33.63865818054006, -117.64433609250916] },
        { number: "5143128", latLon: [33.639437726400885, -117.64478910899167], ideal: true },
        { number: "5123122", latLon: [33.638145987392114, -117.6450829038173], ideal: true },
        { number: "5123124", latLon: [33.63848009183568, -117.64560222405348] },
        { number: "B5123123", latLon: [33.639070709775474, -117.64491601765556] },
        { number: "B5142937", latLon: [33.637487669221336, -117.64533942313363], ideal: true},
        { number: "5142935", latLon: [33.63655041994123, -117.64598228490539] },
        { number: "B5142934", latLon: [33.63619559766021, -117.64556258552807] },
        { number: "5142933", latLon: [33.635614783447934, -117.64580957437335] },
        { number: "5142826", latLon: [33.635173195126114, -117.64614690636783] },
        { number: "B5142751", latLon: [33.634617112473215, -117.64610627797938], ideal:true },
        { number: "5142750", latLon: [33.63420950483756, -117.64674658255883] },
        { number: "5142748", latLon: [33.633741156441985, -117.6457147955581] },
        { number: "5142906", latLon: [33.634079015834644, -117.6438108604844] }
    ];

    const parking = [
        { number: "P1", latLon: [33.6343006822913, -117.6448207338796] },
        { number: "P2", latLon: [33.634005382620515, -117.64408026104907] },
        { number: "P3", latLon: [33.63370549854682, -117.64473936800557] },
        { number: "P4", latLon: [33.635351553790166, -117.64358711639379] },
        { number: "P5", latLon: [33.63599089437409, -117.64409324546861] },
        { number: "P6", latLon: [33.63612694901592, -117.64412542969166] },
        { number: "P7", latLon: [33.63675130627344, -117.64326306875621] },
        { number: "P8", latLon: [33.6368518399264, -117.64373208291252] },
        { number: "P9", latLon: [33.637024215202835, -117.64467317999994] },
        { number: "P10", latLon: [33.63718732148039, -117.64436760158901] },
        { number: "P11", latLon: [33.63762281729313, -117.64409595178427] },
        { number: "P12", latLon: [33.638942157641274, -117.64421633359773] },
        { number: "P13", latLon: [33.639374428705935, -117.64463972357662] },
        { number: "P14", latLon: [33.639789466463725, -117.6451396910159] },
        { number: "P15", latLon: [33.638118860591355, -117.64513502312538] },
        { number: "P16", latLon: [33.63856662667139, -117.64504796766913] },
        { number: "P17", latLon: [33.6390944448615, -117.64506367403784] },
        { number: "P18", latLon: [33.63828165248664, -117.64590593322299] },
        { number: "P19", latLon: [33.63804156703551, -117.64603792570577] },
        { number: "P20", latLon: [33.637780387273814, -117.64610873767322] },
        { number: "P21", latLon: [33.636176956899334, -117.64612381771282] },
        { number: "P22", latLon: [33.63573747867515, -117.64629635323865] },
        { number: "P23", latLon: [33.635064338057674, -117.64623322507659] },
        { number: "P24", latLon: [33.63528897544453, -117.64581318971439] },
        { number: "P25", latLon: [33.6346986716924, -117.64623920957511] },
        { number: "P26", latLon: [33.634880971746746, -117.6458830672891] },
        { number: "P27", latLon: [33.63414153789458, -117.6462854831716] },
        { number: "P28", latLon: [33.63400867691652, -117.64625000254166] },
        { number: "P29", latLon: [33.63621397619582, -117.64480588496423] },
        { number: "P29", latLon: [33.63661103581488, -117.64399085945641] },
        { number: "P29", latLon: [33.637454358058186, -117.64535979044057] },
        { number: "P29", latLon: [33.63724601211534, -117.64551375759008] },
        { number: "P29", latLon: [33.63497371783763, -117.64462364348765] },
        { number: "P29", latLon: [33.63546121654223, -117.64504293001839] }
    ];

    const ideal_transformers = [];

    


    map.on('load', () => {
        transformers.forEach(function(t){
            ideal_transformers.push(t);
        });

        //creates the markers for each transformer
        createTransformerMarkers(ideal_transformers);

        createParkingMarkers(parking);
        //adds the border around Mallorca
        addMapBorder();

        //clears image and removes radius checkbox when clicking off of a transformer
        document.getElementById('map').addEventListener('click', (e) => {
            if (e.defaultPrevented === false) {
                resetTray();
                resetMarkers();
            }
        });

    });


    function createTransformerMarkers(arr_trans){
        arr_trans.forEach(({ number, latLon, ideal }) => {

            //creates a marker for each transformer
            var markerElement = document.createElement("img");
            if(ideal == true){
                markerElement.ideal = true;
                markerElement.src = "https://github.com/joemontalvo/TransformerMap/blob/aebe9a655697a8d8ac806a5b8355265dbefa4eac/Images/Pins/Pin-Green.png?raw=false";
            }else{
                markerElement.src = "https://github.com/joemontalvo/TransformerMap/blob/aebe9a655697a8d8ac806a5b8355265dbefa4eac/Images/Pins/Pin-Blue.png?raw=false";
            }

            markerElement.className = "custom-marker-xfmr";
            markerElement.name = number;
            

            var marker = new mapboxgl.Marker(markerElement)
                .setLngLat(latLon.reverse())
                .addTo(map);


            //click listener for marker
            marker.getElement().addEventListener('click', (e) => {
                e.preventDefault();
               
                resetMarkers();

                marker.getElement().src = "https://github.com/joemontalvo/TransformerMap/blob/aebe9a655697a8d8ac806a5b8355265dbefa4eac/Images/Pins/Pin-Red.png?raw=false"

                showCheckbox(number);

                setImage(number);

            });

            //creates each of the initial radii for the transformers
            map.addSource("radius" + number, createGeoJSONCircle(latLon, 100 * 0.0003048));//radius in km

            //adds each of the initial radii for the transformers to the map
            map.addLayer({
                "id": "radius" + number,
                "type": "fill",
                "source": "radius" + number,
                "layout": {
                    visibility: 'none'
                },
                "paint": {
                    "fill-color": "#FFFFFF",
                    "fill-opacity": 0.5,
                }
            });
        });

    }

    
    function createParkingMarkers(arr_parking){
        arr_parking.forEach(({ number, latLon}) => {

            //creates a marker for each transformer
            var markerElement = document.createElement("img");
            markerElement.src = "https://github.com/joemontalvo/TransformerMap/blob/859b2e26230f70bbbdd1083e01d068f3e043ff82/Images/Parking/Parking-Yellow.png?raw=false";

            markerElement.className = "custom-marker-parking";
            markerElement.name = number;
            

            var marker = new mapboxgl.Marker(markerElement)
                .setLngLat(latLon.reverse())
                .addTo(map);


            //click listener for marker
            // marker.getElement().addEventListener('click', (e) => {
            //     e.preventDefault();
               
            //     resetMarkers();

            //     marker.getElement().src = "https://github.com/joemontalvo/TransformerMap/blob/aebe9a655697a8d8ac806a5b8355265dbefa4eac/Images/Pins/Pin-Red.png?raw=false"

            //     showCheckbox(number);

            //     setImage(number);

            // });

        });

    }


    function addMapBorder(){
        //adds the points for the border around Mallorca
        map.addSource('border', {
            type: 'geojson',
            data: {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "coordinates": [
                                [
                                    [
                                        -117.64494670985249,
                                        33.640235281472144
                                    ],
                                    [
                                        -117.64622479097542,
                                        33.63880705535642
                                    ],
                                    [
                                        -117.6466605014355,
                                        33.6379505601638
                                    ],
                                    [
                                        -117.64688045198218,
                                        33.63704785016924
                                    ],
                                    [
                                        -117.64691887887773,
                                        33.63599208061345
                                    ],
                                    [
                                        -117.6470085416344,
                                        33.63484031724501
                                    ],
                                    [
                                        -117.64739281059066,
                                        33.633869838005324
                                    ],
                                    [
                                        -117.64458764720814,
                                        33.633112643311804
                                    ],
                                    [
                                        -117.64447236652109,
                                        33.633304608793026
                                    ],
                                    [
                                        -117.64419713644153,
                                        33.63349534070353
                                    ],
                                    [
                                        -117.64387232129644,
                                        33.6335161438013
                                    ],
                                    [
                                        -117.64369742083394,
                                        33.63368256840265
                                    ],
                                    [
                                        -117.64322269100708,
                                        33.63449388373198
                                    ],
                                    [
                                        -117.64306028343475,
                                        33.63507636181862
                                    ],
                                    [
                                        -117.64283541141126,
                                        33.635554823014445
                                    ],
                                    [
                                        -117.64236068158439,
                                        33.63578365134235
                                    ],
                                    [
                                        -117.64229821713323,
                                        33.636116491461635
                                    ],
                                    [
                                        -117.6428479043014,
                                        33.636792568992846
                                    ],
                                    [
                                        -117.64377237817527,
                                        33.63767666237065
                                    ],
                                    [
                                        -117.64369742083394,
                                        33.63858154854688
                                    ],
                                    [
                                        -117.64407220753964,
                                        33.63958003260322
                                    ],
                                    [
                                        -117.64494670985249,
                                        33.640235281472144
                                    ]
                                ]
                            ],
                            "type": "Polygon"
                        }
                    }
                ]
            }
        });

        //adds the border around Mallorca using the source
        map.addLayer({
            id: 'border-line',
            type: 'line',
            source: 'border',
            paint: {
                'line-color': '#FF0000',
                'line-width': 5
            }
        });
    }

    function toggleRadius() {
        var header = document.getElementById("xfmr_header");
        var headerText = header.textContent;

        var number = headerText.replace("Transformer: ", "");

        var visibility_value = document.getElementById("t_rad_vis").checked ? 'visible' : 'none';
        map.setLayoutProperty("radius" + number, 'visibility', visibility_value);


    }

    function toggleAllRadius() {
        ideal_transformers.forEach(({ number }) => {
            var visibility_value = document.getElementById("t_all_rad_vis").checked ? 'visible' : 'none';
            map.setLayoutProperty("radius" + number, 'visibility', visibility_value);
        })
    }

    function toggleXfmr() {

        var markerElements = document.getElementsByClassName("custom-marker-xfmr");
        var checkbox = document.getElementById("t_vis");
        
        if(checkbox.checked){
            var a_checkbox = document.getElementById("t_i_vis");
            a_checkbox.checked = false;
            toggleIdealXfmr();
        }

        Array.prototype.forEach.call(markerElements, function(marker) {
            marker.style.visibility = checkbox.checked ? "visible" : "hidden";
        });

    }

    function toggleIdealXfmr() {

        var markerElements = document.getElementsByClassName("custom-marker-xfmr");
        var checkbox = document.getElementById("t_i_vis");
        if(checkbox.checked){
            var a_checkbox = document.getElementById("t_vis");
            a_checkbox.checked = false;
            toggleXfmr();
        }

        Array.prototype.forEach.call(markerElements, function(marker) {
            if (marker.ideal === true) {
                marker.style.visibility = checkbox.checked ? "visible" : "hidden";
            }
        });

    }

    function handleResize() {
        let new_radius = document.getElementById("t_dist").value;
        ideal_transformers.forEach(({ number, latLon }) => {

            const tempSource = map.getSource("radius" + number);

            tempSource.setData(createGeoJSONCircle(latLon, new_radius * 0.0003048).data);
        })
    }

    function resetMarkers() {
        var markerElements = document.getElementsByClassName("custom-marker-xfmr");

        Array.prototype.forEach.call(markerElements, function(marker) {
            if(marker.ideal == true){
                marker.src = "https://github.com/joemontalvo/TransformerMap/blob/aebe9a655697a8d8ac806a5b8355265dbefa4eac/Images/Pins/Pin-Green.png?raw=false";
            }else{
                marker.src = "https://github.com/joemontalvo/TransformerMap/blob/aebe9a655697a8d8ac806a5b8355265dbefa4eac/Images/Pins/Pin-Blue.png?raw=false";
            }
        });

    }

    //adds the image and the transformer name to the map controls tray
    function setImage(number) {
        const tray_image_container = document.getElementById("tray_image_container");
        tray_image_container.innerHTML = '';
        const image = document.createElement('div');
        image.innerHTML = '<h2 id="xfmr_header" style="text-align: center;">Transformer: ' + number + '</h2><p style="width:100%;"><img src="https://github.com/joemontalvo/TransformerMap/blob/main/Images/' + number + '.jpeg?raw=false" width=100%></p>';
        tray_image_container.appendChild(image);
    }

    //makes the show radius checkbox visible on click
    function showCheckbox(number) {
        const radius_checkbox = document.getElementById("t_rad_vis");
        radius_checkbox.parentElement.hidden = false;
        radius_checkbox.checked = (map.getLayoutProperty("radius" + number, 'visibility') == 'visible') ? true : false;
    }

    function resetTray(){
        const tray_image_container = document.getElementById("tray_image_container");
        tray_image_container.innerHTML = '';

        const radius_checkbox = document.getElementById("t_rad_vis").parentElement;
        radius_checkbox.hidden = true;
    }

    function createGeoJSON(arr) {
        const features = arr.map(obj => {
            const [longitude, latitude] = obj.latLon;
            return {
                type: 'Feature',
                properties: { number: obj.number },
                geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                }
            };
        });

        return {
            type: 'FeatureCollection',
            features: features
        };
    }