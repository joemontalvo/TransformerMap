
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
        { number: "B5142688", latLon: [33.63441038818917, -117.64462114206243], tier: 1 },
        { number: "5142907", latLon: [33.63475108814483, -117.64367540258584] },
        { number: "5142905", latLon: [33.633835032249856, -117.64449754985816] },
        { number: "5142908", latLon: [33.6355426453007, -117.64351628216976], tier: 1 },
        { number: "5142940", latLon: [33.636139223632085, -117.64276817299897] },
        { number: "5142939", latLon: [33.636295282929815, -117.64369513705611] },
        { number: "B5143132", latLon: [33.63527952085698, -117.64413361055328] },
        { number: "B5142828", latLon: [33.63551188928903, -117.64455838093063] },
        { number: "5142938", latLon: [33.63665771573886, -117.64395904430616]},
        { number: "B5142829", latLon: [33.636146716049, -117.64483228754317]},
        { number: "5143125", latLon: [33.63697166297778, -117.64446814961293] , tier: 3},
        { number: "B5143127", latLon: [33.63865818054006, -117.64433609250916] , tier: 2},
        { number: "5143128", latLon: [33.639437726400885, -117.64478910899167]},
        { number: "5123122", latLon: [33.638145987392114, -117.6450829038173]},
        { number: "5123124", latLon: [33.63848009183568, -117.64560222405348] },
        { number: "B5123123", latLon: [33.639070709775474, -117.64491601765556] },
        { number: "B5142937", latLon: [33.637487669221336, -117.64533942313363], tier: 1},
        { number: "5142935", latLon: [33.63655041994123, -117.64598228490539] },
        { number: "B5142934", latLon: [33.63619559766021, -117.64556258552807] , tier: 3},
        { number: "5142933", latLon: [33.635614783447934, -117.64580957437335] },
        { number: "5142826", latLon: [33.635173195126114, -117.64614690636783] },
        { number: "B5142751", latLon: [33.634617112473215, -117.64610627797938], tier: 2 },
        { number: "5142750", latLon: [33.63420950483756, -117.64674658255883] },
        { number: "5142748", latLon: [33.633741156441985, -117.6457147955581] },
        { number: "5142906", latLon: [33.634079015834644, -117.6438108604844] }
    ];

    const parking = [
        { number: "P1", latLon: [33.6343006822913, -117.6448207338796] },
        { number: "P2", latLon: [33.63536235526366, -117.64359312078709] },
        { number: "P3", latLon: [33.636219221234875, -117.644793319939] },
        { number: "P4", latLon: [33.63734282330024, -117.64554190098897] },
        // { number: "P4B", latLon: [33.63745801964544, -117.64536162905198] },
        { number: "P5", latLon: [33.63892658564588, -117.64421120301517] },
        { number: "P6", latLon: [33.634755735913494, -117.6461756823058] }

    ];





    map.on('load', () => {


        //creates the markers for each transformer
        createTransformerMarkers(transformers);

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
        arr_trans.forEach(({ number, latLon, tier }) => {

            //creates a marker for each transformer
            var markerElement = document.createElement("img");
            if(tier === 1 || tier === 2 || tier === 3){
                markerElement.tier = tier;
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

    function hideAllRadius(){
        transformers.forEach(({ number }) => {
            map.setLayoutProperty("radius" + number, 'visibility', 'none');
        });
    }

    function toggleAllRadius() {
        var idealXFMRVis = document.getElementById("t_i_vis");

        if(idealXFMRVis.checked){

            transformers.forEach(({ number, tier }) => {
                
                var t1_radio = document.getElementById("t1");
                var t2_radio = document.getElementById("t2");
                var t3_radio = document.getElementById("t3");
                
                var hasTier = false;

                if(t1_radio.checked){
                    hasTier = (tier === 1);
                }
                if(t2_radio.checked){
                    hasTier = (tier === 1 || tier === 2);
                }
                if(t3_radio.checked){
                    hasTier = (tier === 1 || tier === 2 || tier === 3);
                }

                if(hasTier){
                    var visibility_value = document.getElementById("all_rad_vis").checked ? 'visible' : 'none';
                    map.setLayoutProperty("radius" + number, 'visibility', visibility_value);
                }
            });
        }
        else{
            transformers.forEach(({ number}) => {
                var visibility_value = document.getElementById("all_rad_vis").checked ? 'visible' : 'none';
                map.setLayoutProperty("radius" + number, 'visibility', visibility_value);
            });
        }

    }


    function toggleXfmrView() {
        var idealXFMRVis = document.getElementById("t_i_vis");
        
        if(idealXFMRVis.checked){
            var markerElements = document.getElementsByClassName("custom-marker-xfmr");
            Array.prototype.forEach.call(markerElements, function(marker) {
                
                var t1_radio = document.getElementById("t1");
                var t2_radio = document.getElementById("t2");
                var t3_radio = document.getElementById("t3");
                
                var hasTier = false;

                if(t1_radio.checked){
                    hasTier = (marker.tier === 1);
                }
                if(t2_radio.checked){
                    hasTier = (marker.tier === 1 || marker.tier === 2);
                }
                if(t3_radio.checked){
                    hasTier = (marker.tier === 1 || marker.tier === 2 || marker.tier === 3);
                }

                marker.style.visibility = hasTier ? "visible" : "hidden";
                
            });
        
        }else{
            var t3_radio = document.getElementById("t3");
            t3_radio.checked = true;
            var markerElements = document.getElementsByClassName("custom-marker-xfmr");
            Array.prototype.forEach.call(markerElements, function(marker) {
                marker.style.visibility = "visible";
            });
        }
        hideAllRadius();
        toggleAllRadius();




    }

    function handleResize() {
        let new_radius = document.getElementById("t_dist").value;
        transformers.forEach(({ number, latLon }) => {

            const tempSource = map.getSource("radius" + number);

            tempSource.setData(createGeoJSONCircle(latLon, new_radius * 0.0003048).data);
        })
    }

    function resetMarkers() {
        var markerElements = document.getElementsByClassName("custom-marker-xfmr");

        Array.prototype.forEach.call(markerElements, function(marker) {
            var hasTier =(marker.tier === 1 || marker.tier === 2 || marker.tier === 3);
            if(hasTier){
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