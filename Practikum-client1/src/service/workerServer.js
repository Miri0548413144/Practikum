import axios from "axios";
import * as Actions from '../store/action'
import Swal from "sweetalert2";
export function getWorker() {
    return dispatch => {
        console.log("before")
        axios.get("https://localhost:7059/api/Workers")
            .then(x => {
                dispatch({ type: Actions.GET_WORKERS, payload: x.data })
                console.log("middle", x.data)
            })
            .catch(err => console.log(err))
    }
}
export function addWorker(data, navigate) {
    return dispatch => {
        axios.post("https://localhost:7059/api/Workers", data)
            .then(x => {
                dispatch({ type: Actions.ADD_WORKER, payload: x.data })
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
export function editWorker(data, navigate) {
    return dispatch => {
        console.log("bef", data)
        axios.put(`https://localhost:7059/api/Workers/${data.id}`, data)
            .then(x => {
                dispatch({ type: Actions.EDIT_WORKER, payload: x.data })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Update detailes!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/workersTable');
            })
            .catch(err => Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Update failed!",
                showConfirmButton: false,
                timer: 1500

            }))
    }
}
export function deleteWorker(id, navigate) {
    return dispatch => {
        axios.delete(`https://localhost:7059/api/Workers/${id}`)
            .then(x => {
                dispatch({ type: Actions.DELETE_WORKER, payload: id})
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Worker Delete!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/workersTable')
            })
            .catch(err => {console.log("err",err)
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Worker not delete",
                showConfirmButton: false,
                timer: 1500
            })}
            )
    }
}
// export function deleteWorker(id, navig) {
//     return dispatch => {
//         axios.delete(`https://localhost:7059/api/Workers/${id}`)
//         .then(x => {
//           console.log("delete xxx")
//           dispatch({ type: Actions.DELETE_WORKER, payload: id })
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: " העובד נמחק בהצלחה",
//             showConfirmButton: false,
//             timer: 1500
//           });
//           navigate('/workersTable')
//         })
//         .catch(err => {
//           console.log(err)
//           Swal.fire({
//             position: "top-end",
//             icon: "error",
//             title: "קרתה תקלה במחיקת העובד נסה שנית",
//             showConfirmButton: false,
//             timer: 1500
//           });
//         })
//     }
// }