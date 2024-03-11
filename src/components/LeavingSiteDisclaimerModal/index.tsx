import React, { useState } from "react";
import { Trans } from 'gatsby-plugin-react-i18next';

const LeavingSiteDisclaimerModal = () => {

  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');

  if (typeof window !== `undefined`) {
    window.addEventListener('show.bs.modal', (event: Event) => {
      let button = event.relatedTarget;
      setMessage(button.getAttribute('data-bs-message'))
      setLocation(button.getAttribute('data-bs-location'))
    });
  }

  return (
    <>
      <div className="modal fade" id="leavingSiteDisclaimerModal" tabIndex={-1} aria-labelledby="leavingSiteDisclaimerLabel" aria-hidden="true" style={{zIndex: '10000'}}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="leavingSiteDisclaimerLabel">
                <Trans i18nKey='leaving.site.disclaimer.modal.title' defaults='Disclaimer - You are going to leave our website' />
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-start">
              <p>
                {message}           
              </p>
            </div>
            <div className="modal-footer">
              <button 
                type="button"
                className="btn btn-primary"
                onClick={(event: React.MouseEvent<HTMLButtonElement>): void => {
                  event.preventDefault();
                  window.location.assign(location);
                }}
              >
                <Trans i18nKey='leaving.site.disclaimer.modal.continue' defaults='Continue' />
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                <Trans i18nKey='leaving.site.disclaimer.modal.close' defaults='Close' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeavingSiteDisclaimerModal;
