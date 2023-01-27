//TODO: Point to the live API endpoint when it is available
const baseUrl = 'http://staging-api.adoptium.net/v3/info/release_notes';

export async function fetchReleaseNotesForVersion(
    version: any,
): Promise<ReleaseNote | null> {
    const url = `${baseUrl}/${version}`;
    try {
        // fetch the data from the API
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return null;
    }
}

export interface ReleaseNote {
    id: string;
    link: string;
    title: string;
    backportOf?: string;
    priority?: string;
    component?: string;
    subcomponent?: string;
    type?: string;
}
