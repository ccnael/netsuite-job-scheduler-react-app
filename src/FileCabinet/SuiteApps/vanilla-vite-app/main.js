import Board from './src/board';
import Calendar from './src/calendar';
import { cacheTabSwitch, Event, setupWorkOrderAction } from './src/components/utils';
import { setupFilters } from './src/components/filterFields/filterUtils';

$(document).ready(() => {
  Board.setup();
  Calendar.setup();

  Event.setupDeleteEventRecord();
  cacheTabSwitch();
  setupWorkOrderAction();
  setupFilters();
});