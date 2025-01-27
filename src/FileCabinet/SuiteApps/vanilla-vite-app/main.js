import Board from './src/board';
import Calendar from './src/calendar';
import { cacheTabSwitch, Event, WorkOrderAction } from './src/components/utils';

$(document).ready(() => {

  Board.setup();
  Calendar.setup();

  cacheTabSwitch();

  // Set below actions globally
  // -----------------------------------------------------------------
  window.toggleDropdown = WorkOrderAction.toggleDropdown;
  window.holdWorkOrder = WorkOrderAction.holdWorkOrder;
  window.printWorkOrder = WorkOrderAction.printWorkOrder;
  window.cancelWorkOrder = WorkOrderAction.cancelWorkOrder;
  window.printPickList = WorkOrderAction.printPickList;
  window.deleteEventRecord = Event.deleteEventRecord;
});