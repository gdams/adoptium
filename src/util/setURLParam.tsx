export function setURLParam (param: any, value: any) {
    let currentURLWithParams = window.location.href;

    let params = {};

    // parse existing query parameters (if any)
    if(currentURLWithParams.indexOf('?') > 0) {
        currentURLWithParams.substring(currentURLWithParams.indexOf('?')+1)
            .split('&')
            .forEach(item => {
                params[item.split('=')[0]]=item.split('=')[1];
            });
    }
    if(param) {
        // set the new value for the given param or unset if no value provided
        if(value === undefined) delete params[param];
        else params[param]=value;
    }

    // rebuild and set the location
    var queryString = Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    }).join('&');

    let currentURL = window.location.protocol + "//" + window.location.host + window.location.pathname + `?${queryString}`;
    window.history.replaceState({ path: currentURL }, '', currentURL);
}
