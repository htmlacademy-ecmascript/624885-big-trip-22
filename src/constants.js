const MINUTS_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const DATE_FORMAT = 'MMM D';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';

const TripEventTypes = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant'
};

const BLANK_TRIP_EVENT = {
  type: TripEventTypes.FLIGHT,
  destination: '',
  startTime: '',
  endTime: '',
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
    isDisabled: false
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
  MAJOR: 'major',
  INIT: 'init'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  POST: 'POST'
};

const AUTHORIZATION = 'Basic BvRk6qmoo5l0XSyz';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const SourceURL = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers'
};

const TimeLimit = {
  LOWER_LIMIT: 300,
  UPPER_LIMIT: 1000
};

export {
  MINUTS_IN_HOUR,
  HOURS_IN_DAY,
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  TIME_FORMAT,
  BLANK_TRIP_EVENT,
  FILTERS,
  EmptyMessage,
  FilterType,
  sorts,
  Mode,
  UserAction,
  UpdateType,
  SortType,
  Method,
  AUTHORIZATION,
  END_POINT,
  SourceURL,
  TimeLimit,
  TripEventTypes
};
