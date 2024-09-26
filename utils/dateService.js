const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);
dayjs.extend(timezone);

const formatDatesToColombiaTime = (instance) => {
  return {
    ...instance.dataValues,
    createdAt: dayjs(instance.createdAt).tz("America/Bogota").format(),
    updatedAt: dayjs(instance.updatedAt).tz("America/Bogota").format()
  };
};

const formatRaffleDatesToColombiaTime = (raffle) => {
    return {
      ...formatDatesToColombiaTime(raffle),
      gameDate: raffle.gameDate ? dayjs(raffle.gameDate).tz("America/Bogota").format() : null,
      closeDate: raffle.closeDate ? dayjs(raffle.closeDate).tz("America/Bogota").format() : null,
      expirationDate: raffle.expirationDate ? dayjs(raffle.expirationDate).tz("America/Bogota").format() : null,
      dateTimePublication: raffle.dateTimePublication ? dayjs(raffle.dateTimePublication).tz("America/Bogota").format() : null
    };
  };

module.exports = {
  formatDatesToColombiaTime,
  formatRaffleDatesToColombiaTime
};