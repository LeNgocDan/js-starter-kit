const dataJson = [{
  "Code": "008",
  "Name": "NGUYỄN TRÍ DŨNG",
  "Branch": "D. BEE - Hải Phòng",
  "Dept": "Kinh Doanh BEEHPH"
},
{
  "Code": "028",
  "Name": "NGUYỄN THỊ HẬU",
  "Branch": "D. BEE - Hải Phòng",
  "Dept": "Giao Nhận BEEHPH"
},
]

export const participants = JSON.parse(JSON.stringify(dataJson));

export const PERSON_PARTICIPANT_MAP = new Map();
participants.forEach(function (participant) {
  PERSON_PARTICIPANT_MAP.set(participant.Code, participant);
})



