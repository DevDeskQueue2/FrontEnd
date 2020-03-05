import axios from "axios"

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios
    .create({
        baseURL: "https://dev2desk.herokuapp.com/",
        headers: {
            authorization : token
        }
    })
}