import axios from "axios"

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios
    .create({
        ///https://dev2desk.herokuapp.com/
        baseURL: "https://devdeskqueue-2.herokuapp.com/",
        headers: {
            authorization : token
        }
    })
}