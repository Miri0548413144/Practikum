import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, FormControl, IconButton, Input, InputLabel, Stack } from '@mui/material';
import { MenuItem, useSelect } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteIcon from '@mui/icons-material/Delete';
import { addWorker } from "../../service/workerServer";

const schema = yup
    .object({
        firstName: yup.string().required("שדה חובה"),
        lastName: yup.string().required("שדה חובה"),
        tz: yup.string().required("שדה חובה"),
        imageURL: yup.string().required("שדה חובה"),
        active: yup.boolean(),
        birthDate: yup.string().required("שדה חובה"),
    })
    .required("שדה חובה");

export default function AddWorker() {
    console.log("addWorker")
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        console.log(data);
        dispatch(addWorker)
    }
    return (
        <div className="add-worker-form">
            <p>Add Worker</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                    <InputLabel id="first-name-label">שם פרטי</InputLabel>
                    <Input {...register("firstName")} />
                    <p>{errors.firstName?.message}</p>
                </FormControl>
                <br />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                    <InputLabel id="last-name-label">שם משפחה</InputLabel>
                    <Input {...register("lastName")} />
                    <p>{errors.lastName?.message}</p>
                </FormControl>
                <br />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                    <InputLabel id="tz-label">תעודת זהות</InputLabel>
                    <Input {...register("tz")} />
                    <p>{errors.tz?.message}</p>
                </FormControl>
                <br />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                    <InputLabel id="image-url-label">כתובת תמונה</InputLabel>
                    <Input {...register("imageURL")} />
                    <p>{errors.imageURL?.message}</p>
                </FormControl>
                <br />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                    <InputLabel id="active-label">פעיל</InputLabel>
                    <Select {...register("active")} labelId="active-label">
                        <MenuItem value={true}>כן</MenuItem>
                        <MenuItem value={false}>לא</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                    <InputLabel id="birth-date-label">תאריך לידה</InputLabel>
                    <Input type="date" {...register("birthDate")} />
                    <p>{errors.birthDate?.message}</p>
                </FormControl>
                <br />
                <Button type="submit" variant="contained">הוסף עובד</Button>
            </form>
        </div>
    );
}
