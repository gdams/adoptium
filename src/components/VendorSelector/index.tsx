import React, { useState, useEffect } from "react"
import { shuffle } from '../../util/shuffle'
import vendors from '../../json/marketplace.json';
import './VendorSelector.scss';

const VendorSelector = ({selectedVendorIdentifiers, setSelectedVendorIdentifiers}) => {

    const [randomizedVendors, setRandomizedVendors] = useState<VendorProps[]>([]);

    useEffect(() => {
        let vendorsCpy = [...vendors];
        setRandomizedVendors(shuffle(vendorsCpy));
        setSelectedVendorIdentifiers(vendorsCpy.map(vendor => vendor.identifier))
    }, [])

    const handleChange = (e, identifier) => {
        e.preventDefault();
        let newselectedVendorIdentifiers = [...selectedVendorIdentifiers];
        let idx = newselectedVendorIdentifiers.indexOf(identifier);
        if(idx >= 0) newselectedVendorIdentifiers.splice(idx, 1);
        else newselectedVendorIdentifiers.push(identifier);
        setSelectedVendorIdentifiers(newselectedVendorIdentifiers)
    };

    return (
        <ul className="vendor-list pt-5">
            {randomizedVendors.map(
                (vendor, i): string | JSX.Element =>
                    vendor && (
                        <li key={`vendor-${i}`} data-testid={`li-${vendor.identifier}`} className="vendor-li" onClick={(e) => handleChange(e, vendor.identifier)}>
                            <input id={`vendor-${vendor.identifier}`} data-testid={`checkbox-${vendor.identifier}`} readOnly className="vendor-name" type="checkbox" checked={selectedVendorIdentifiers.indexOf(vendor.identifier) >= 0}/>
                            <label className="vendor-label" htmlFor={`vendor-${vendor.identifier}`} title={vendor.name}>
                                <img src={`/images/vendors/${vendor.icon}`} alt={`${vendor.name} icon`} style={ vendor.iconPadding ? { padding:vendor.iconPadding} : {}}/>
                            </label>
                        </li>
                )
            )}
        </ul>
    );
};

export interface VendorProps {
    name: string;
    identifier: string;
    icon: string;
    iconPadding: string;
    postDownload: string;
    selected: boolean
};

export default VendorSelector;
