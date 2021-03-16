let date = new Date();
date.setFullYear(2022);
date.setMonth(2);
date.setDate(18);
date.setHours(19, 0, 0);

const event = {
    showTitle: "Sonny & Cher",
    showStart: date.toISOString(),
};

module.exports.event = event;
