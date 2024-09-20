import Board from './src/board';
import Calendar from './src/calendar';
import { DropDownAction as DropDown, Event } from './src/components/utils';

document.addEventListener('DOMContentLoaded', () => {
  Board.setup();
  Board.showBanners();
  
  Calendar.setup();
  
  // Set below actions globally
  // -----------------------------------------------------------------
  window.holdWorkOrder = DropDown.holdWorkOrder;
  window.printWorkOrder = DropDown.printWorkOrder;
  window.cancelWorkOrder = DropDown.cancelWorkOrder;
  window.printPickList = DropDown.printPickList;
  window.deleteEventRecord = Event.deleteEventRecord;
});

