const dataJson = [
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

]

export const participants = JSON.parse(JSON.stringify(dataJson));

export const PERSON_PARTICIPANT_MAP = new Map();
participants.forEach(function (participant) {
  PERSON_PARTICIPANT_MAP.set(participant.Code, participant);
})



