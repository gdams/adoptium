import * as React from "react"

import './VendorSelector.scss';

const VendorSelector = ({
    checkboxRef,
    setCheckbox
}) => {
    const handleChange = () => {
        setCheckbox(checkboxRef.current.checked)
    };

    return (
        <ul className="vendor-list pt-5">
            <li className="vendor-li">
                <input id="vendorAdoptium" ref={el => checkboxRef.current['vendorAdoptium'] = el} type="checkbox" defaultChecked={true} onChange={handleChange} />
                <label className="vendor-label" htmlFor="vendorAdoptium" title="Adoptium"><img src="/images/vendors/vendor-adoptium.png"/></label>
            </li>
            <li className="vendor-li">
                <input id="vendorMicrosoft" ref={el => checkboxRef.current['vendorMicrosoft'] = el} type="checkbox" defaultChecked={true} onChange={handleChange} />
                <label className="vendor-label" htmlFor="vendorMicrosoft" title="Microsoft"><img src="/images/vendors/vendor-microsoft.png"/></label>
            </li>
            <li className="vendor-li">
                <input id="vendorAzul" ref={el => checkboxRef.current['vendorAzul'] = el} type="checkbox" defaultChecked={true} onChange={handleChange} />
                <label className="vendor-label" htmlFor="vendorAzul" title="Azul"><img src="/images/vendors/vendor-azul.png"/></label>
            </li>
            <li className="vendor-li">
                <input id="vendorIBM" ref={el => checkboxRef.current['vendorIBM'] = el} type="checkbox" defaultChecked={true} onChange={handleChange} />
                <label className="vendor-label" htmlFor="vendorIBM" title="IBM"><img src="/images/vendors/vendor-ibm.png"/></label>
            </li>
        </ul>
    );
};

export default VendorSelector;
