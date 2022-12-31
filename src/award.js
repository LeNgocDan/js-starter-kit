const dataJson = [{
  "Name": "Giải Nhất (test)",
  "Description": "Des....1",
  "MultiScroll": false,
  "Timer": 0.5
},
{
  "Name": "Giải Nhì (test)",
  "Description": "Des....2",
  "MultiScroll": true,
  "Timer": 0.5
},
{
  "Name": "Giải Ba (Quay nhiều số - 8s)",
  "Description": "Des....3",
  "MultiScroll": true,
  "Timer": 8
},
{
  "Name": "Giải 4 (Quay lần số - 3s)",
  "Description": "Des....4",
  "MultiScroll": false,
  "Timer": 3
},
{
  "Name": "Giải 5",
  "Description": "Des....5",
  "MultiScroll": true,
  "Timer": 8
},
{
  "Name": "Giải 6",
  "Description": "Des....6",
  "MultiScroll": true,
  "Timer": 8
},
]

export const awards = JSON.parse(JSON.stringify(dataJson));
