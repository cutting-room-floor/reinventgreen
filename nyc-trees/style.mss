Map { background-color: #012; }

//#countries { line-color: #fff; }

#trees {
  marker-width:.5;
  [zoom =12] { marker-width:1; }
  [zoom =13] { marker-width:1; }
  [zoom =14] { marker-width:2; }
  [zoom =15] { marker-width:3; }
  [zoom =16] { marker-width:4; }
  [zoom =17] { marker-width:5; }
  marker-fill:#7f0;
  marker-opacity:.1;
  [zoom =13] { marker-opacity:.25; }
  [zoom =14] { marker-opacity:.5; }
  [zoom =15] { marker-opacity:.75; }
  [zoom =16] { marker-opacity:.8; }
  [zoom =17] { marker-opacity:.85; }
  marker-line-width:0;
  marker-allow-overlap:true;
}
