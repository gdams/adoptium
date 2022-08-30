import { fetchExtension } from "../fetchExtension";

describe("fetchExtension", () => {
    it("should convert file.tar.gz to tar.gz", () => {
        expect(fetchExtension("file.tar.gz")).toBe("tar.gz");
    });

    it("should convert file.zip to .zip", () => {
        expect(fetchExtension("file.zip")).toBe(".zip");
    });
});
