const fs = require('fs');
const ids = ['matthew-broussard-bell-house-2026-11-15','jaboukie-young-white-bell-house-2026-11-17','peter-wong-grove-34-2026-10-08'];
const d = JSON.parse(fs.readFileSync('/tmp/picks-live.json','utf8'));
console.log('total live picks:', d.length);
d.filter(x => ids.includes(x.id)).forEach(x => console.log('live:', x.id, '|', x.title, '|', x.date, x.time_label, '|', x.venue));
