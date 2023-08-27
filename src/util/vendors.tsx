import VendorProps from '../components/VendorSelector'

export default function getVendorIdentifier (vendor: VendorProps) {
    return vendor.name.toLocaleLowerCase().replace(/\s+/g, '');
}