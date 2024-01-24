const MINUTS_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const DATE_FORMAT = 'MMM D';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';


const CITIES = [
  'Amsterdam', 'Geneva', 'Paris', 'Moscow', 'New York', 'London', 'Berlin', 'Madrid', 'Oslo', 'Helsinki' ];

const EVENT_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const EVENT_TYPES = [
  'taxi', 'bus', 'train', 'ship', 'drive',
  'flight', 'check-in', 'sightseeing', 'restaurant'
];

const BLANK_TRIP_EVENT = {
  type: 'flight',
  destination: '',
  startTime: new Date(),
  endTime: new Date(),
  price: 0,
  favorite: false,
  offers: []
};

const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future'
};

const FILTERS = [
  {
    type: FilterType.EVERYTHING,
    isChoosen: true,
    isDisabled: false
  },
  {
    type: FilterType.FUTURE,
    isChoosen: false,
    isDisabled: true
  },
  {
    type: FilterType.PRESENT,
    isChoosen: false,
    isDisabled: false
  },
  {
    type: FilterType.PAST,
    isChoosen: false,
    isDisabled: false
  },
];

const EmptyMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const sorts = [
  {
    type: SortType.DAY,
    isChoosen: true,
    isDisabled: false
  },
  {
    type: SortType.EVENT,
    isChoosen: false,
    isDisabled: true
  },
  {
    type: SortType.TIME,
    isChoosen: false,
    isDisabled: false
  },
  {
    type: SortType.PRICE,
    isChoosen: false,
    isDisabled: false
  },
  {
    type: SortType.OFFERS,
    isChoosen: false,
    isDisabled: true
  },
];

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing'
};

const UserAction = {
  UPDATE_EVENT: 'update_event',
  DELETE_EVENT: 'delete_event',
  CREATE_EVENT: 'create_event'
};

const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major'
};

export {
  MINUTS_IN_HOUR,
  HOURS_IN_DAY,
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  TIME_FORMAT,
  CITIES,
  EVENT_DESCRIPTIONS,
  EVENT_TYPES,
  BLANK_TRIP_EVENT,
  FILTERS,
  EmptyMessage,
  FilterType,
  sorts,
  Mode,
  UserAction,
  UpdateType,
  SortType
};
