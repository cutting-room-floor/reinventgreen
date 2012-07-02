
#nycelectric {
  [kwhint > 0] { 
    polygon-opacity:.5;
    polygon-fill:#ff0000;
  }
  [kwhint > 10000] {polygon-fill:#999999;}
  [kwhint > 50000] {polygon-fill:#3080e8;}
  [kwhint > 100000] {polygon-fill:#2842e2;}
  [kwhint > 500000] {polygon-fill:#3a20db;}
  [kwhint > 1000000] {polygon-fill:#6318d5;}
  [kwhint > 5000000] {polygon-fill:#8c11ce;}
  [kwhint > 100000000] {polygon-fill:#c70bbd;}
}
