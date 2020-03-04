import axios from "axios"

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios
    .create({
        baseURL: "https://dev-deskqueue2.herokuapp.com/",
        headers: {
            authorization : token
        }
    })
}