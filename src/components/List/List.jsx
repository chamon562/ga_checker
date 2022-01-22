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
  console.log({childClicked})
  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [places]);
 console.log(elRefs)

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
              <Grid ref={elRefs[i]} item key={i} xs={12}>
                <PlaceDetails
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                  place={place}
                  />
              </Grid>
            //   <Grid ref={elRefs[i]} key={i} item xs={12}>
            //   <PlaceDetails 
            //   selected={Number(childClicked) === i} 
            //   refProp={elRefs[i]} 
            //   place={place} />
            // </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
