
#nycelectric {
  [kwhint > 0] { 
    polygon-opacity:.5;
    polygon-fill:#41d6f5;
  }
  [kwhint > 10000] {polygon-fill:#38a6ef;}
  [kwhint > 50000] {polygon-fill:#3080e8;}
  [kwhint > 100000] {polygon-fill:#2842e2;}
  [kwhint > 500000] {polygon-fill:#3a20db;}
  [kwhint > 1000000] {polygon-fill:#6318d5;}
  [kwhint > 5000000] {polygon-fill:#8c11ce;}
  [kwhint > 100000000] {polygon-fill:#c70bbd;}
}
