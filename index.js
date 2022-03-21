// ДЗ2 Node
require('moment-precise-range-plugin');
const moment = require('moment');
const EventEmitter = require('events');
const [ dateNew ] = process.argv.slice(2);
const DatePattern = 'yyyy-mm-dd HH:mm:ss';

const getDate = (dateString) => {
  const [ hour, day, month, year ] = dateString.split('-');

  return new Date(Date.UTC(year, month - 1, day, hour - 3));
};

const timeRemaining = (dateInFuture) => {
  const dateNow = new Date();

  if (dateNow >= dateInFuture) {
    emitter.emit('timerEnd');
  } else {
    const dateToday = moment(dateNow, DatePattern);
    const dateFuture = moment(dateInFuture, DatePattern);
    const difference = moment.preciseDiff(dateToday, dateFuture);

    console.clear();
    console.log(difference);
  }
};

const timerDone = (timerId) => {
  clearInterval(timerId);
  console.log('Таймер завершён');
};

const emitter = new EventEmitter();
const dateInFuture = getDate(dateNew);
const timerId = setInterval(() => {
  emitter.emit('timerTick', dateInFuture);
}, 1000)

emitter.on('timerTick', timeRemaining);
emitter.on('timerEnd', () => {
  timerDone(timerId);
});
