import {map_data_to_schema, map_schema_to_data} from "./mapping";

const DOMAIN                = 'https://boyscaverna.mooo.com/'
const URI_LOGIN             = DOMAIN + 'login'
const SET_USER_DATA         = DOMAIN + 'set_user_data'
const READ_USER_DATA        = DOMAIN + 'get_user_data'


export const setUserData = (data) => {
    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify({
            "user_id": "1", //localStorage.getItem('user_id'), 
            "user_data": map_data_to_schema(data)
        })
    }
    console.log(SET_USER_DATA, request);
    return fetch(SET_USER_DATA, request)
}

export const getUserData = () => {
    let url = `${READ_USER_DATA}/1`
    console.log(url);
    return fetch(url)
            .then(response => response.json())
            .then(data => map_schema_to_data(data))
}