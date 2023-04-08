import { decodeJwt } from "jose";

const SERVER_PREFIX = "http://localhost:8080/IS3106WeddingPlanner-war/webresources";
const LoginAPI = {
    
    loginAdmin(username, password) {
        const userInfo = {
        "username": username,
        "password": password,
        }
        return fetch(`${SERVER_PREFIX}/login/admin`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(userInfo),
        });
    },   
    
    loginWeddingOrganiser(username, password) {
        const userInfo = {
            "username": username,
            "password": password,
        }
        return fetch(`${SERVER_PREFIX}/login/wedding-organiser`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(userInfo),
        });
    },
    loginVendor(username, password) {
        const userInfo = {
            "username": username,
            "password": password,
        }
        return fetch(`${SERVER_PREFIX}/login/vendor`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(userInfo),
        });
    },
    
    // this function gets the response promise object returned by the login function,
    // then depending on the response (success, fail), sets and saves the token into localStorage
    // it needs the setToken function that the component will have
    
    // for now the final return result is a Promise that returns a string 'success' or 'fail'.
    
    
    loginSucceedOrNot(responsePromise, setTokenFunction) {
        return responsePromise.then((response) => {
            if (response.status == 200) {
                return response.text().then((encodedJWT) => {
                    localStorage.setItem("encodedJWT", encodedJWT);
                    return decodeJwt(encodedJWT)
                })
                .then((decodedJWT) => JSON.parse(decodedJWT.sub))
                .then((parsedTokenObject) => {
                    setTokenFunction(parsedTokenObject);
                    return parsedTokenObject;
                })
                .then((parsedTokenObject) => {
                    console.log("setting token: " + parsedTokenObject);
                    return 'success';
                });
                
                // the above is some multi-layered promise that still resolves to 'success'
                
            } else {

                // promise's reject case (i guess??)
                return 'fail';

            }
        })
    }
}

export default LoginAPI;
