// Map{ background-color: #012;}

#staten {
  marker-width:.5;
	[DIAMETER <= 5]{marker-fill:#07f;}
	[DIAMETER <= 10][DIAMETER >5]{marker-fill:#3cbc7e;}
	[DIAMETER <= 15][DIAMETER >10]{marker-fill:#7f0;}
	[DIAMETER <= 20][DIAMETER >15]{marker-fill:#bcff00;}
	[DIAMETER > 20]{marker-fill:#ff0;}
  marker-opacity:.1;
  marker-line-width:0;
  marker-allow-overlap:true; 
  [zoom =12] { marker-width:1; }
  [zoom =13] { 
    marker-width:1; 
    marker-opacity:.25;
  }
  [zoom =14] { 
    marker-width:1.5;
    marker-opacity:.5;
  }
  [zoom =15] { 
    marker-width:2;
    marker-opacity:.75;
  }
  [zoom =16] { 
    marker-width:2.5;
    marker-opacity:.8;
  }
  [zoom =17] { 
    marker-width:3; 
    marker-opacity:.85;
  }
}

