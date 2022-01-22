## GAChecker 
- GAChecker stands for google area checker.
- site url deployed on netlify. all front end code.
- [Live Site](https://gachecker.netlify.app/)
- will ask for location click yes. 

## User Story

- User can visit different places. Can search by city name and has auto search, because of built in feature google-map-react. User can filter by rating and type: Restaurant, Hotel, or Attractions. User can also see on map covid cases in the area highlighted by a covid img.

## Info on React Area Info

- This project is to help with learning how to map methods. Using the new javascript (?.) feature.
- Gathering Data from public api's and making multiple api calls. Properly Placing environment variables for api keys to protect sensitive api keys.
- Implementing latitude and longitude into the Google Map to show user whats on the map.
- Learning how to lift state and understading how to pass props to different components.
- Learning Material ui designs like: AppBar and Search.

## Install

- npm i @material-ui/core @material-ui/icons @material-ui/lab @react-google-maps/api axios google-map-react

## Api's used

- [https://rapidapi.com/axisbits-axisbits-default/api/covid-19-statistics/]
  - covid stats
- [https://console.cloud.google.com/google/maps-apis]
  - google cloud free trial. in search for: Maps javascript api & Places api.
- [https://rapidapi.com/apidojo/api/travel-advisor/]
  - travel advisor api that gives hotels, restaurants, and attractions. Make sure to subscribe to be able to Test endpoints.
- [https://rapidapi.com/community/api/open-weather-map/]
  - Open weather map api to get current weather.

## Folder Structure

- create new folder called components
  - inside components create 4 new folders, Header, List, Map, PlaceDetails.
- each one of these folders represent a component, so create a component file for each one of them.
- Header folder has Header.jsx, and List folder has List.jsx and so on with the rest as .jsx files.
- each file will have a seperate style sheet coming from material ui.
- to create a style sheet inside the Header folder create a file called styls.js. do that for all files in each component.

## import All Files to App.js

```js
// most important part of our application
import React from "react";
// this is a component from material ui that simply normalizes the styles
// it will fix some padding margins and backgrounds immediatley for us
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        {/* xs={12} means that this Grid is going to take full width on mobile devices */}
        {/* but then on medium device md or larger its only going to take 4 spaces  */}
        {/* remember that list was only showing on the left side and the map was taking
        much more space. the md={4} is what it makes it happens, so its saying only take 4 out of the 12 spaces on medium or larger devices */}
        <Grid item xs={12} md={4}>
          {/* first Grid will take our List component */}
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          {/* 2nd Grid will contain Map.
                    The Map is taking up more space so it will take an md={8}
                */}
          <Map />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
```

## Work on header

```js
import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
  AppBar,
  Toobar,
  Typography,
  InputBase,
  Box,
  Toolbar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
// importing useStyles from './styles'
import useStyles from "./styles";
// just by seeing the name the useStyles seems to be a hook
// so lets call it how we usually call hooks.
// const classes = useStyles() and call it like a  function
// so how do the classes work in material ui
// remember we have the styles.js file so inside we need to import some things.

const Header = () => {
  const classes = useStyles();

  return (
    <>
      {/* creating layout for navigation bar */}
      <AppBar position="static">
        {/* will say error classes is not defined
                but we will import the classes from material ui
                and add them
            */}
        <Toolbar className={classes.toolbar}>
          {/* Typography is every single text element
                    , you can change the variant to be heading, subtitles,
                    and titles
                */}
          <Typography variant="h5" className={classes.title}>
            Travel Advisor
          </Typography>
          <Box display="flex">
            {/* in material ui a box is simply a div */}
            <Typography variant="h6" className={classes.title}>
              Explore new places
            </Typography>
            {/* disable <Autocomplete to see the AppBar at first */}
            {/* <Autocomplete> */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              {/* classes will be equal to an object, because we are going to add multiple classes 
                                first going to set our root class to classes.inputRoot, 
                                then input class to classes.inputInput 
                            */}
              <InputBase
                placeholder="Search..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            {/* </Autocomplete> */}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
```

## Wok on Map component

- This is to get the lay out of the entire site first.
- then functionality will come.
- part 1 below

```js
import React from "react";
import GoogleMapReact from "google-map-react";
// Paper is basically a div with a background color
// useMediaQuery is going to help us with making our map
// more mobile responsive
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
// need a location outline icon
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

// at the time Rating is still being worked on. so importing from /lab instead of /core
import Rating from "@material-ui/lab";
// repeat process from importing classes
import useStyles from "./styles";

const Map = () => {
  // call our hook
  const classes = useStyles();
  // call useMediaQuery hook
  // and pass in a string and that string is going to have parenthesis
  // and inside min-width: 600px
  // this means that this isMobile variable is set to false
  // if the width of the device is larger than 600px
  const isMobile = useMediaQuery("(min-width: 600px)");

  const coordinates = { lat: 0, lng: 0 };
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
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDXQRiGRmzbHStK8LgYY746naGLCnZiLgA" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={""}
        onChildClick={""}
      >
        {/* GoogleMapReact is going to have quite a few props passed through it
                    first property is bootstrapURLKeys={{key:''}}
                    and inside we can specify the google maps key
                    to get our key will have to create a new project on 
                    google developers consol, will do that after we add all the props required
                    for this google map react. 2nd prop will be defaultCenter={} this will be
                    the center of our map and inside we can pass the coordinates.
                    right now we dont have real coordinates(probably will come from making an api call)
                    so create const coordinates = {} will be an object that will have the lat property and lng
                    inside defaultCenter={coordinates} pass in coordinates.
                    below defaultCenter will have center. this is the current center of the map and in there
                    can also pass in the coordinates.
                    set up the defaultZoom={14} seems to work best
                    then finaly margin={[]} it accepts an array and has 4 different properties
                    // 50 to the top, 50 to right, 50 on the bottom, 50 on the left
                    // later will have 3 properties
                    options={}, onChange={} will change the map, and onChildClick={} property which
                    will be used when you actually click on a resturaunt on the map, right now for our current app to work
                    just leave them with an empty string
                */}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
```

## List Component

```js
import React, { useState } from "react";
// CircularProgress is material ui's loading bar
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./styles";
// this is for Card
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = () => {
  const classes = useStyles();
  // create useState hook
  // the first thing is our default type and 2nd is a function that modifies that state
  // useState accepts one parameter, which is the first initial value thats going to be put into the variable of type
  // lets say resturant is the default type
  const [type, setType] = useState("resturaunt");
  // now that we have our type we will say value={type}
  // next our onChange will have a call back function
  // that has the event in the parameter setTYpe to e.target.value

  // make a state for rating
  const [rating, setRating] = useState("");

  // for now places will be a dummy variable equal to an empty array
  //  lets say each places inside the array will have an object, with a name property
  // the first one is going to have a name of 'Cool place', the 2nd will be a best beer
  // then best steak, these are the names for our places
  //   just under our FormControl we can actually loop over them
  const places = [
    { name: "Cool Place" },
    { name: "Best Beer" },
    { name: "Best Steak" },
    { name: "Cool Place" },
    { name: "Best Beer" },
    { name: "Best Steak" },
    { name: "Cool Place" },
    { name: "Best Beer" },
    { name: "Best Steak" },
  ];

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Resturants, Hotels & Attractions around you
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          {/* This data has to be modified using state 
                        Inside the event.target.value is where the click element will be.
                        so if you click on hotels the state for type will be populated with hotels
                    */}
          <MenuItem value="resturants">Resturants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e) => setType(e.target.value)}>
          {/* at the start were going to have all ratings
                        so resturants or hotels with all the ratings
                        and a value of 0, next one we can say 3 stars 
                    */}
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
        {/* most important part, we have to start rendering the list of resturants
                and then displaying a card for each specific place 
                    so far we havent fetched, resturants, hotels, or attractions. so create
                    a variable called const places
                */}
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {/* places?. means only if you have places and only then .map() over them 
                        map takes in a call back function () => {} and then in each iteration of the callback
                        it has one new place. so if were mapping over places we can, place,
                        were also going to need the index. and the index is always given to you as the 2nd parameter
                        to the map function, now we need curly braces if you really want to open this as a function 
                        but in this case we only need parenthesis, because were going to return a piece jsx
                    */}
        {places?.map((place, i) => (
          // so for each place we want to return a grid
          // but this time not a grid container, but rather a grid item
          // that Grid item is going to have a key equal to index
          // this is usually not good practice especcialy when your deleting items form the list
          // but in this case we wont be deleting them so its fine.
          // finally we want to say xs={12} so that says from the extra small devices
          // to the big devices that it will take the full width of the list container
          // which is 12 spaces
          <Grid item key={i}>
            {/* inside the Grid is where our card should be 
                                this will be a custome component that we will create.
                                And that is the placeDetails, so instead of Card replace it with PlaceDetails
                            */}
            {/* <Card /> */}
            {/* the screen rendered place Details 3 times saying "Place Details, Place Details" because there were only 3 places inside out places array of objects 
                                make sure to pass into th PlaceDetails place={place}
                            */}
            <PlaceDetails place={place} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default List;
```

## PlaceDetails

```js
import React from "react";

const PlaceDetails = ({ place }) => {
  // destructure our props
  // instead of saying props.place
  // we can put place in an object {place} and that will give is direct access to the props that was passed in from List.jsx
  console.log(place);
  return (
    <div>
      <h1>{place.name}</h1>
      {/* next step fetch the data for all the resturants, hotels, and attractions 
                that way will have something to render on the map
                - working with the api's, learn how to fetch data,
                how to properly structure the data, and how to keep it clean
            */}
    </div>
  );
};

export default PlaceDetails;
```

## Create an api folder

- inside the api folder create an index.js

```js
// this is where were going to keep all of our api calls.
// axios is the library that will help us make our calls
import axios from "axios";
// since we are using axios the method is automatically a GET request
// so we dont need the method: 'GET'
const URL =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";
// const options = {
//     // when it comes to params we definetley need the bottom left lat bl_lat and bl_long and tr_lat tr_long
//     // and dont need any of the other options like rasturaunt limit currency open_now lunit lang
//     params: {
//       bl_latitude: '11.847676',
//       tr_latitude: '12.838442',
//       bl_longitude: '109.095887',
//       tr_longitude: '109.149359',

//     },
//     // need headers, because this is where your rapiapi resides
//     // that means will have put the x-rapidapi-key: in an environment variable
//     headers: {
//       'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
//       'x-rapidapi-key':'8dd35320d3msh23f0bafb64aea8fp164011jsnd1d2d4683ea2'
//     }
//   };
//   can delete or comment out the axios call copied from rapidapi because we already have our axios call
//   axios.request(options).then(function (response) {
//       console.log(response.data);
//   }).catch(function (error) {
//       console.error(error);
//   });

// in here lets create a function thats going to make that api call
// accepting the bounds.sw, bounds.ne passed as parameters from App.js
// and recall them sw, ne.
// so how can we pass these values from our api request?
// well as you can see above in the options object there are static values
// so copy the entire object and remove it from there or comment out. and place
// as the 2nd paramter in the axios.get call and replace options. then you can start placing the paramters
//  that we got sw, ne and put them in the lat lng
export const getPlacesData = async (sw, ne) => {
  // not showing sw and ne when passing in the bounds.ne ... in app.js useEffect()
  // console.log(sw)
  // console.log(ne)
  try {
    // inside the try catch block it usually has a request
    // that says if the request is successful then the code runs as its supposed to run
    // inside of the try
    // but if the request fails then our code is redirected to the catch error block
    // the url will come from rapid api search travel Advisor
    // https://rapidapi.com/apidojo/api/travel-advisor/
    // if using it for the first time, have to click subscribe to this api
    // and then choose the basic plan, its free and up to 500 request a month
    // for our testing purposes that will be more than a enough, once done go back to the
    // endpoints tab above. and in there we can see what endpoints that we can make
    // we can make endpoints to the locations get the autocomplete
    // GET locations/v2/auto-complete, we can also post different hotels
    // POST
    // hotel-filters/v2/list
    // hotels/v2/list
    // hotels/v2/get-details
    // hotels/v2/get-offers
    // or get hotels we can list them by lng lat
    // GET hotels/list-by-latlng (Deprecated)
    // click the blue Test Endpoint to check it out
    // if we wanted to get everything in the center of a location of one dot
    // for example if were in the us in california. if we make this a central point
    // and if theres a lot of resturants all of the resturants will be populated
    // in this exact area, but we dont want to just see resturants at that central point.
    // we want to see the entire area visible on the map.
    // thats we use list in boundary
    // GET hotels/list-in-boundary (Deprecated)
    // in this case you have to pass the lat and lng of the bottom left bl_latitude,bl_longitude  corner of the map, and the top right corner of lat and lng tr_longitude,tr_latitude
    // so we have to find the position of the bottom left corner and the top right corner
    // if we do that, the resturants that we fetch to be scattered accross the entire map
    // so exactly do we make this call

    // pass in URL in the get, and the second parameter are the options,
    // simply pass in the options object
    // const response = await axios.get(URL, options);
    // we can return the response but were interested in the data thats inside of the response
    // so we can destructure {data : {data}} from the response given from the axios call and have it written like this
    // and destructure one more time to get the data from inside to get to our resturant
    // const {data: {data}} = await axios.get(URL, options);
    // // finally can return that data
    // console.log(data)

    const {
      data: { data },
    } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": "8dd35320d3msh23f0bafb64aea8fp164011jsnd1d2d4683ea2",
      },
    });
    // now the data that we return should be inside our map
    return data;
  } catch (error) {
    console.log(error);
  }
};

// the main question is where are we going to call this function
// will call in App.js
// getting lat lng
export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get(
        "https://community-open-weather-map.p.rapidapi.com/find",
        {
          params: { lat, lon: lng },
          headers: {
            "x-rapidapi-key":
              "350daf123cmsh717efed3ca90299p136988jsn4263a1a5de3b",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          },
        }
      );

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
```

## App.js

```js
// most important part of our application
import React, { useState, useEffect } from "react";
// this is a component from material ui that simply normalizes the styles
// it will fix some padding margins and backgrounds immediatley for us
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
// now how do we call getPlacesData function inside of our functional App component
// the answer is were going to create a useEffect
import { getPlacesData } from "./components/api";
const App = () => {
  const [places, setPlaces] = useState([]);

  // lifting state for Map and List.js
  // can also solve this by using context or redux
  // pass setChildClicked to Map componet as props
  const [childClicked, setChildClicked] = useState(null);

  // setting a variable of coordinates and setCoordinates and the start of the useState set it to
  // an empty object
  // const [coordinates, setCoordinates] = useState({lat: 0, lng: 0})
  const [coordinates, setCoordinates] = useState({});
  console.log(coordinates);
  // we also need bounds and setBounds
  // remember the top right and the bottom left corner we are going to call them bounds
  // and the bounds will be set to null, now we have the data for bounds but its not populated yet
  // these are just empty values, so we have to pass our setter functions as props to our Map component
  // also our Map component is going to have to use these coordinates so lets pass in the state itself coordinates

  // const [bounds, setBounds] = useState(null)
  const [bounds, setBounds] = useState({});

  // supposedly shows the value not being updated when logged but I see the bounds be logged
  // make sure in the dependancy array in the useEffect
  console.log(bounds);
  console.log(bounds);

  // creating a state for loading
  // right before we call the getPlacesData in the useEffect
  const [isLoading, setIsLoading] = useState(false);

  // this useEffect is only going to happen at the start
  // remember useEfect is a callback function and then we have the dependancy array
  // now we need what we had before, an empty dependancy array
  useEffect(() => {
    // because this should only happen at the start
    // to get the user coordinates we can use their built in browser geo location api
    // we can say navigator.geolocation.getCurrentPosition(()=?{}) and inside the getCurrentPosition were going to have a callback function
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        // we can choose what do we want to do with that data
        // and inside here were getting some data so put an object inside the paramater to destructure it to immediately get the coordinates called coords:
        // and we get destructure the value to get the {latitude, longitude}
        // now that were getting the data we can say setCoordinates({ lat: latitude, lng: longitude }) to an object of lat:
        // now that were getting these coordinates we no longer need the default value of the coordinates to be lat: 0, lng: 0 and simply leave them as an empty {} object
        // now our browser should be getting or geolocation immediately and our map should be positioning around our location
        // your reload your page or going back to your browser you will see an alert that says share your location with google? click yes and it will show where your area
        // can have a mock location google chrome allows you to mess with the geolocation
        // to do click on the vertical 3 dots, and click more tools and click sensors
        // drag up from the bottom of your dev tools and in the location drop down can pick berlin london moscow ...
        // you can also toggle the location icon in the browser if you want it to keep taking in your location
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    // useEffect is a function that accepts another call back function ()=>{} then inside
    // call getPlacesData(), and dont forget at the end of the useEffect function we have to have the
    // dependancy array. The empty dependancy array means that the code inside of this function
    // block will happen only at the start of the application and right now thats exactly what
    // we want to do.
    // remember that this function getPlacesData() returns the resturants data
    // so lets set the data to the state
    // also have to remember that our getPlaces is an asyncrhonous function
    // then means we have to call the .then() on it, then .then(()=>{}) accepts a call back function
    // when then we pass in data in the parameter and getting that data and what we want to do is
    // is simply call the setPlaces(data) and set the data to those places

    // so now that that we have our coordinates and bounds we simply need to pass them over to our getPlacesData
    // first parameter we can pass bounds.sw because we got that information from logging the event from the GoogleMapReact
    // in the Maps component and in the onChange call back function set the bounds to e.marginBounds.
    // after passing the bounds parameter we can go to the api index.js and accept those bounds there
    // error: when passing in bounds.sw, bounds.ne wepage is blank
    // if(!bounds){
    //     return <div>loading...</div>
    // }
    setIsLoading(true);
    // and finally after fetching the data when setIsLoading to true
    // in the .then() above setPlaces(data) setIsLoading back to false
    // finally now that we have this state isLoading pass it over to the List component
    getPlacesData(bounds.sw, bounds.ne).then((data) => {
      console.log(data); //api get request successful and shows 7 objects
      // console.log(bounds)
      setIsLoading(false);
      // now is the time to make this dynamic because we are passing in static information like the coordinates
      // we have to get real information from the position of our map
      // and then based on that we have to call the right resturants for that map
      // to do that we will have to pass some information into this getPlacesData() function
      // so lets create more useState
      setPlaces(data);
    });
    // if we want everything to be reran in the useEffect everytime the map changes
    // we have to add the coordinates and bounds in the dependancy array
    // that is one proeblem solved, I also want to automatically set the coordinates to be the coordinates of the users location
    // so as soon as the users launch the page, we should be able to get their  lat and lng
    // we can do that by using one more useEffect() under the bounds state
  }, [coordinates, bounds]);
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3}>
        {/* xs={12} means that this Grid is going to take full width on mobile devices */}
        {/* but then on medium device md or larger its only going to take 4 spaces  */}
        {/* remember that list was only showing on the left side and the map was taking
        much more space. the md={4} is what it makes it happens, so its saying only take 4 out of the 12 spaces on medium or larger devices */}
        <Grid item xs={12} md={4}>
          {/* first Grid will take our List component */}
          {/* <List places={places}/> */}
          {/* go to List and we can do something with the childClicked value */}
          <List
            isLoading={isLoading}
            places={places}
            childClicked={childClicked}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {/* 2nd Grid will contain Map.
                    The Map is taking up more space so it will take an md={8}
                */}
          {/* make sure after passing in the propse to go to Map component and pass them in the parameter destructured */}
          {/* pass in places to our Map to display them on the map */}
          {/* passing in information is still ok because were only sending it one level deep from our App to our map. 
                if its starts to get deeper like 2 or 3 levels deep then we have to consider using redux or react context  */}
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
```

## List.js

```js
import React, { useState, useEffect, createRef } from "react";
// CircularProgress is material ui's loading bar
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./styles";
// this is for Card
import PlaceDetails from "../PlaceDetails/PlaceDetails";

// will pass in {places} in the List functional component but using static data for now because no more get calls
const List = ({ childClicked, places, isLoading }) => {
  // if you put the property in the console.log() itll give you abit more info
  // console.log({childClicked}) but if you put it in an object. it will say childClicked: 5 is equal to 5, that way you
  // youll know what you console.log() and see which element was clicked, it is more accurate when you click directly center of card
  // now that we have that info, how do we make our list scroll to a specific element on the list when we click on the map ?
  // for that were going to have to use react refs,
  // import useEffect, and createRef
  // console.log(childClicked) the value would be 5 and wouldnt know what that is?

  // the props places passed from App.js should return a list of returants around the area
  // but due to reaching the free 500 api/per month we cant see the data, move on
  // console.log(places)
  const classes = useStyles();
  // create useState hook
  // the first thing is our default type and 2nd is a function that modifies that state
  // useState accepts one parameter, which is the first initial value thats going to be put into the variable of type
  // lets say resturant is the default type
  const [type, setType] = useState("resturaunt");
  // now that we have our type we will say value={type}
  // next our onChange will have a call back function
  // that has the event in the parameter setTYpe to e.target.value

  // make a state for rating
  const [rating, setRating] = useState("");

  // create the statefield that contains all the reference
  // elRefs stands for elementReferences, set to empty array because at the start
  // we dont have any places, once we get the places we want to set them to the state
  // so how exactly are we going to create these references
  const [elRefs, setElRefs] = useState([]);
  // encountered error saying cannot read property length of undefined pointing to the const refs = Array(places.length)
  // therefore we cannot create refs, so this is the right oppurtunity to implenent our CircularProgress
  // which is the loading. go to App component
  useEffect(() => {
    // creating the references
    // use Array contrcutor and inside there we want to construct as many elements as there are pllaces
    // so we pass in places.length, then we call .fill(). .fill() will start filling the array
    // and then we want to map over that array. this time were not interested in one specific thing at the start
    //  we only need the index, in caes like these just leave an underscore _, that means your, not going to use that
    // first parameter, but you need the 2nd one, and then we want to return refs[i]
    // we want to access the refs and return that specific thing or if the refs || doesnt exist yet then
    // createRef() creates a new ref. and the refs[i] variable is not going to be like the initial constant refs variable
    // because we are still declaring it in that line, we have to use the elRefs right there
    // const refs = Array(places.length).fill().map((_, i)=> refs[i] || createRef())
    // remember this is something your not going to do that oftent. Usually your going to have to create one ref
    // in this case we have to create many as many as there are places.
    // finally now that we have those refs, we can say setElRefs(refs) setElRefs is equal to refs
    // FYI even though the  isLoading logic is under the Typography to show loading.
    // places in the Array constructor in the useEffect is also depending the places?.length, so were adding the ?.
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());

    // now we can use those references in the Grid Component right below in PlaceDetails component
    // so were going to give each Grid item a ref={}
    setElRefs(refs);
    // we want to recall this useEffect everytime the places change
    // so we put the places inside the dependancy array
    // now we want to create a statefield that contains all the references
  }, [places]);

  // for now places will be a dummy variable equal to an empty array
  //  lets say each places inside the array will have an object, with a name property
  // the first one is going to have a name of 'Cool place', the 2nd will be a best beer
  // then best steak, these are the names for our places
  //   just under our FormControl we can actually loop over them
  // const places = [
  //   {
  //     name: "Cool Place",
  //     price_level: "$",
  //     ranking: "#15 of 6,235 Restaurants in Long Beach",
  //   },
  //   {
  //     name: "Best Beer",
  //     price_level: "$$",
  //     ranking: "#15 of 6,235 Restaurants in Long Beach",
  //   },
  //   {
  //     name: "Best Steak",
  //     price_level: "$$-$$$",
  //     ranking: "#15 of 6,235 Restaurants in Long Beach",
  //   },
  //   {
  //     name: "Cool Place",
  //     price_level: "$",
  //     ranking: "#15 of 6,235 Restaurants in Long Beach",
  //   },
  //   {
  //     name: "Best Beer",
  //     price_level: "$$",
  //     ranking: "#15 of 6,235 Restaurants in Long Beach",
  //   },
  //   {
  //     name: "Best Steak",
  //     price_level: "$$-$$$",
  //     ranking: "#15 of 6,235 Restaurants in Long Beach",
  //   },
  // ];

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Resturants, Hotels & Attractions around you
      </Typography>
      {/* logic for isLoading
        show the CircularProgress loading and then other wise render everything else in FormControl
        under the Grid, once done we have to wrap all of the FormControl down to the Grid in a Fragment
      */}
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              {/* This data has to be modified using state 
                        Inside the event.target.value is where the click element will be.
                        so if you click on hotels the state for type will be populated with hotels
                    */}
              <MenuItem value="resturants">Resturants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setType(e.target.value)}>
              {/* at the start were going to have all ratings
                        so resturants or hotels with all the ratings
                        and a value of 0, next one we can say 3 stars 
                    */}
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
            {/* most important part, we have to start rendering the list of resturants
                and then displaying a card for each specific place 
                    so far we havent fetched, resturants, hotels, or attractions. so create
                    a variable called const places
                */}
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {/* places?. means only if you have places and only then .map() over them 
                        map takes in a call back function () => {} and then in each iteration of the callback
                        it has one new place. so if were mapping over places we can, place,
                        were also going to need the index. and the index is always given to you as the 2nd parameter
                        to the map function, now we need curly braces if you really want to open this as a function 
                        but in this case we only need parenthesis, because were going to return a piece jsx
                    */}
            {places?.map((place, i) => (
              // so for each place we want to return a grid
              // but this time not a grid container, but rather a grid item
              // that Grid item is going to have a key equal to index
              // this is usually not good practice especcialy when your deleting items form the list
              // but in this case we wont be deleting them so its fine.
              // finally we want to say xs={12} so that says from the extra small devices
              // to the big devices that it will take the full width of the list container
              // which is 12 spaces

              // Beginning to make card we see that each restaurant is a PlaceDetails and we passed in all
              // the place information. so lets go into place detail component because thats where the card will be made in
              // ref will equal to elRefs at i and then we access that specific index of the current place
              // and then we have to pass a few props to PlaceDetails, because once we click on the elment card in the map
              // we want to scroll to show over to the left side bar on the List
              // dont need ref in Grid
              <Grid item key={i} xs={12}>
                {/* inside the Grid is where our card should be 
                                this will be a custome component that we will create.
                                And that is the placeDetails, so instead of Card replace it with PlaceDetails
                            */}
                {/* <Card /> */}
                {/* the screen rendered place Details 3 times saying "Place Details, Place Details" because there were only 3 places inside out places array of objects 
                                make sure to pass into th PlaceDetails place={place}
                            */}
                {/* childClicked is strict equal to index that means that PlaceDetails has been selected
                              and this childClicked was a string we have to convert it into a number before we actually test it.
                              and also pass the ref by saying refProp is equal elRefs[i] we might even need it later on in the Grid but will check later
                            */}
                <PlaceDetails
                  refProp={elRefs[i]}
                  selected={Number(childClicked) === i}
                  place={place}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
```

## Map.js

```js
import React from "react";
import GoogleMapReact from "google-map-react";
// Paper is basically a div with a background color
// useMediaQuery is going to help us with making our map
// more mobile responsive
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
// need a location outline icon
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

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
}) => {
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
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDXQRiGRmzbHStK8LgYY746naGLCnZiLgA" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          // console.log(e);
          // this is all we have to do to successfuly populate the variables for bounds and coordinates
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        // making the cards displayed on the map clickable
        // onChildClick is an evant listener and were going to have a method that listens for our events
        // and whenever we click on a child were going to get marginBounds as a parameter,
        // thenwe have to get the information on which child was clicked from the map component
        // all the way to our List component. so how can we do that?
        // well we can create a child and setChild click field under our states
        // and only use it inside the map. not inside the App or placeDetails. so were going to use a method called
        // lifting state out
        // now the setChildClicked state is in App.js passed as props to Maps component
        // and now that when we go back to App.js and call the function childClicked will be populated
        // and now we can pass it over to the List component in App.js
        onChildClick={(child) => setChildClicked(child)}
      >
        {/* open a new dynamic block to render pins on the map */}
        {places?.map((place, i) => (
          // for each place want to rendfer a div
          // this div has to have a few properties
          // className={classes.markerContainer} and  lat lng being use as strings
          // so we have to be numbers so we can use the Number constructor to to convert
          // place.long and lat to numbers, and now since were mapping over this div. we have
          // have to key, and we can set it to i which is the index,
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {/* inside our div we want to render our div with different things depending on mobile device or
              desktop. we can say if we are isMobile, and in that case we simply want to render out the icon
              but if your not on mobile then render a bit more information in the Paper component. Paper is 
              basically a background component, elevation={3} is giving it some box shadow className={classes.paper}
            */}
            {/* now we can say if it is not isDesktop show the pin other wise show the paper */}
            {/* as of right now we cant click on them when they show on the map as cards but they exist there
              lets add the ratings below the image
            */}
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primar" fontSize="large" />
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
                {/* ratings
                for value use Number constrcutor to get the place.rating as a number
                finally pass the read only property because our users can not change the ratings
                only reading it
              */}
                <Rating size="small" value={Number(place.rating)} readOnly />
                {/* also want the source and we can copy the source from our PlaceDetails */}
              </Paper>
            )}
          </div>
        ))}
        {/* GoogleMapReact is going to have quite a few props passed through it
                    first property is bootstrapURLKeys={{key:''}}
                    and inside we can specify the google maps key
                    to get our key will have to create a new project on 
                    google developers consol, will do that after we add all the props required
                    for this google map react. 2nd prop will be defaultCenter={} this will be
                    the center of our map and inside we can pass the coordinates.
                    right now we dont have real coordinates(probably will come from making an api call)
                    so create const coordinates = {} will be an object that will have the lat property and lng
                    inside defaultCenter={coordinates} pass in coordinates.
                    below defaultCenter will have center. this is the current center of the map and in there
                    can also pass in the coordinates.
                    set up the defaultZoom={14} seems to work best
                    then finaly margin={[]} it accepts an array and has 4 different properties
                    // 50 to the top, 50 to right, 50 on the bottom, 50 on the left
                    // later will have 3 properties
                    options={}, onChange={} will change the map, and onChildClick={} property which
                    will be used when you actually click on a resturaunt on the map, right now for our current app to work
                    just leave them with an empty string
                */}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
```

## End result for each file

- App.js

```js
// most important part of our application
import React, { useState, useEffect } from "react";
// this is a component from material ui that simply normalizes the styles
// it will fix some padding margins and backgrounds immediatley for us
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
// now how do we call getPlacesData function inside of our functional App component
// the answer is were going to create a useEffect

// when the page first loads sometimes all of the places on the map do not show
// switching the map works but still have issues with fetching the restaurants,
// depending on that specific location. also notice there are some empty restaurant need to be filter out those restaurans

import { getPlacesData, getWeatherData } from "./components/api";
const App = () => {
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  // lifting state for Map and List.js
  // can also solve this by using context or redux
  // pass setChildClicked to Map componet as props
  const [childClicked, setChildClicked] = useState(null);

  // setting a variable of coordinates and setCoordinates and the start of the useState set it to
  // an empty object
  // const [coordinates, setCoordinates] = useState({lat: 0, lng: 0})
  const [coordinates, setCoordinates] = useState({});
  console.log(coordinates);
  // we also need bounds and setBounds
  // remember the top right and the bottom left corner we are going to call them bounds
  // and the bounds will be set to null, now we have the data for bounds but its not populated yet
  // these are just empty values, so we have to pass our setter functions as props to our Map component
  // also our Map component is going to have to use these coordinates so lets pass in the state itself coordinates

  // const [bounds, setBounds] = useState(null)
  const [bounds, setBounds] = useState({});

  // supposedly shows the value not being updated when logged but I see the bounds be logged
  // make sure in the dependancy array in the useEffect
  console.log(bounds);
  console.log(bounds);

  // creating a state for loading
  // right before we call the getPlacesData in the useEffect
  const [isLoading, setIsLoading] = useState(false);
  // lifting state from List
  // pass these as props to List
  // this is not best practice, as you can see
  // were creating a lot of states inside of our App.js, and were passing everything
  // as props through our ocmponents, once again this is not best practice, but in this case
  // it is just fine, because we are passing it one level down only to the List
  // but if we had one more component in the List which we needed to pass those props again from the list
  // to that component or even deeper, strongly advice use react contextbut in this case
  // this is just fine, so lets go in to list and get these from props
  const [type, setType] = useState("resturaunt");
  const [rating, setRating] = useState("");

  const [autocomplete, setAutocomplete] = useState(null);
  // so whats going to happen onLoad were going to get that autoComplete
  // call it autoC and set that setAutocomplete(autoC)
  const onLoad = (autoC) => setAutocomplete(autoC);
  // we want to set something to the state
  // finaly implement the onPlaceChanged =() =>{}
  const onPlaceChanged = () => {
    // we need to find the lat and long of the new location
    // how did we get the autocomplete.getPlace().geometry.location.lat() info?
    // you can find online googlemap documentation
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    // what do we want to do once we get our new place
    // we want to set it to the state, more specifically we want to go back into App.js
    // and change our coordinates state, we can do that by passing setCoordinates as a prop to Header in app
    setCoordinates({ lat, lng });
  };

  // this useEffect is only going to happen at the start
  // remember useEfect is a callback function and then we have the dependancy array
  // now we need what we had before, an empty dependancy array
  useEffect(() => {
    // because this should only happen at the start
    // to get the user coordinates we can use their built in browser geo location api
    // we can say navigator.geolocation.getCurrentPosition(()=?{}) and inside the getCurrentPosition were going to have a callback function
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        // we can choose what do we want to do with that data
        // and inside here were getting some data so put an object inside the paramater to destructure it to immediately get the coordinates called coords:
        // and we get destructure the value to get the {latitude, longitude}
        // now that were getting the data we can say setCoordinates({ lat: latitude, lng: longitude }) to an object of lat:
        // now that were getting these coordinates we no longer need the default value of the coordinates to be lat: 0, lng: 0 and simply leave them as an empty {} object
        // now our browser should be getting or geolocation immediately and our map should be positioning around our location
        // your reload your page or going back to your browser you will see an alert that says share your location with google? click yes and it will show where your area
        // can have a mock location google chrome allows you to mess with the geolocation
        // to do click on the vertical 3 dots, and click more tools and click sensors
        // drag up from the bottom of your dev tools and in the location drop down can pick berlin london moscow ...
        // you can also toggle the location icon in the browser if you want it to keep taking in your location
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  // filter by rating
  // is it legal to have so many useEfects? the answer is yes but
  // every single one of them needs to serve a different purpose
  // the useEffect that has navigator only happens at the start bcause the dependancy array is empty []
  // the useEffect that has the getPlacesData, happens when type, coordinates, or bounds changes
  useEffect(() => {
    // this one is going to change only when the rating changes
    // each one serves a different purpose
    // the places.filter function takes a call back function with place inside and
    // were going to say if place.rating is larger than the current rating if that is the case then we want to return
    // that specific place. that means if the rating of the place is larger of the current selected rating then we want to return
    // that place. finally we want to set these filteredPlaces to a new state
    const filteredPlaces = places.filter(
      (place) => Number(place.rating) > rating
    );
    setFilteredPlaces(filteredPlaces);
    // where are we going to use this filtered places
  }, [rating]);

  useEffect(() => {
    // if bounds is true only then we want to do everything in this code
    // if we dont have the lat and lng the bounds.sw and the bounds.ne
    // we dont want to make this request and just to be sure everything is going to
    // work add in the data?. in case we dont have the data
    if (bounds.sw && bounds.ne) {
      // useEffect is a function that accepts another call back function ()=>{} then inside
      // call getPlacesData(), and dont forget at the end of the useEffect function we have to have the
      // dependancy array. The empty dependancy array means that the code inside of this function
      // block will happen only at the start of the application and right now thats exactly what
      // we want to do.
      // remember that this function getPlacesData() returns the resturants data
      // so lets set the data to the state
      // also have to remember that our getPlaces is an asyncrhonous function
      // then means we have to call the .then() on it, then .then(()=>{}) accepts a call back function
      // when then we pass in data in the parameter and getting that data and what we want to do is
      // is simply call the setPlaces(data) and set the data to those places

      // so now that that we have our coordinates and bounds we simply need to pass them over to our getPlacesData
      // first parameter we can pass bounds.sw because we got that information from logging the event from the GoogleMapReact
      // in the Maps component and in the onChange call back function set the bounds to e.marginBounds.
      // after passing the bounds parameter we can go to the api index.js and accept those bounds there
      // error: when passing in bounds.sw, bounds.ne wepage is blank
      // if(!bounds){
      //     return <div>loading...</div>
      // }
      setIsLoading(true);
      // before getPlacesData call getWeatherData
      // pass in coordinates
      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );

      // and finally after fetching the data when setIsLoading to true
      // in the .then() above setPlaces(data) setIsLoading back to false
      // finally now that we have this state isLoading pass it over to the List component
      // before bounds pass type
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        // as soon as we get the data we need to filter that data to remove these things
        // inside of setPlaces(data.filter(place => place.name)) we get a specific place,
        // we simply want to check is there the name place.name, does this place have a name
        // && if it does does it also have place.num_reviews > is larger than 0
        // if both of the conditions are true place.name && place.num_reviewse >0 then we
        // want to keep that place. also one important check is to only make that request if there are bounds
        console.log(data); //api get request successful and shows 7 objects
        // console.log(bounds)
        // now is the time to make this dynamic because we are passing in static information like the coordinates
        // we have to get real information from the position of our map
        // and then based on that we have to call the right resturants for that map
        // to do that we will have to pass some information into this getPlacesData() function
        // so lets create more useState
        // setPlaces(data);
        // this one will take out any place that has no no name and 0 reviews
        // setPlaces(data)?.filter((place) => place.name && place.num_reviews === 0);
        setPlaces(data)?.filter(
          (place) => place.name && place.num_reviews >= 0
        );
        setIsLoading(false);
        setFilteredPlaces([]);
      });
    }
    // ERROR
    // when the page loads itself after updating the code, we can see all the restaurants
    // but when switching to a different place, it will still show the last locations restaurants
    // in this list and on the map cant see anything
    // always want to know which ones are currently active places
    console.log("places 👩", places);
    // and also what is the current active filteredPlaces
    // maybe thats causing the error
    console.log("filteredPlaces 👨", filteredPlaces);
    // filteredPlaces is empty which is fine
    // we can try switching the rating, everything shows for both plaecs and filteredPlaces
    // but when moving the map, these restaurents didnt dissapear
    // the if statement is not correct example. if(bounds) is always going to be executed
    // our bounds is set to be at default an empty object, and an empty object is always truthy
    // so rather check for bounds, we can check for more specific bounds.sw && bounds.ne,
    // so this helps with saying if bounds is an empty object the current if statement with bounds.sw will make
    // the empty object bounds falsy, unfortunately we still have restaurants from the last place searched
    // that means we havent properly reset the value of places, when switching to a new place. we can solve this problem
    // by simply removing the coordinates from the dependancy array. we need to do that because now in the header
    // we are changing the coordinates, and theyre being changed 2 times both in the onPlaceChanged arrow funtion with setCoordinates
    // and also on Map component, setCoordinates onChange in GoogleMapReact component
    // so we removed the coordinates from the dependancy array in the useEffect and we only want
    // to recall the getPlacesData once we change the bounds.

    // if we want everything to be reran in the useEffect everytime the map changes
    // we have to add the coordinates and bounds in the dependancy array
    // that is one proeblem solved, I also want to automatically set the coordinates to be the coordinates of the users location
    // so as soon as the users launch the page, we should be able to get their  lat and lng
    // we can do that by using one more useEffect() under the bounds state
  }, [type, bounds]);
  return (
    <>
      <CssBaseline />
      <Header
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        setCoordinates={setCoordinates}
      />
      <Grid container spacing={3}>
        {/* xs={12} means that this Grid is going to take full width on mobile devices */}
        {/* but then on medium device md or larger its only going to take 4 spaces  */}
        {/* remember that list was only showing on the left side and the map was taking
        much more space. the md={4} is what it makes it happens, so its saying only take 4 out of the 12 spaces on medium or larger devices */}
        <Grid item xs={12} md={4}>
          {/* first Grid will take our List component */}
          {/* <List places={places}/> */}
          {/* go to List and we can do something with the childClicked value */}
          {/* so for filteredPlaces.
            if we have the filteredPlaces, then render the filteredPlaces else
            just render the places
            then again anytime we get new getplacesData 
            we want to reset our setFilteredPlaces([])
            back to an empty array
          */}
          <List
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            isLoading={isLoading}
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {/* 2nd Grid will contain Map.
                    The Map is taking up more space so it will take an md={8}
                */}
          {/* make sure after passing in the propse to go to Map component and pass them in the parameter destructured */}
          {/* pass in places to our Map to display them on the map */}
          {/* passing in information is still ok because were only sending it one level deep from our App to our map. 
                if its starts to get deeper like 2 or 3 levels deep then we have to consider using redux or react context  */}
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
```

- api/index.js

```js
// this is where were going to keep all of our api calls.
// axios is the library that will help us make our calls
import axios from "axios";
// since we are using axios the method is automatically a GET request
// so we dont need the method: 'GET'
// const options = {
//     // when it comes to params we definetley need the bottom left lat bl_lat and bl_long and tr_lat tr_long
//     // and dont need any of the other options like rasturaunt limit currency open_now lunit lang
//     params: {
//       bl_latitude: '11.847676',
//       tr_latitude: '12.838442',
//       bl_longitude: '109.095887',
//       tr_longitude: '109.149359',

//     },
//     // need headers, because this is where your rapiapi resides
//     // that means will have put the x-rapidapi-key: in an environment variable
//     headers: {
//       'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
//       'x-rapidapi-key':'8dd35320d3msh23f0bafb64aea8fp164011jsnd1d2d4683ea2'
//     }
//   };
//   can delete or comment out the axios call copied from rapidapi because we already have our axios call
//   axios.request(options).then(function (response) {
//       console.log(response.data);
//   }).catch(function (error) {
//       console.error(error);
//   });

// in here lets create a function thats going to make that api call
// accepting the bounds.sw, bounds.ne passed as parameters from App.js
// and recall them sw, ne.
// so how can we pass these values from our api request?
// well as you can see above in the options object there are static values
// so copy the entire object and remove it from there or comment out. and place
// as the 2nd paramter in the axios.get call and replace options. then you can start placing the paramters
//  that we got sw, ne and put them in the lat lng
export const getPlacesData = async (type, sw, ne) => {
  // not showing sw and ne when passing in the bounds.ne ... in app.js useEffect()
  console.log("sw", sw);
  console.log("ne", ne);
  // console.log(ne)
  try {
    // inside the try catch block it usually has a request
    // that says if the request is successful then the code runs as its supposed to run
    // inside of the try
    // but if the request fails then our code is redirected to the catch error block
    // the url will come from rapid api search travel Advisor
    // https://rapidapi.com/apidojo/api/travel-advisor/
    // if using it for the first time, have to click subscribe to this api
    // and then choose the basic plan, its free and up to 500 request a month
    // for our testing purposes that will be more than a enough, once done go back to the
    // endpoints tab above. and in there we can see what endpoints that we can make
    // we can make endpoints to the locations get the autocomplete
    // GET locations/v2/auto-complete, we can also post different hotels
    // POST
    // hotel-filters/v2/list
    // hotels/v2/list
    // hotels/v2/get-details
    // hotels/v2/get-offers
    // or get hotels we can list them by lng lat
    // GET hotels/list-by-latlng (Deprecated)
    // click the blue Test Endpoint to check it out
    // if we wanted to get everything in the center of a location of one dot
    // for example if were in the us in california. if we make this a central point
    // and if theres a lot of resturants all of the resturants will be populated
    // in this exact area, but we dont want to just see resturants at that central point.
    // we want to see the entire area visible on the map.
    // thats we use list in boundary
    // GET hotels/list-in-boundary (Deprecated)
    // in this case you have to pass the lat and lng of the bottom left bl_latitude,bl_longitude  corner of the map, and the top right corner of lat and lng tr_longitude,tr_latitude
    // so we have to find the position of the bottom left corner and the top right corner
    // if we do that, the resturants that we fetch to be scattered accross the entire map
    // so exactly do we make this call

    // pass in URL in the get, and the second parameter are the options,
    // simply pass in the options object
    // const response = await axios.get(URL, options);
    // we can return the response but were interested in the data thats inside of the response
    // so we can destructure {data : {data}} from the response given from the axios call and have it written like this
    // and destructure one more time to get the data from inside to get to our resturant
    // const {data: {data}} = await axios.get(URL, options);
    // // finally can return that data
    // console.log(data)

    // get call not going through because used up all the free api calls offered by this api. on 1-15-22
    // await axios.get(`https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`, replace restaurant with ${type}
    // we are simply going to get that type through our parameters in getPlacesData
    // the type is for hotels, attractions or restaurants, this simple change made our code dynamic
    // when our type changes we need to ad that to the dependancy array in App.js
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_latitude: ne.lat,
          tr_longitude: ne.lng,
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key":
            "6e9614f630mshadd064b196a92b8p15758bjsn6e154058c073",
        },
      }
    );
    // now the data that we return should be inside our map
    return data;
  } catch (error) {
    console.log(error);
  }
};

// the main question is where are we going to call this function
// will call in App.js
// getting lat lng
export const getWeatherData = async (lat, lng) => {
  // try {
  //   // destructure the data
  //   // after the url , is the options object.
  //   // we wont need queries q, only need lat and lon
  //   // const { data } = await axios.get(
  //   //   "https://community-open-weather-map.p.rapidapi.com/find",
  //   //   {
  //   //     params: {
  //   //       lat: lat,
  //   //       lon: lng,
  //   //     },
  //   //     headers: {
  //   //       "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
  //   //       "x-rapidapi-key": "350daf123cmsh717efed3ca90299p136988jsn4263a1a5de3b",
  //   //     },
  //   //   }
  //   // );
  //   if (lat && lng) {
  //     const { data } = await axios.get(
  //       "https://community-open-weather-map.p.rapidapi.com/find",
  //       {
  //         params: { lat, lon: lng },
  //         headers: {
  //           "x-rapidapi-key":
  //             "350daf123cmsh717efed3ca90299p136988jsn4263a1a5de3b",
  //           "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
  //         },
  //       }
  //     );
  //   }
  //   // finally what do we do with the data
  //   // we return it
  //   // make sure to pass the weatherData to the Map component in App.js
  //   return data;
  // } catch (error) {
  //   console.log(error);
  // }
  try {
    if (lat && lng) {
      const { data } = await axios.get(
        "https://community-open-weather-map.p.rapidapi.com/find",
        {
          params: { lat, lon: lng },
          headers: {
            "x-rapidapi-key":
              "350daf123cmsh717efed3ca90299p136988jsn4263a1a5de3b",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          },
        }
      );

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
```

- Header

```js
import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
  AppBar,
  Toobar,
  Typography,
  InputBase,
  Box,
  Toolbar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
// importing useStyles from './styles'
import useStyles from "./styles";
// just by seeing the name the useStyles seems to be a hook
// so lets call it how we usually call hooks.
// const classes = useStyles() and call it like a  function
// so how do the classes work in material ui
// remember we have the styles.js file so inside we need to import some things.

// to implement our search we do it in our Header component
// in here we have the AutoComplete component
const Header = ({ setCoordinates, onLoad, onPlaceChanged }) => {
  const classes = useStyles();

  // intialize a new state field
  // const [autocomplete, setAutocomplete] = useState(null);
  // // so whats going to happen onLoad were going to get that autoComplete
  // // call it autoC and set that setAutocomplete(autoC)
  // const onLoad = (autoC) => setAutocomplete(autoC);
  // // we want to set something to the state
  // // finaly implement the onPlaceChanged =() =>{}
  // const onPlaceChanged = () => {
  //   // we need to find the lat and long of the new location
  //   // how did we get the autocomplete.getPlace().geometry.location.lat() info?
  //   // you can find online googlemap documentation
  //   const lat = autocomplete.getPlace().geometry.location.lat();
  //   const lng = autocomplete.getPlace().geometry.location.lng();
  //   // what do we want to do once we get our new place
  //   // we want to set it to the state, more specifically we want to go back into App.js
  //   // and change our coordinates state, we can do that by passing setCoordinates as a prop to Header in app
  //   setCoordinates({ lat, lng });
  // };

  return (
    <>
      {/* creating layout for navigation bar */}
      <AppBar position="static">
        {/* will say error classes is not defined
                but we will import the classes from material ui
                and add them
            */}
        <Toolbar className={classes.toolbar}>
          {/* Typography is every single text element
                    , you can change the variant to be heading, subtitles,
                    and titles
                */}
          <Typography variant="h5" className={classes.title}>
            Travel Advisor
          </Typography>
          <Box display="flex">
            {/* in material ui a box is simply a div */}
            <Typography variant="h6" className={classes.title}>
              Explore new places
            </Typography>
            {/* disable <Autocomplete to see the AppBar at first */}
            {/* for our search bar Autocomplete requires 2 props that need to be passed into it.
              onLoad handler. what is going to happen once we load the Autocomplete component
              onPlaceChanged is the 2nd handler, whats going to happen once we change the place
              lets implement these 2 functions onLoad and onPlaceChaned
            */}
            {/* if you take a look at the Autocomplete were never actually connecting it to the Google maps ap
              we didnt input any api key or any such thing like that
              thats beacuse with import {Autocomplete} from '@react-google-maps/api'
              we have to do it using a script tag in the public/index.html

            */}
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                {/* classes will be equal to an object, because we are going to add multiple classes
                                first going to set our root class to classes.inputRoot,
                                then input class to classes.inputInput
                            */}
                <InputBase
                  placeholder="Search..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </Autocomplete>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
// styles.js
// import { makeStyles } from "@material-io/core/styles";
// // export these StylesContext we can call this as a function and inside
// // it requires one more call back function
// export default makeStyles((theme) => ({
//   // the call back function inside returns an object
//   // so we have to wrap it in parenthesis ({()})
// //   whatever styles you want to add you can add them in css in js type of way
//     // that means that if you want to have a className of title,
//     // you would create a title property thats going to be an object
//     // then you can set the color to be 'red'
//     title: {
//         color: 'red'
//     }
//     // you can also pass in a theme object which allows you to
//     // use their colors and padding and everything else
// }));
import { alpha, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
  },
  searchIcon: {
    padding: theme.spacing(0, 2), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0), paddingLeft: `calc(1em + ${theme.spacing(4)}px)`, transition: theme.transitions.create('width'), width: '100%', [theme.breakpoints.up('md')]: { width: '20ch' },
  },
  toolbar: {
    display: 'flex', justifyContent: 'space-between',
  },
}));
```

- List

```js
import React, { useState, useEffect, createRef } from "react";
// CircularProgress is material ui's loading bar
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./styles";
// this is for Card
import PlaceDetails from "../PlaceDetails/PlaceDetails";

// the only reason were passing type setType rating and setRating is because in the App.js
// we have access to ratings and to types and now we can use them to get different data from our
// getPlcesData api, so our first paramter to our getPlacesData
const List = ({ childClicked, places, isLoading, type, setType, rating, setRating }) => {
  const classes = useStyles();
  // start filtering our places
  // going to lift the state up. type and rating
  // copy the rating and type state and move to App.js
  // const [type, setType] = useState("resturaunt");
  // const [rating, setRating] = useState("");
  const [elRefs, setElRefs] = useState([]);
  console.log(elRefs)
  console.log({childClicked})
  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
    console.log(elRefs)
    setElRefs(refs);
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Resturants, Hotels & Attractions around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid item key={i} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
// styles.js
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1), minWidth: 120, marginBottom: '30px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  container: {
    padding: '25px',
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: '75vh', overflow: 'auto',
  },
}));
```

- Map

```js
import React from "react";
import GoogleMapReact from "google-map-react";
// Paper is basically a div with a background color
// useMediaQuery is going to help us with making our map
// more mobile responsive
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
// need a location outline icon
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import mapStyles from "./mapStyles"
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
}) => {
  console.log(weatherData)
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
        bootstrapURLKeys={{ key: "AIzaSyDXQRiGRmzbHStK8LgYY746naGLCnZiLgA" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
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
              <LocationOnOutlinedIcon color="primar" fontSize="large" />
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
        {weatherData?.list?.length && weatherData.list.map((data, i) => (
          // for each weather data return a data that div will have a key equal to index will have latitude equal to data.coord.lat
          // and lng property will equal dta.coord.lon
          // and the only thing we need inside of that div is the img
          // img will have the src equal to template string https://openweathermap.org/img/w/${data.weather[0].icon} in there we want to use a dynamic value that were getting form data
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px"
            />
            {console.log(data)}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
// styles.js
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  paper: {
    padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',
  },
  mapContainer: {
    height: '85vh', width: '100%',
  },
  markerContainer: {
    position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
  },
  pointer: {
    cursor: 'pointer',
  },
}));
```

- PlaceDetails

```js
import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles.js";

const PlaceDetails = ({ place, selected, refProp }) => {
  console.log(selected)
  console.log(refProp)
  if (selected) refProp?.current?.scrollIntoView({  block: "start",behavior: "smooth" });

  const classes = useStyles();

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography component="legend">
            {place.num_reviews} review{place.num_reviews > 1 && "s"}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box
            display="flex"
            justifyContent="space-between"
            my={1}
            alignItems="center"
          >
            <img src={award.images.small} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place.address && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon />
            {place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.web_url, "_blank")}
        >
          Trip Advisor
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.website, "_blank")}
        >
          Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
// styles.js
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  chip: {
    margin: '5px 5px 5px 0',
  },
  subtitle: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px',
  },
  spacing: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
}));
```

- index.js main file

```js
// first file created after deleting the original src folder
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

## Error Fix

- Put Api keys in an environment variable file .env and noticed it wasnt in the root folder. Should be out of src folder. Took it out and the api kept saying it was undefined.

  - FIXED: solution to issue was restarting vs code.
  - Another solution also to make this work is to go to view tab and click terminal, and press ctrl c to stop it from running. and npm start to rerun the server for all of these changes to take effect.

- event scrollIntoView was not working when clicked in. Console.log(elRefs) it was showing current: null, but it was logging out each place with no info.
  - solution: needed to pass in refs={elRefs[i]} in the Grid component in List.js
