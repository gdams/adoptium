import { VersionMetaData } from '.';
import { useEffect, useState } from 'react';

const baseUrl = 'https://api.adoptium.net/v3/info/release_notes';

export function fetchReleaseNotesForVersion(
    isVisible: boolean,
    version: any,
): ReleaseNoteAPIResponse | null {
    if (!version) {
        return null
    }

    const [releaseNotes, setReleaseNotes] = useState<ReleaseNoteAPIResponse | null>(null);
    useEffect(() => {
        if (isVisible) {
        (async () => {
            setReleaseNotes(await fetchReleaseNote(version));
        })();
        }
    }, [isVisible]);

    return releaseNotes;
}

async function fetchReleaseNote(version) {
    const url = `${baseUrl}/${version}`;
    try {
        // fetch the data from the API
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return { release_notes: null };
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
    link: URL;
    title: string;
    backportOf?: string;
    priority?: string;
    component?: string;
    subcomponent?: string;
    type?: string;
}
