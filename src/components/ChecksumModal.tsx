import React, { useRef, useState } from "react";

const ChecksumModal = () => {

  const [checksum, setChecksum] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');
  };

  if (typeof window !== `undefined`) {
    window.addEventListener('show.bs.modal', (event: Event) => {
      let button = event.relatedTarget;
      let checksum = button.getAttribute('data-bs-checksum')
      setChecksum(checksum)
      setCopySuccess('Copy')
    });
  }

  return (
    <>
      <div className="modal fade" id="checksumModal" tabIndex={-1} aria-labelledby="checksumModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="checksumModalLabel">Checksum</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <input
                className="text-start"
                readOnly
                style={{width: "100%"}}
                ref={textAreaRef}
                value={checksum}
              />
              </div>
              <div className="modal-footer">
                <button 
                  type="button"
                  className="btn btn-primary"
                  onClick={copyToClipboard}
                >
                  {copySuccess}
                </button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default ChecksumModal;
