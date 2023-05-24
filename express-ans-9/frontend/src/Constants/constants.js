
const version = 'api/v1';

let root = "";

if(window.location.host.split(":")[0] === "localhost"){
    root = "http://localhost:4000";
}
else{
    root = window.location.origin;
}


export const domainName = `${root}/${version}`;
export const currency = "INR";