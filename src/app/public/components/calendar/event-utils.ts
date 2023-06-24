import { EventInput } from '@fullcalendar/angular';
let eventGuid = 0;

const TODAY_STR = () => {
  let dateObj = new Date();
  if(dateObj.getUTCMonth() < 10) {
    return dateObj.getUTCFullYear() + '-' + ('0'+(dateObj.getUTCMonth() + 1));
  } else {
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }
}

// Calendar Event Source
let exampleEvents = [
  {
    id: createEventId(),
    start: TODAY_STR() +'-08T08:30:00',
    end: TODAY_STR() +'-08T13:00:00',
    title: 'Roberto Alas',
    description: 'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis az pede mollis...',
    backgroundColor: 'rgba(1,104,250, .15)',
    borderColor: '#0168fa',
    display: 'block'
  },
  {
    id: createEventId(),
    start: TODAY_STR() +'-09T08:30:00',
    end: TODAY_STR() +'-09T13:00:00',
    title: 'Roberto Alas',
    description: 'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis az pede mollis...',
    backgroundColor: 'rgba(1,104,250, .15)',
    borderColor: '#0168fa',
    display: 'block'
  }
];

export const INITIAL_EVENTS: EventInput[] = [ ...exampleEvents];

// export const INITIAL_EVENTS: EventInput[] = [
//   {
//     id: createEventId(),
//     title: 'All-day event',
//     start: TODAY_STR
//   },
//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: TODAY_STR + 'T12:00:00'
//   }
// ];

export function createEventId() {
  return String(eventGuid++);
}