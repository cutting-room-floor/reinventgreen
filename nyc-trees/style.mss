// Map{ background-color: #012;}


#manhattan {
  marker-width:.5;
	[diameter <= 5]{marker-fill:#07f;}
	[diameter <= 10][diameter >5]{marker-fill:#3cbc7e;}
	[diameter <= 15][diameter >10]{marker-fill:#7f0;}
	[diameter <= 20][diameter >15]{marker-fill:#bcff00;}
	[diameter > 20]{marker-fill:#ff0;}
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

