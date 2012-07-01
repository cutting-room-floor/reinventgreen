
#coolroofs {
   marker-width:4;
  marker-opacity: .5;
  marker-fill:#2f969c;
  marker-line-color:#007678;
  marker-allow-overlap:true;
  ["sqft" > 5000] { marker-width: 6; }
  ["sqft" > 10000] { marker-width: 8; }
  ["sqft" > 20000] { marker-width: 10; }
  ["sqft" > 30000] { marker-width: 12; }
  ["sqft" > 40000] { marker-width: 14; }
  ["sqft" > 50000] { marker-width: 16; }
 }
