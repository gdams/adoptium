import { localeDate } from "../localeDate";

describe("localeDate", () => {
    let sampleDate = new Date(Date.UTC(2020, 0, 1)).toString();
    it("should format date correctly", () => {
        expect(localeDate(sampleDate, "en")).toBe("January 1, 2020");
    });

    it("should format date correctly - en-GB", () => {
        expect(localeDate(sampleDate, "en-GB")).toBe("1 January 2020");
    });

    it("should format date correctly - de", () => {
        expect(localeDate(sampleDate, "de")).toBe("1. Januar 2020");
    });

    it("should format date correctly - es", () => {
        expect(localeDate(sampleDate, "es")).toBe("1 de enero de 2020");
    });

    it("should format date correctly - zh-CN", () => {
        expect(localeDate(sampleDate, "zh-CN")).toBe("2020年1月1日");
    });
});
