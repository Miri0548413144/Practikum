import axios from "axios";
import Swal from "sweetalert2";
import { ADD_ROLE, GET_ROLES } from "../store/action";
export function getRoles() {
    return dispatch => {
        console.log("beforep")
        axios.get("https://localhost:7059/api/Role")
            .then(x => {
                dispatch({ type: GET_ROLES, payload: x.data })
                console.log("middleR", x.data)
            })
            .catch(err => console.log(err))
    }
}
export function addRole(data, navigate) {
    return dispatch => {
        axios.post("https://localhost:7059/api/Workers", data)
            .then(x => {
                dispatch({ type: ADD_ROLE, payload: x.data })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "The worker added successfuli!😀",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate('/workersTable');
            })
            .catch(err =>
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "The added failed, please try againe",
                    showConfirmButton: false,
                    timer: 1500
                })
            )
    }
}