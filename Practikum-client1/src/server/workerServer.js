import axios from "axios";
import * as Actions from '../store/action'
import Swal from "sweetalert2";
export function getWorker() {
    return dispatch => {
        console.log("before")
        axios.get("https://localhost:7059/api/Workers")
            .then(x => {
                dispatch({ type: "GET_WORKERS", payload:x.data})
                console.log("middle",x.data)            })
            .catch(err => console.log(err))
    }
} 
export function addNewWorker(data,navigate) {
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
              
            // navigate('/recipes');
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
export function editWorker(data,navigate) {
    return dispatch => {
        axios.put(`https://localhost:7059/api/Workers/${data.Id}`, data)
            .then(x => {
                dispatch({ type: Actions.EDIT_WORKERS, payload: x.data })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Update detailes!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                // navigate('/recipes');

            })
            .catch(err => Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Update failed!",
                showConfirmButton: false,
                timer: 1500
              }))}
    }
export  function deleteWorker(data,navigate) {
    return dispatch => {
        axios.delete(`https://localhost:7059/api/Workers/${data.Id}`,data)
            .then(x => { 
                dispatch({ type: Actions.DELETE_WORKERS, payload: data })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Worker Delete!",
                    showConfirmButton: false,
                    timer: 1500
                    });
                    
                // navigate('/recipes')
            })
            .catch(err => Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Worker not delete",
                showConfirmButton: false,
                timer: 1500
                })
                )
    }
}