import getToken from "./getToken";

const fetchRequest = async (url,method,data) => {

    if(!url || !method ){
        return "url and method are required to send request";
    }

    if(method === "GET"){
      const res = await fetch(url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        }
      });

      const resData = await res.json();

      return resData;
    }

    
    const res = await fetch(url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(data)
      });

    const resData = await res.json();

    return resData;
}


export default fetchRequest;