import { VersionMetaData } from '.';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'https://api.adoptium.net/v3/info/release_notes';

export function fetchReleaseNotesForVersion(
    isVisible: boolean,
    version: any,
    sortReleaseNotesByCallback?: Function,
): ReleaseNoteAPIResponse | null {
    if (!version) {
        return null
    }

    const [releaseNotes, setReleaseNotes] = useState<ReleaseNoteAPIResponse | null>(null);

    useEffect(() => {
        if (isVisible) {
        (async () => {
            const url = `${baseUrl}/${version}`;

            await axios.get(url.toString())
                .then(function (response) {
                    let result = response.data
                    if(sortReleaseNotesByCallback) sortReleaseNotesByCallback(result);
                    setReleaseNotes(result)
                })
                .catch(function (error) {
                    console.error(error);
                    setReleaseNotes(null)
                });
        })();
        }
    }, [isVisible, version]);

    return releaseNotes;
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
