import Board from './src/board';
import Calendar from './src/calendar';
import { Cache, Event, handleDropDownOptions, handleWorkOrderAction } from './src/components/utils';
import { handleFilters } from './src/components/filterFields/filterUtils';

$(document).ready(() => {
  Board.setup();
  Calendar.setup();
  Cache.setDefaultTab();
  Cache.showLastAction();

  handleDropDownOptions();
  handleWorkOrderAction();
  handleFilters();

  Event.handleDeleteEventRecord();


});