import moment from 'moment';
import 'moment-timezone';

export const timeFormat = 'hh:mm';
export const timeZone = 'Europe/Istanbul';

export function isToday(date) {
    return moment(date).tz(timeZone).isSame(new Date(), 'day');
}

export function isAnniversary(date) {
    const joinDateMoment = moment(date).tz(timeZone);
    const now = moment().tz(timeZone);

    if (now.date() !== joinDateMoment.date() || now.month() !== joinDateMoment.month()) {
        return 0;
    }
    return now.diff(date, 'years');
}

export function isTodayBirthday(date) {
    return isAnniversary(date) > 0;
}

export function isBetween(start, end) {
    const now = moment().tz(timeZone);
    const startMoment = moment(start, timeFormat).tz(timeZone);
    const endMoment = moment(end, timeFormat).tz(timeZone);
    const result = now.isBetween(startMoment, endMoment, 'minutes', '[]');

    // console.log({ now, startMoment, endMoment, result });
    return result;
}
