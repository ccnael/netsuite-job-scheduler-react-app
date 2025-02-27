import Board from './src/board';
import Calendar from './src/calendar';
import { selectDefaultTab, Event, handleWorkOrderAction } from './src/components/utils';
import { handleFilters } from './src/components/filterFields/filterUtils';

$(document).ready(() => {
  Board.setup();
  Calendar.setup();

  selectDefaultTab();
  handleWorkOrderAction();
  handleFilters();

  Event.handleDeleteEventRecord();
});