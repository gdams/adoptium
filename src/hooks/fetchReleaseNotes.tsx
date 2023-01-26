//TODO: Point to the live API endpoint when it is available
const baseUrl = 'http://staging-api.adoptium.net/v3/info/release_notes';

export async function fetchReleaseNotesForVersion(
    version: any,
): JSON | null {
    const url = `${baseUrl}/${version}`;
    try {
        // fetch the data from the API
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return null;
    }
}