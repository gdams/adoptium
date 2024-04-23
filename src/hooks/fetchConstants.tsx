import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'https://api.adoptium.net/v3';

export function fetchOses(isVisible: boolean): OperatingSystem[] {

    const [oses, setOses] = useState<OperatingSystem[]>([]);

    useEffect(() => {
        if (isVisible) {
        (async () => {
            const url = `${baseUrl}/info/available/operating_systems`;

            axios.get(url)
                .then(function (response) {
                    const newOses = response.data.map(s => {
                        const o: OperatingSystem = { name: s }
                        return o
                    })

                    setOses(newOses);
                })
                .catch(function (error) {
                    setOses([]);
                });
        })();
        }
    }, [isVisible]);

    return oses;
}

export function fetchArches(isVisible: boolean): Architecture[] {

    const [arches, setArches] = useState<Architecture[]>([]);

    useEffect(() => {
        if (isVisible) {
        (async () => {
            const url = `${baseUrl}/info/available/architectures`;

            axios.get(url)
                .then(function (response) {
                    const newArches = response.data.map(s => {
                        const a: Architecture = { name: s }
                        if(a.name === 'x32') a.name = 'x86'
                        return a;
                    })

                    setArches(newArches);
                })
                .catch(function (error) {
                    setArches([]);
                });
        })();
        }
    }, [isVisible]);

    return arches;
}

export interface OperatingSystem {
    name: string;
}

export interface Architecture {
    name: string;
}
