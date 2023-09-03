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
            let result = await fetchReleaseNote(version);
            if(result && Array.isArray(result.release_notes)) {
                // issues/1508: Should initially be by (a) priority then (b) component.
                result.release_notes = result.release_notes.sort((v1: ReleaseNote, v2: ReleaseNote) => {
                    let c = 0;
                    if(v1.priority && v2.priority) {
                        c = v1.priority.localeCompare(v2.priority);
                    }
                    if(c === 0 && v1.component && v2.component) {
                        c = v1.component.localeCompare(v2.component);
                    }
                    return c;
                  });
            }
            setReleaseNotes(result);
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
