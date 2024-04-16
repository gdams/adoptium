import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'https://staging-api.adoptium.net/v3';

export function fetchOses(isVisible: boolean): String[] {

    const [oses, setOses] = useState<String[]>([]);

    useEffect(() => {
        if (isVisible) {
        (async () => {
            const url = `${baseUrl}/info/available_operating-systems`;

            axios.get(url)
                .then(function (response) {
                    setOses(response.data);
                })
                .catch(function (error) {
                    setOses([]);
                });
        })();
        }
    }, [isVisible]);

    return oses;
}

export function fetchArches(isVisible: boolean): String[] {

    const [arches, setArches] = useState<String[]>([]);

    useEffect(() => {
        if (isVisible) {
        (async () => {
            const url = `${baseUrl}/info/available_architectures`;

            axios.get(url)
                .then(function (response) {
                    const results:String[] = response.data;
                    const idx = results.findIndex(it => it === 'x32');
                    if(idx >= 0) results.splice(idx, 1, 'x86');
                    setArches(results);
                })
                .catch(function (error) {
                    setArches([]);
                });
        })();
        }
    }, [isVisible]);

    return arches;
}
