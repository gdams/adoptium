import React, { useState, useEffect } from "react"
import { shuffle } from '../../util/shuffle'
import vendors from '../../json/marketplace.json';
import './VendorSelector.scss';

const VendorSelector = ({selectedVendors, setSelectedVendors}) => {

    const [randomizedVendors, setRandomizedVendors] = useState<VendorProps[]>([]);

    useEffect(() => {
        let vendorsCpy = [...vendors];
        setRandomizedVendors(shuffle(vendorsCpy));
        setSelectedVendors(vendorsCpy.map(vendor => vendor.identifier))
    }, [])

    const handleChange = (e, identifier) => {
        e.preventDefault();
        let newselectedVendors = [...selectedVendors];
        let idx = newselectedVendors.indexOf(identifier);
        if(idx >= 0) newselectedVendors.splice(idx, 1);
        else newselectedVendors.push(identifier);
        setSelectedVendors(newselectedVendors)
    };

    return (
        <ul className="vendor-list pt-5">
            {randomizedVendors.map(
                (vendor, i): string | JSX.Element =>
                    vendor && (
                        <li key={`vendor-${i}`} data-testid={`li-${vendor.identifier}`} className="vendor-li" onClick={(e) => handleChange(e, vendor.identifier)}>
                            <input id={`vendor-${vendor.identifier}`} data-testid={`checkbox-${vendor.identifier}`} readOnly className="vendor-name" type="checkbox" checked={selectedVendors.indexOf(vendor.identifier) >= 0}/>
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
