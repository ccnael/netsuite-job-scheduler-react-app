import Board from './src/board';
import Calendar from './src/calendar';
import { WorkOrderAction, Event } from './src/components/utils';

document.addEventListener('DOMContentLoaded', () => {
  Board.setup();
  Board.showBanners();
  
  Calendar.setup();
  
  // Set below actions globally
  // -----------------------------------------------------------------
  window.holdWorkOrder = WorkOrderAction.holdWorkOrder;
  window.printWorkOrder = WorkOrderAction.printWorkOrder;
  window.cancelWorkOrder = WorkOrderAction.cancelWorkOrder;
  window.printPickList = WorkOrderAction.printPickList;
  window.deleteEventRecord = Event.deleteEventRecord;
});

