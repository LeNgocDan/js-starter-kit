const dataJson = [{
  "Code": "714",
  "Name": "LÊ NGỌC ĐÀN",
  "Branch": "OF1",
  "Dept": "OF1"
},
{
  "Code": "718",
  "Name": "PHẠM MINH CHIẾN",
  "Branch": "OF1",
  "Dept": "OF1"
},
{
  "Code": "721",
  "Name": "LÊ QUANG NHẬT",
  "Branch": "OF1",
  "Dept": "OF1"
},
{
  "Code": "724",
  "Name": "VŨ THỊ HUYỀN TRANG",
  "Branch": "OF1",
  "Dept": "OF1"
},
{
  "Code": "726",
  "Name": "VŨ LÂM ANH",
  "Branch": "OF1",
  "Dept": "OF1"
},
{
  "Code": "728",
  "Name": "LƯƠNG VĂN ĐẠT",
  "Branch": "OF1",
  "Dept": "OF1"
},
{
  "Code": "729",
  "Name": "NGUYỄN NĂNG BÌNH",
  "Branch": "OF1",
  "Dept": "OF1"
},
{
  "Code": "733",
  "Name": "NGUYỄN THỊ HUYỀN TRANG",
  "Branch": "OF1",
  "Dept": "OF1"
},
{
  "Code": "735",
  "Name": "TRỊNH THANH YẾN",
  "Branch": "OF1",
  "Dept": "OF1"
}
]

export const participants = JSON.parse(JSON.stringify(dataJson));

export const PERSON_PARTICIPANT_MAP = new Map();
participants.forEach(function (participant) {
  PERSON_PARTICIPANT_MAP.set(participant.Code, participant);
})



