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
