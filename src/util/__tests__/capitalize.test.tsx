import { capitalize } from "../capitalize";
import { describe, expect, it } from 'vitest'

describe("capitalize", () => {
    it("should capitalize the first letter of a string", () => {
        expect(capitalize("hello")).toBe("Hello");
    });

    it("should convert alpine-linux to Alpine Linux", () => {
        expect(capitalize("alpine-linux")).toBe("Alpine Linux");
    }),

    it ("should convert alpine_linux to Alpine Linux", () => {
        expect(capitalize("alpine_linux")).toBe("Alpine Linux");
    }),

    it ("should convert redhat to Red Hat", () => {
        expect(capitalize("redhat")).toBe("Red Hat");
    }),

    it("should convert ibm to IBM", () => {
        expect(capitalize("ibm")).toBe("IBM");
    }),

    it("should convert mac to macOS", () => {
        expect(capitalize("mac")).toBe("macOS");
    }),

    it("should convert bisheng to BiSheng", () => {
        expect(capitalize("bisheng")).toBe("BiSheng");
    }),

    it("should convert semeru to Semeru Runtimes", () => {
        expect(capitalize("semeru")).toBe("Semeru Runtimes");
    })
});
