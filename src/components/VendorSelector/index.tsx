import React, { useState, useEffect } from "react"
import { shuffle } from '../../util/shuffle'
import vendors from '../../json/marketplace.json';
import './VendorSelector.scss';

const emptyVendors: VendorProps[] = [];

const VendorSelector = ({checkboxRef, setCheckbox}) => {

    const [randomizedVendors, setRandomizedVendors] = useState(emptyVendors);

    useEffect(() => {
        let vendorsCpy = [...vendors];
        setRandomizedVendors(shuffle(vendorsCpy));
    }, [])

    const handleChange = () => {
        setCheckbox(checkboxRef.current.checked)
    };

    return (
        <ul className="vendor-list pt-5">
            {randomizedVendors.map(
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

interface VendorProps {
    name: string;
    icon: string;
    iconPadding: string;
    postDownload: string;
}

export default VendorSelector;
