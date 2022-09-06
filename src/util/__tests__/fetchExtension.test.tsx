import { fetchExtension } from "../fetchExtension";
import { describe, expect, it } from 'vitest'

describe("fetchExtension", () => {
    it("should convert file.tar.gz to tar.gz", () => {
        expect(fetchExtension("file.tar.gz")).toBe("tar.gz");
    });

    it("should convert file.tar.xz to tar.xz", () => {
        expect(fetchExtension("file.tar.xz")).toBe("tar.xz");
    });

    it("should convert file.zip to .zip", () => {
        expect(fetchExtension("file.zip")).toBe(".zip");
    });
});
