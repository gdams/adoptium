export function setURLParam (param: any, value: any) {
    let currentURL = window.location.protocol + "//" + window.location.host + window.location.pathname + `?${param}=${value}`;    
    window.history.replaceState({ path: currentURL }, '', currentURL);
}
