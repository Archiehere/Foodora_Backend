const nodeGeocoder = require('node-geocoder');
const { distanceTo, isInsidePolygon, isInsideCircle } = require('geofencer');
const options = {
    provider: 'openstreetmap'
  };
  const geoCoder = nodeGeocoder(options);
 function getlocation(address){
 
 geoCoder.geocode(address)
  .then((res)=> {
    console.log(res[0]);
  })
  .catch((err)=> {
    console.log(err);
  });}

  function getaddress(lat,lon){
  geoCoder.reverse({lat:28.6736836, lon:77.50377577025063})
  .then((res)=> {
    console.log(res[0]);
  })
  .catch((err)=> {
    console.log(err);
  });}

//   getlocation("Ajay Kumar Garg");
//   getaddress(28.6752434,77.5028992);
const userlat=0;
const restlat=0;
const userlong=0;
const restlong=0;
const circle = {
    center: [userlat, userlong], // red pyramid in Giza, Egypt
    radius: 10000 // 10km
}
const point = [restlat, restlong] // Alexandria... >5km away from Giza
const inside = isInsideCircle(circle.center, point, circle.radius);
const distance = distanceTo([userlat, userlong], [userlat, userlong]);
console.log(inside,distance/1000);
