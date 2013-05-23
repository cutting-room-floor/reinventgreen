Reinvent Green Maps
===================

[TileMill](http://mapbox.com/tilemill/) projects for maps we have rendered out in prep for the Reinvent Green Hackathon June 30/July 1st in New York City.

[For more background, head over to our blog](http://mapbox.com/blog/reinvent-green).

## Cool roof buildings

`coolroofs/`

There are over 200 cool roof buildings in New York City. This newly opened dataset identifies them by street address and geo location ([Source](https://nycopendata.socrata.com/Environmental-Sustainability/NYC-Cool-Roofs-Buildings/uuxn-wzxe)).

## Street trees

`/nyc-trees`

A census of street trees by borough yielded datasets with a total of 623939 trees ([Source](https://nycopendata.socrata.com/browse?q=street%20tree%20census&sortBy=relevance)). This map contains all boroughs except Staten Island.

## Green streets

`nyc-greenstreets`

Small planted areas that are maintained as [Greenstreets](http://www.nycgovparks.org/trees) ([Source](https://nycopendata.socrata.com/Environmental-Sustainability/Greenstreets/p23h-ci72)).


## Building perimeter outlines

`/nyc-buildings`

Rich dataset containing over one million building footprints of New York City. Here we've colored them by footprint area ([Source](https://nycopendata.socrata.com/Facilities-and-Structures/Building-Perimeter-Outlines/r7fd-yd5e)).

NOTE: this is powered by a postgis data, since the data are so heavy. We can give db dumps tomorrow morning - just ping me at [@ian_villeda](https://twitter.com/ian_villeda)

## School zones

`nyc-school-zones`

Elementary and middle school zones of New York City ([Source](https://nycopendata.socrata.com/Education/School-Zones-2011-2012/dqkt-8x6u)).

NOTE: This layer can generate both middle and elementary school zone maps. To toggle between them, just uncomment the layer you want to see, and comment out the layer you don't want to see, like this: 

```carto
/*
#nycmiddleschoolzones {
  line-color:darken(#00FF7F,20);
  line-width:1;
  polygon-opacity:.5;
  polygon-fill:#00FF7F;
}

*/

#nycelementaryschoolz {
  line-color:darken(#007FFF,20);
  line-width:1;
  polygon-opacity:.5;
  polygon-fill:#007FFF;
}
``` 

