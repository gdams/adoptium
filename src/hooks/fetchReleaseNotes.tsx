import { VersionMetaData } from '.';

const baseUrl = 'https://api.adoptium.net/v3/info/release_notes';

export async function fetchReleaseNotesForVersion(
    version: any,
): Promise<ReleaseNoteAPIResponse | null> {
    const url = `${baseUrl}/${version}`;
    try {
        // fetch the data from the API
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return null;
    }
}

export interface ReleaseNoteAPIResponse {
    id: string;
    release_name: string;
    release_notes: ReleaseNote[];
    vendor: string;
    version_data: VersionMetaData;
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
