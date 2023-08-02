import React, { useState } from 'react';

// create a modal popup for images to be viewed in full screen
const ImagePopup = (props) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
      <>
        <img
          {...props}
          className='img-fluid pb-3'
          style={{ cursor: 'pointer' }}
          onClick={handleShow}
          alt={props.alt}
        />
        <div
          className={`modal fade ${show ? 'show' : ''}`}
          tabIndex={-1}
          role='dialog'
          aria-labelledby='exampleModalCenterTitle'
          aria-hidden='true'
          style={{ display: show ? 'block' : 'none' }}
        >
          <div className='modal-dialog modal-dialog-centered' style={{ maxWidth: '90%' }} role='document'>
            <div className='modal-content'>
              <img
                {...props}
                style={{ cursor: 'pointer' }}
                onClick={handleClose}
                alt={props.alt}
              />
            </div>
          </div>
        </div>
      </>
    );
};

export default ImagePopup;