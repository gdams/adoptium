import getVendorIdentifier from "../vendors"
import vendors from '../../json/marketplace.json';

describe("vendors", () => {
    it("should be lowercase", () => {
        const adoptium = vendors.find(v => v.name === "Adoptium");
        expect(getVendorIdentifier(adoptium)).toBe("adoptium");

        const ibm = vendors.find(v => v.name === "IBM");
        expect(getVendorIdentifier(ibm)).toBe("ibm");
    });

    it("should be with no space", () => {
        const redhat = vendors.find(v => v.name === "Red Hat");
        expect(getVendorIdentifier(redhat)).toBe("redhat");
    });
});
