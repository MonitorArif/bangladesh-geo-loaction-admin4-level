## Data Files
- `divisions.csv`: List of divisions (columns: `id`, `name`, `code`).  
- `districts.geojson`: Districts in GeoJSON format (properties: `name`, `division_id`).  
- `mouzas.json`: Dynamically fetched from DLRMS API (run `npm install` + `node fetch-mouzas.js` to update).  

## How to Use
### Direct URLs (Raw GitHub)
```javascript
fetch("https://raw.githubusercontent.com/MonitorArif/bangladesh-geo-loaction-admin4-level/main/data/districts.geojson")
  .then(response => response.json())
  .then(data => console.log(data));
