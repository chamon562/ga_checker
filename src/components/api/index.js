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
          "x-rapidapi-key": process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
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
  try {
    if (lat && lng) {
      const { data } = await axios.get(
        "https://community-open-weather-map.p.rapidapi.com/find",
        {
          params: { lat, lon: lng },
          headers: {
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_WEATHER_API_KEY,
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

export const getCovidData = async (regionName) => {
  try {
    const { data } = await axios.get(
      "https://covid-19-statistics.p.rapidapi.com/reports",
      {
        params:{
          region_name: regionName
        },
        headers: {
          "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_COVID_API_KEY
            ,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
