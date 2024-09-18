import Board from './src/board';
import Calendar from './src/calendar';
import { DropDownAction as DropDown } from './src/components/utils';

document.addEventListener('DOMContentLoaded', () => {
  Board.setup();
  Calendar.setup();

  Board.initLayoutHandlers();
  Board.showBanners();
  
  // Set dropdown actions globally
  // -----------------------------------------------------------------
  window.holdWorkOrder = DropDown.holdWorkOrder;
  window.printWorkOrder = DropDown.printWorkOrder;
  window.cancelWorkOrder = DropDown.cancelWorkOrder;
  window.printPickList = DropDown.printPickList;
  window.deleteEventRecord = DropDown.deleteEventRecord;
});

