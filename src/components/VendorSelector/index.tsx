import React, { useState, useEffect } from "react"
import { shuffle } from '../../util/shuffle'
import vendors from '../../json/marketplace.json';
import './VendorSelector.scss';

const VendorSelector = ({selectedVendors, refreshSelectedVendors}) => {

    const [randomizedVendors, setRandomizedVendors] = useState<VendorProps[]>([]);

    useEffect(() => {
        let vendorsCpy = [...vendors];
        setRandomizedVendors(shuffle(vendorsCpy));
        refreshSelectedVendors(vendorsCpy.map(vendor => vendor.key))
    }, [])

    const handleChange = (e, key) => {
        e.preventDefault();
        let newselectedVendors = [...selectedVendors];
        let idx = newselectedVendors.indexOf(key);
        if(idx >= 0) newselectedVendors.splice(idx, 1);
        else newselectedVendors.push(key);
        refreshSelectedVendors(newselectedVendors)
    };

    return (
        <ul className="vendor-list pt-5">
            {randomizedVendors.map(
                (vendor, i): string | JSX.Element =>
                    vendor && (
                        <li key={`vendor-${i}`} data-testid={`li-${vendor.key}`} className="vendor-li" onClick={(e) => handleChange(e, vendor.key)}>
                            <input id={`vendor-${vendor.key}`} data-testid={`checkbox-${vendor.key}`} readOnly className="vendor-name" type="checkbox" checked={selectedVendors.indexOf(vendor.key) >= 0}/>
                            <label className="vendor-label" htmlFor={`vendor-${vendor.key}`} title={vendor.name}>
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
    key: string;
    icon: string;
    iconPadding: string;
    postDownload: string;
    selected: boolean
};

export default VendorSelector;
