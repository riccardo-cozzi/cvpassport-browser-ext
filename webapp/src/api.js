import {map_data_to_schema, map_schema_to_data} from "./mapping";

const DOMAIN                = 'https://boyscaverna.mooo.com/'
const URI_LOGIN             = DOMAIN + 'login'
const SET_USER_DATA         = DOMAIN + 'set_user_data'
const READ_USER_DATA        = DOMAIN + 'get_user_data'


export const apiSetUserData = (data) => {

    // get user id from local storage
    let user_id = localStorage.getItem('user_id')

    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify({
            "user_id": localStorage.getItem('user_id'), 
            "user_data": map_data_to_schema(data)
        })
    }
    console.log(SET_USER_DATA, request);
    return fetch(SET_USER_DATA, request)
}

export const apiGetUserData = (user_id) => {
    let url = `${READ_USER_DATA}/${user_id}`
    console.log(url);
    return fetch(url)
            .then(response => response.json())
            .then(data => map_schema_to_data(data))
}