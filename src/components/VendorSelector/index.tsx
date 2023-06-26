import * as React from "react"

import vendors from '../../json/marketplace.json';
import './VendorSelector.scss';

// Function to shuffle array elements randomly
const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const VendorSelector = ({
    checkboxRef,
    setCheckbox
}) => {
    const handleChange = () => {
        setCheckbox(checkboxRef.current.checked)
    };

    // Randomize the order of vendors
    const shuffledVendors = shuffleArray(vendors);

    return (
        <ul className="vendor-list pt-5">
            {shuffledVendors.map(
                (vendor, i): string | JSX.Element =>
                    vendor && (
                        <li key={vendor.name} className="vendor-li">
                            <input data-testid={vendor.name} id={`vendor${vendor.name}`} ref={el => checkboxRef.current[`vendor${vendor.name.replace(/\s+/g, '')}`] = el} type="checkbox" defaultChecked={true} onChange={handleChange} />
                            <label className="vendor-label" htmlFor={`vendor${vendor.name}`} title={vendor.name}>
                                <img src={`/images/vendors/${vendor.icon}`} alt={`${vendor.name} icon`} style={ vendor.iconPadding ? { padding:vendor.iconPadding} : {}}/>
                            </label>
                        </li>
                )
            )}
        </ul>
    );
};

export default VendorSelector;
