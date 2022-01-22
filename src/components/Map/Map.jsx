import React from "react";
import GoogleMapReact from "google-map-react";
// Paper is basically a div with a background color
// useMediaQuery is going to help us with making our map
// more mobile responsive
import { MenuItem, Paper, Typography, useMediaQuery } from "@material-ui/core";
// need a location outline icon
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import mapStyles from "./mapStyles";
// at the time Rating is still being worked on. so importing from /lab instead of /core
import Rating from "@material-ui/lab/Rating";
// repeat process from importing classes
import useStyles from "./styles";
import khmaiResPhoto from "../../assets/images/khmaiRestaurant.jpg";
// the question is, how are we going to know when the coordinates or bounds of the map change
// and the answer is <GoogleMapReact> will be doing that for us, we simply have to call a specific on Change function
const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
  covidData,
}) => {
  console.log(weatherData);
  // call our hook
  const classes = useStyles();
  // call useMediaQuery hook
  // and pass in a string and that string is going to have parenthesis
  // and inside min-width: 600px
  // this means that this isDesktop variable is set to false
  // if the width of the device is larger than 600px then that means it is desktop
  const isDesktop = useMediaQuery("(min-width: 600px)");

  // lifting state
  // start by declaring the field, going to call it childClicked
  // initally set to null, now we want to take that state to the parent component
  // of both the List and the Map and in this case, thats going to be the App component
  // so go to App.js and create the childClicked stare there
  // const [childClicked, setChildClicked] = useStrate(null)
  // no longer need coordinates so comment out or delete
  // const coordinates = { lat: 0, lng: 0 };
  return (
    // to get key console.cloud.google.com/projectcreate
    // youll be redirected and create a project and get the api key
    // make sure you are logged in first.
    // give it a name TravelAdvisor click create
    // then at the top will be a drop down menu showing
    // My Project in the blue navBar click it and choose the project TravelAdvisor
    // on the left side hover over to  Api and Services click on dashboard
    // then click on library on the left and in the search type in Maps
    // click on maps javascript api, click enable, then when it redirects
    // click on the maps javascript api underlined link
    // then click on credentials on the left, once the page loage click +Create Credentials
    // then on the drop down click API key because we want to create an api key, it will have
    //  a modal that will popup with the key inside to copy, had to enable billing but it says free in google.
    // so added my card and it did say after the 90 day trial is done that it will not auto bill me.
    // and also restarted the app for it work. make sure to scroll out and the entire map will load
    // as of now if you type in the search nothing will happen yet its just a basic field
    // we want the functionality to fetch all the cities streets and everything in the world, we can do that
    // or we can immediately start creating the list. or we can start fetching the resturaunts
    // this is the moment where you can what you really want to do next.
    // in this case creating the lay out for the list makes sense for now. that way most of our lay out will be done
    // and then  will be able to get dirty and work on the functionality of fetching all the data of resturaunts hotels and attractions.
    <div className={classes.mapContainer}>
      {/* will put the apikey and data that should be secured in an environment variable, that way were the only one that can access it  */}
      {/* // inside of the onChange we are getting a callback function that has the event inside of it
        // inside we can call setCoordinates and set it to an object that has latitude property that has e.center.lat, 
        // and also we need the lng property which is going to be equal to e.center.lng 
         // how do we know e has center in it log it
          // error map went missing when putting setCoordinates and e is not being logged because
          the orginal state coordinates was set to an empty object an needed values for lat: and lng
          so I put in the default state for coordinates to {lat: 0, lng: 0}
          not that the event logs and the map shows will only need the center and bounds
          for the bounds: will use ne: {lat:...lng:..} and sw: {lat:.., lng:...} , these bounds
          are going to help us set up for the bottom left and top right of the corners,
          so to do that will call setBounds({ ne:e.marginBounds.ne, sw: e.marginBounds.sw}) and it will have an object with 
          ne north east e.marginBounds.ne and also sw southWest to e.marginBounds.sw
       */}
      {/* How do we show the pins on the map? GoogleMapReact makes it simple.
        you have to render them right inside the GoogleMapReact tag
       */}
      {/* change the style of the map inside options going to have an object 
        disableDefaultUi: true will disable most of the ui but will have the zoom buttons
        and pass styles: mapStyles, dont have mapStyles yet so will have to make it. but heres an easy way to do it
        and immediately get all the styles for you
        go to snazzymaps.com, in there you can see alot of different maps
        and the only thing you have to do to get these styles for your map
        expand the javascript object and copy it all into one file
        make a new file Map folder and call it whater you want,
        in our case mapStyles.js and make sure to import mapStyles from 
       */}
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo ? place.photo.images.large.url : khmaiResPhoto
                  }
                  alot={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
        {/* below the entire mapping of places open one more jsx block*/}
        {weatherData?.list?.length &&
          weatherData.list.map((data, i) => (
            // for each weather data return a data that div will have a key equal to index will have latitude equal to data.coord.lat
            // and lng property will equal dta.coord.lon
            // and the only thing we need inside of that div is the img
            // img will have the src equal to template string https://openweathermap.org/img/w/${data.weather[0].icon} in there we want to use a dynamic value that were getting form data
            <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                height="70px"
              />
              {console.log(data)}
            </div>
          ))}
        {covidData?.map((data, i) => (
          // refix into a card or something to h ave confirmed cases centered with covid
          <div
          style={{ height: "100px", width: "100px" }}
          key={i}
          lat={data.region.lat}
          lng={data.region.long}
          >
            <p
              style={{
                position: "absolute",
                display: "flex",
                width: "100px",
                fontSize: "12px",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "900",
                marginTop: "30px",
                marginLeft: "-10px",
              }}
            >
              {" "}
             {data.confirmed} Cases{" "}
            </p>
            <img
              height="80px"
              src="https://cdn.pixabay.com/photo/2020/04/29/07/54/coronavirus-5107715_1280.png"
              alt=""
            />
            {console.log(data)}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
