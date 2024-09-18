import { suiteletUrl } from './dataSet';

export class Event {

  static createEventRecord(payload, modalId) {
    console.log('***** createEventRecord() -> PAYLOAD *****', payload);

    Swal.fire({
      title: 'Create Event Record?',
      text: payload.woRef?.name ? `Create Event for Work Order : ${payload.woRef.name}` : 'Create Event',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#817c7c',
      confirmButtonText: 'Yes'
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          didOpen: () => {
            Swal.showLoading();
            fetch(
              `${suiteletUrl}&mode=createEventRecord`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                  'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(result => {
               if (result.code == 200) {
                Swal.fire({
                  title: 'Success!',
                  text: `New Event Record ID ${result.recordId} has been created`,
                  icon: 'success'
                })
                .then(() => {
                  $(`#${modalId}`).modal('hide');
                  window.location.reload();
                });
              } else {
                Swal.fire({
                  title: 'Unexpected Error',
                  text: `Error: ${result.errorMsg}`,
                  icon: 'error'
                });
              }
              Swal.hideLoading();
            })
            .catch(error => {
              Swal.fire(
                'Unexpected Error',
                error.message,
                'error'
              );
              Swal.hideLoading();
            });
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          text: 'Creating Event Record...'
        });
      }
    });
  }

  static updateEventRecord(payload) {
    console.log('***** updateEventRecord() -> PAYLOAD *****', payload);

    Swal.fire({
      title: `Update Event Record?`,
      text: `Event Record ID ${payload.eventData.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#817c7c',
      confirmButtonText: 'Yes'
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          didOpen: () => {
            Swal.showLoading();
            fetch(
              `${suiteletUrl}&mode=updateEventRecord`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                  'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(result => {
              if (result.code == 200) {
                Swal.fire({
                  title: 'Success!',
                  text: `Event Record ID ${payload.eventData.id} has been updated`,
                  icon: 'success'
                })
                .then(() => {
                  $(`#eventModal`).modal('hide');
                  window.location.reload();
                });
              } else {
                Swal.fire({
                  title: 'Unexpected Error',
                  text: `Error: ${result.errorMsg}`,
                  icon: 'error'
                });
              }
              Swal.hideLoading();
            })
            .catch(error => {
              Swal.fire(
                'Unexpected Error',
                error.message,
                'error'
              );
              Swal.hideLoading();
            });
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          text: `Updating Event Record ID ${payload.eventData.id}...`
        });
      }
    });
  }

  static deleteEventRecord(ev) {
    const eventId = ev.target.closest('.card-item').getAttribute('id');
    console.log('deleteEventRecord() > Event ID', eventId);

    Swal.fire({
      title: `Delete Event Record ID ${eventId}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#817c7c',
      confirmButtonText: 'Yes'
    })
    .then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          didOpen: () => {
            Swal.showLoading();
            fetch(`${suiteletUrl}&mode=deleteEventRecord&id=${eventId}`, { 
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            })
            .then(response => response.json())
            .then(result => {
              Swal.fire({
                title: 'Deleted!',
                text: `Event Record ID ${eventId} has been deleted`,
                icon: 'success'
              })
              .then(() => {
                window.location.reload();
              });
              Swal.hideLoading();
            })
            .catch(error => {
              Swal.fire(
                'Unexpected Error',
                error.message,
                'error'
              );
              Swal.hideLoading();
            });
          },
          allowOutsideClick: false,
          allowEscapeKey: true,
          text: `Deleting Event Record ID ${eventId}...`
        });
      }
    });
  }
}

export class DropDownAction {
  
  static holdWorkOrder(ev) {
    ev.preventDefault();
    const woId = ev.target.closest('.card-item').id;

    Swal.fire({
      didOpen: () => {
        Swal.showLoading();
        fetch(`${suiteletUrl}&mode=holdWorkOrder&woId=${woId}`, { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
        .then(result => {
          Swal.fire({
            title: 'Success!',
            text: `Work Order Status has been set to Hold`,
            icon: 'success'
          });
          Swal.hideLoading();
          window.location.reload();
        })
        .catch(error => {
          Swal.fire(
            'Unexpected Error',
            error.message,
            'error'
          );
          Swal.hideLoading();
        });
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      text: 'Updating Work Order Status to Hold'
    });
  }
  
  static cancelWorkOrder(ev) {
    ev.preventDefault();
    const woId = ev.target.closest('.card-item').id;
    
    Swal.fire({
      didOpen: () => {
        Swal.showLoading();
        fetch(`${suiteletUrl}&mode=cancelWorkOrder&woId=${woId}`, { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
        .then(result => {
          Swal.fire({
            title: 'Success!',
            text: `Work Order Status has been set to Closed`,
            icon: 'success'
          });
          Swal.hideLoading();
          window.location.reload();
        })
        .catch(error => {
          Swal.fire(
            'Unexpected Error',
            error.message,
            'error'
          );
          Swal.hideLoading();
        });
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      text: 'Updating Work Order Status to Closed'
    });
  }
  
  static printWorkOrder(ev) {
    ev.preventDefault();
    const woId = ev.target.closest('.card-item').id;
    window.open(`${suiteletUrl}&mode=printWorkOrder&woId=${woId}`);
  }
  
  static printPickList(ev) {
    ev.preventDefault();
    const woId = ev.target.closest('.card-item').id;
    window.open(`${suiteletUrl}&mode=printPickList&woId=${woId}`);
  }
}