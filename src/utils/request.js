// import "whatwg-fetch";
import service from "./service";
import {localSave, storage} from "./storage";

function parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function errorResponse(error) {
    const response = {
        status: 1006,
        errorMsg: error,
    };
    return response;
}
function sendRequest(intactUrl, option) {
    console.log(intactUrl);
    console.log(option);
    return fetch(intactUrl, option)
        .then(checkStatus)
        .then(parseJSON)
        .catch(errorResponse);
}
export default function request(options) {
    const intactUrl = service.ENVOption[service.ENV] + options.url;
    const option = {
        ...options.body,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            origin: window.location.host,
            Authorization: "",
        }
    };
    return storage.load({key: "Authorization"}).then((ret) => {
        if (ret) {
            option.headers.Authorization = "Bearer " + ret;
        }
        return sendRequest(intactUrl,option);
    }).catch(err => {
        return sendRequest(intactUrl,option);
    });
}

