    
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9lbW9udGFsdm8iLCJhIjoiY2xoMWU1amJyMTJmbDNmcDdvaGxwY3F3OSJ9.RFEa3UgfPV3HgPWeKUZMtw';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        // style: 'mapbox://styles/mapbox/streets-v12', //mapbox://styles/mapbox/satellite-v9
        style: 'mapbox://styles/mapbox/satellite-v9',
        projection: 'globe',
        center: [-117.645252649553, 33.635858615890065], // starting position [lng, lat]
        zoom: 16, // starting zoom
        // maxBounds:[[33.63268366054858, -117.65187631959088].reverse(),[33.63912689772006, -117.64000708616877].reverse()]
    });

    map.rotateTo(99);


    var createGeoJSONCircle = function(center, radiusInKm, points) {
        if(!points) points = 64;

        var coords = {
            latitude: center[1],
            longitude: center[0]
        };

        var km = radiusInKm;

        var ret = [];
        var distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
        var distanceY = km/110.574;

        var theta, x, y;
        for(var i=0; i<points; i++) {
            theta = (i/points)*(2*Math.PI);
            x = distanceX*Math.cos(theta);
            y = distanceY*Math.sin(theta);

            ret.push([coords.longitude+x, coords.latitude+y]);
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
        {
            number:"B5142688",
            latLon:[33.63441038818917, -117.64462114206243]
        },
        {
            number:"5142907",
            latLon:[33.63475108814483, -117.64367540258584]
        },
        {
            number:"5142905",
            latLon:[33.633835032249856, -117.64449754985816]
        },
        {
            number:"5142908",
            latLon:[33.6355426453007, -117.64351628216976]
        },
        {
            number:"5142940",
            latLon:[33.636139223632085, -117.64276817299897]
        },
        {
            number:"5142939",
            latLon:[33.636295282929815, -117.64369513705611]
        },
        {
            number:"B5143132",
            latLon:[33.63527952085698, -117.64413361055328]
        },
        {
            number:"B5142828",
            latLon:[33.63551188928903, -117.64455838093063]
        },
        {
            number:"5142938",
            latLon:[33.63665771573886, -117.64395904430616]
        },
        {
            number:"B5142829",
            latLon:[33.636146716049, -117.64483228754317]
        },
        {
            number:"5143125",
            latLon:[33.63697166297778, -117.64446814961293]
        },
        {
            number:"B5143127",
            latLon:[33.63865818054006, -117.64433609250916]
        },
        {
            number:"5143128",
            latLon:[33.639437726400885, -117.64478910899167]
        },
        {
            number:"5123122",
            latLon:[33.638145987392114, -117.6450829038173]
        },
        {
            number:"5123124",
            latLon:[33.63848009183568, -117.64560222405348]
        },
        {
            number:"B5123123",
            latLon:[33.639070709775474, -117.64491601765556]
        },
        {
            number:"B5142937",
            latLon:[33.637487669221336, -117.64533942313363]
        },
        {
            number:"5142935",
            latLon:[33.63655041994123, -117.64598228490539]
        },
        {
            number:"B5142934",
            latLon:[33.63619559766021, -117.64556258552807]
        },
        {
            number:"5142933",
            latLon:[33.635614783447934, -117.64580957437335]
        },
        {
            number:"5142826",
            latLon:[33.635173195126114, -117.64614690636783]
        },
        {
            number:"B5142751",
            latLon:[33.634617112473215, -117.64610627797938]
        },
        {
            number:"5142750",
            latLon:[33.63420950483756, -117.64674658255883]
        },
        {
            number:"5142748",
            latLon:[33.633741156441985, -117.6457147955581]
        },
        {
            number:"5142906",
            latLon:[33.634079015834644, -117.6438108604844]
        }

    ]


    map.on('load', ()=>{

        map.addSource('border', {
            type: 'geojson',
            data: {
                "type":"FeatureCollection",
                "features":[{
                    "type":"Feature",
                    "properties":{},
                    "geometry":{
                        "coordinates":
                        [[[-117.64494670985249,33.640235281472144],[-117.64622479097542,33.63880705535642],[-117.6466605014355,33.6379505601638],[-117.64688045198218,33.63704785016924],[-117.64691887887773,33.63599208061345],[-117.6470085416344,33.63484031724501],[-117.64739281059066,33.633869838005324],[-117.64458764720814,33.633112643311804],[-117.64447236652109,33.633304608793026],[-117.64419713644153,33.63349534070353],[-117.64387232129644,33.6335161438013],[-117.64369742083394,33.63368256840265],[-117.64322269100708,33.63449388373198],[-117.64306028343475,33.63507636181862],[-117.64283541141126,33.635554823014445],[-117.64236068158439,33.63578365134235],[-117.64229821713323,33.636116491461635],[-117.6428479043014,33.636792568992846],[-117.64377237817527,33.63767666237065],[-117.64369742083394,33.63858154854688],[-117.64407220753964,33.63958003260322],[-117.64494670985249,33.640235281472144]]],
                        "type":"Polygon"
                    }
                }]
            }
        });

        map.addLayer({
            id: 'border-line',
            type: 'line',
            source:'border',
            paint:{
                'line-color':'#FF0000',
                'line-width':5
            }
        });

        transformers.forEach(({number, latLon}) => {
            const popup = new mapboxgl.Popup({ offset: 25})
                //.setHTML('<h2 style="text-align: center;">Transformer: '+number+'</h2><p style="width:100%;"><img src="/Users/joseph/Desktop/Map-layers-master/Images/'+number+'.jpeg" width=100%></p>');
                .setHTML('<h2 style="text-align: center;">Transformer: '+number+'</h2><p style="width:100%;"><img src="https://github.com/joemontalvo/TransformerMap/blob/main/Images/'+number+'.jpeg?raw=false" width=100%></p>');
            new mapboxgl.Marker({color: "#228B22", scale: 0.8})
                .setLngLat(latLon.reverse())
                .setPopup(popup)
                .addTo(map);
            
            map.addSource("radius"+number, createGeoJSONCircle(latLon, 100*0.0003048));//radius in km
            
            map.addLayer({
                "id": "radius"+number,
                "type": "fill",
                "source": "radius"+number,
                "layout": {},
                "paint": {
                    "fill-color": "#FFFFFF",
                    "fill-opacity": 0.5,
                }
            });
        });
        

    });



    var toggleRadius = function(){
        transformers.forEach(({number, latLon})=>{
            
            if(document.getElementById("t_rad_vis").checked){
                map.setLayoutProperty("radius"+number, 'visibility', 'visible');
            }else{
                map.setLayoutProperty("radius"+number, 'visibility', 'none');
            }
        })
    }

    var toggleTrans = function(){
    
        let markers = document.getElementsByClassName("mapboxgl-marker mapboxgl-marker-anchor-center");

        for(var i = 0; i<markers.length; i++){
            if(markers[i].style.visibility === "hidden"){
                markers[i].style.visibility = "visible";
            }
            else{
                markers[i].style.visibility = "hidden";
            }
            
        }

    }

    var toggleStyle = function(){
        if(document.getElementById("m_style").checked){
            map.setStyle('mapbox://styles/mapbox/satellite-v9');
        }else{
            map.setStyle('mapbox://styles/mapbox/streets-v12');
        }
        
    }

    var handleResize = function(){
        let new_radius = document.getElementById("t_dist").value;
        transformers.forEach(({number, latLon}) => {
        
            const tempSource = map.getSource("radius"+number);

            console.log(tempSource);
            let newCoords = createGeoJSONCircle(latLon, new_radius*0.0003048).data.features[0].geometry.coordinates[0];
            tempSource.setData(createGeoJSONCircle(latLon, new_radius*0.0003048).data);
        })
    }
    

// https://community.spiceworks.com/topic/2097795-add-images-to-interactive-point-markers-within-mapbox