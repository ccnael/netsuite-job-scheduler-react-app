export class Board {

  static suiteletUrl = decodeURIComponent($('#suiteletUrl').val());
  static workOrders = JSON.parse(decodeURIComponent($('#workOrders').val()));
  static resources = JSON.parse(decodeURIComponent($('#resources').val()));
  static temp_woResourcesDataTable = null;
  static temp_woItemsDataTable = null;

  static showBanners() {
    setTimeout(() => {

      const toasties = [
        {
          text: 'TBD Resource Dragging..',
          duration: 99999,
          close: true,
          gravity: 'bottom',
          position: 'left',
          style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
          }
        },
        {
          text: 'TBD Resource Info, Schedules & Allocation View on click..',
          duration: 99999,
          close: true,
          gravity: 'bottom',
          position: 'left',
          style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
          }
        },
        {
          text: 'TBD Resource Info, Schedules & Allocation View on click..',
          duration: 99999,
          close: true,
          gravity: 'bottom',
          position: 'left',
          style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
          }
        },
        {
          text: 'Drag Available Jobs to Schedule Jobs Grid',
          duration: 99999,
          close: true,
          gravity: 'top',
          position: 'center',
          style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
          }
        }
      ];
      
      toasties.map(toast => Toastify(toast).showToast());
    }, 250);
  }
  
  static initLayoutHandlers() {
    const leftSidebar = document.getElementById('leftSidebar');
    
    // Resizable columns functionality
    const gridContainer = document.querySelector('.grid-container');
    const baseWidth = (gridContainer.getBoundingClientRect().width * .20);
    const resizer = document.getElementById('columnResizer');
    const secondColumn = document.getElementById('secondColumn');
    const thirdColumn = document.getElementById('thirdColumn');
    // Collapsible sidebar functionality
    const toggleLeft = document.getElementById('toggleLeft');
    const collapseLeft = document.getElementById('collapseLeft');
    
    collapseLeft.style.display = 'block';
    leftSidebar.style.width = '18%';
    
    toggleLeft.addEventListener('click', el => {
      if (collapseLeft.style.display === 'none' || collapseLeft.style.display === '') {
        collapseLeft.style.display = 'block';
        leftSidebar.style.width = '18%'; // Adjust width as needed
        toggleLeft.classList.remove('fa-square-caret-right');
        toggleLeft.classList.add('fa-square-caret-left');
      } else {
        collapseLeft.style.display = 'none';
        leftSidebar.style.width = '0'; // Adjust width as needed
        toggleLeft.classList.remove('fa-square-caret-left');
        toggleLeft.classList.add('fa-square-caret-right');
      }
      
      secondColumn.style.width = '';
      thirdColumn.style.width = '';
    });
    
    let startX, startWidthSecond, startWidthThird;
    
    resizer.addEventListener('mousedown', el => {
      startX = el.clientX;
      startWidthSecond = secondColumn.getBoundingClientRect().width;
      startWidthThird = thirdColumn.getBoundingClientRect().width;
    
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', handleMouseMove);
      });
    });
    
    function handleMouseMove(el) {
      const dx = el.clientX - startX;
      const newWidthSecond = startWidthSecond + dx;
      const newWidthThird = startWidthThird - dx;
      if (newWidthSecond > baseWidth && newWidthThird > baseWidth) { // Constraints
        secondColumn.style.width = `${newWidthSecond}px`;
        thirdColumn.style.width = `${newWidthThird}px`;
      }
    }
  
    // *************** COLLAPSIBLE ***************
    document.querySelectorAll('.collapsible').forEach(button => {
      const content = button.nextElementSibling;
      content.style.maxHeight = content.scrollHeight + 'px';
      button.addEventListener('click', () => {
        button.classList.toggle('active');
  
        if (+content.style.maxHeight.replace('px', '')) {
          content.style.maxHeight = 0;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });

    window.showMenuOptions = ev => {
      const el = ev.target.nextElementSibling.lastElementChild;
      el.classList.toggle('show');
    }
  
    window.onclick = el => {
      if (!el.target.classList || !el.target.classList.contains('expand')) {
        const dropdowns = document.querySelectorAll('div.menu-options');
        if (dropdowns && dropdowns.length) {
          dropdowns.forEach((dropdown) => {
            if (dropdown?.classList.contains('show')) {
              dropdown.classList.remove('show');
            }
          });
        }
      }
    }
  }

  static holdWorkOrder(ev) {
    ev.preventDefault();
  
    const woId = ev.target.closest('.card-item').getAttribute('woId');
    console.log('Work Order ID', woId);
  
    fetch(`${Board.suiteletUrl}&mode=holdWorkOrder&workOrderId=${woId}`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((result) => {
      Toastify({
        text: result.message,
        duration: 6000,
        close: true,
        gravity: 'top', // `top` or `bottom`
        position: 'left',
        // backgroundColor: "#ff0000"
        style: {
          background: result?.status == 'success' ? 'linear-gradient(to right, #00b09b, #96c93d)' : 'linear-gradient(to right, #552956, #8E1F06)',
        }
      }).showToast();
    });
  }
  
  static cancelWorkOrder(ev) {
    ev.preventDefault();
  
    const woId = ev.target.closest('.card-item').getAttribute('woId');
    console.log('Work Order ID', woId);
    
    fetch(`${Board.suiteletUrl}&mode=cancelWorkOrder&workOrderId=${woId}`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((result) => {
      Toastify({
        text: result.message,
        duration: 6000,
        close: true,
        gravity: 'top', // `top` or `bottom`
        position: 'left',
        // backgroundColor: "#ff0000"
        style: {
          background: result?.status == 'success' ? 'linear-gradient(to right, #00b09b, #96c93d)' : 'linear-gradient(to right, #552956, #8E1F06)',
        }
      }).showToast();
    });
  }
  
  static printWorkOrder(ev) {
    ev.preventDefault();
  
    const woId = ev.target.closest('.card-item').getAttribute('woId');
    console.log('Work Order ID', woId);
  
    window.open(`${Board.suiteletUrl}&mode=printWorkOrder&workOrderId=${woId}`);
  }
  
  static printPickList(ev) {
    ev.preventDefault();

    const woId = ev.target.closest('.card-item').getAttribute('woId');
    console.log('Work Order ID', woId);
    window.open(`${Board.suiteletUrl}&mode=printPickList&workOrderId=${woId}`);
  }
}

export class Calendar {
  
}

export class Event {

  static initFormHandlers() {
    // Turn off all day switch upon change
    $('#wo-primaryinfo #starttime').on('change', () => {
      $('#wo-primaryinfo #alldayevent-switch')[0].checked = false;
    });
    // Turn off all day switch upon change
    $('#wo-primaryinfo #endtime').on('change', () => {
      $('#wo-primaryinfo #alldayevent-switch')[0].checked = false;
    });
    // All day event switch function
    $('#wo-primaryinfo #alldayevent-switch').on('change', ev => {
      if (ev.target.checked) {
        $('#wo-primaryinfo #starttime').val('09:00');
        $('#wo-primaryinfo #endtime').val('17:00');
      }
    });

    window.markAll = ev => {
      const value = ev.target.checked;
      const el = ev.target.closest('.dataTable').querySelectorAll('.dt-line-select');
      for(let i = 0; i < el.length; i++) {  
        if(el[i].type == 'checkbox')  
          el[i].checked = value;//!el[i].checked;
      }
    }

    window.validateForm = () => true;
  }

  static clearFieldValues() {
    $('#wo-primaryinfo #datefrom').val('');
    $('#wo-primaryinfo #dateto').val('');
    $('#wo-primaryinfo #starttime').val('');
    $('#wo-primaryinfo #endtime').val('');
    $('#wo-primaryinfo #note').val('');
  
    document.getElementById('priority').value = '1'; // Default Low
    document.getElementById('status').value = 'TENTATIVE'; // Default Tentative
    $('#wo-primaryinfo #alldayevent-switch')[0].checked = false;
    
    // Clear WO Resources
    if (Board.temp_woResourcesDataTable) {
      $('table#woResources_dt tbody').children().remove();
      Board.temp_woResourcesDataTable = Board.temp_woResourcesDataTable.destroy();
    }
  
    // Clear WO Items
    if (Board.temp_woItemsDataTable) {
      $('table#woItems_dt tbody').children().remove();
      Board.temp_woItemsDataTable = Board.temp_woItemsDataTable.destroy();
    }
  
    $('table#contacts tbody').children().remove();
    $('table#addresses tbody').children().remove();
  }

  static createEventRecord(payload) {
    // fetch(
    //   `${globalVar.suiteletUrl}&mode=createEventRecord`, {
    //     method: 'POST',
    //     body: JSON.stringify(payload),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }
    // })
    // .then(response => response.json())
    // .then(response => {
    //   console.log('Response', typeof response, response);
    //   if (response.code == 200) {
    //     window.location.reload();
    //   } else {
    //     // TOAST ERROR (TBD)
    //   }
    //   // REMOVE LOADER (TBD)
    //   $('#eventModal').modal('hide');
    // });

    $('#eventModal').modal('hide');
  }
}
function formatDate(date) {
  return moment(date).format('YYYY-MM-DD')
}