import { confirmAlert } from 'react-confirm-alert';

function useConfirmAlert() {


  return function (func){
    return confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
                func();
            }
          },
          {
            label: 'No',
            onClick: () => {}
          }
        ]
      });
  }
}

export default useConfirmAlert;