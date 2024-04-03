import axios from "axios";
import * as Actions from '../store/action'
import Swal from "sweetalert2";
export function getRoles() {
    return dispatch => {
        console.log("before")
        axios.get("https://localhost:7059/api/Role")
            .then(x => {
                dispatch({ type: Actions., payload: x.data })
                console.log("middle", x.data)
            })
            .catch(err => console.log(err))
    }
}
export function addWorker(data, navigate) {
    return dispatch => {
        axios.post("https://localhost:7059/api/Workers", data)
            .then(x => {
                dispatch({ type: Actions.ADD_WORKERS, payload: x.data })
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