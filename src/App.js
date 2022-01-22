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

import { getPlacesData, getWeatherData, getCovidData } from "./components/api";
const App = () => {
  console.log(process.env.REACT_APP_RAPID_WEATHER_API_KEY);
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  // covidData state
  const [covidData, setCovidData] = useState([]);

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

  useEffect(()=>{
    getCovidData().then((data) =>
        setCovidData(data.data)
      );
  },[])
  // console.log(covidData)
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
  console.log(covidData)
  console.log(weatherData)
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
            covidData={covidData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
