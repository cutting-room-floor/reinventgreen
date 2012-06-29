//Map { background-color:#012; }

#buildings { 
  [area_m > 100000] { polygon-fill:#F00; }
  [area_m > 10000][area_m <= 100000] { polygon-fill:#ff007f; }
  [area_m > 1000][area_m <= 10000] { polygon-fill:#F0F; }
  [area_m > 100][area_m <= 1000] { polygon-fill:#7f00ff; }
  [area_m > 10][area_m <= 100] { polygon-fill:#0ff; }
  [area_m <= 10] { polygon-fill:#0ff;  } 
}


