import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addWorker, editWorker } from '../../service/workerServer';
import { FormControl, Input, InputLabel, Radio, RadioGroup, Button, IconButton, Stack, FormControlLabel } from '@mui/material';
import { DeleteForever } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const schema = yup.object().shape({
    firstName: yup.string().required('שדה חובה'),
    lastName: yup.string().required('שדה חובה'),
    tz: yup.string().required('שדה חובה'),
    startDate: yup.string().required('שדה חובה'),
    birthDate: yup.string().required('שדה חובה'),
    active: yup.boolean(),
    imageURL: yup.string().required('שדה חובה'),
    roles: yup.array().of(
        yup.object().shape({
            isManagement: yup.boolean(),
            enteringDate: yup.string(),
            roleId: yup.number(),
        })
    ),
});

export default function AddWorker() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, control,setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: state
    });
    useEffect(()=>{
        if(state){
            Object.keys(state).forEach(key=>{
                if(key==="startDate"||key==="birthDate"){
                    setValue(key, moment(state[key]).format('YYYY-MM-DD'));
                }
                else if (key==="roles"){
                    state.roles.forEach((role,index)=>{
                        setValue(`roles[${index}].enteringDate`,moment(role.enteringDate).format('YYYY-MM-DD'))
                    })
                }
                else{setValue(key,state[key]);
                }
            });
        }
    },[state,setValue])

    const onSubmit = (data) => {
        if (state) {
            dispatch(editWorker({ ...data }, navigate))
        }
        else {
            dispatch(addWorker({ ...data}, navigate))
        }
    };

    const { fields: fieldsRoles, append: appendRoles, remove: removeRoles } = useFieldArray({ control, name: 'roles' });

    return (
        <div className="add-worker-form">
            <p>Add Worker</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="first-name">שם פרטי</InputLabel>
                        <Input id="first-name" {...register('firstName')} />
                        <p>{errors.firstName?.message}</p>
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="last-name">שם משפחה</InputLabel>
                        <Input id="last-name" {...register('lastName')} />
                        <p>{errors.lastName?.message}</p>
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="tz">תעודת זהות</InputLabel>
                        <Input id="tz" {...register('tz')} />
                        <p>{errors.tz?.message}</p>
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="start-date">תאריך התחלה</InputLabel>
                        <Input id="start-date" type="date" {...register('startDate')} />
                        <p>{errors.startDate?.message}</p>
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="birth-date">תאריך לידה</InputLabel>
                        <Input id="birth-date" type="date" {...register('birthDate')} />
                        <p>{errors.birthDate?.message}</p>
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="image-url">כתובת תמונה</InputLabel>
                        <Input id="image-url" {...register('imageURL')} />
                        <p>{errors.imageURL?.message}</p>
                    </FormControl>
                    <FormControl component="fieldset" variant="standard">
                        <RadioGroup row aria-label="active" {...register('active')}>
                            <FormControlLabel value="true" control={<Radio />} label="כן" />
                            <FormControlLabel value="false" control={<Radio />} label="לא" />
                        </RadioGroup>
                    </FormControl>
                    {fieldsRoles?.map((role, index) => (
                        <div key={index}>
                            <FormControl variant="standard">
                                <InputLabel htmlFor={`is-management-${index}`}>האם העובד מנהל</InputLabel>
                                <RadioGroup row aria-label={`is-management-${index}`} {...register(`roles.${index}.isManagement`)}>
                                    <FormControlLabel value="true" control={<Radio />} label="כן" />
                                    <FormControlLabel value="false" control={<Radio />} label="לא" />
                                </RadioGroup>
                                <p>{errors.roles?.[index]?.enteringDate?.message}</p>
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor={`entering-date-${index}`}>תאריך הכניסה לתפקיד</InputLabel>
                                <Input id={`entering-date-${index}`} type="date" {...register(`roles.${index}.enteringDate`)} />
                                <p>{errors.roles?.[index]?.enteringDate?.message}</p>
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor={`role-id-${index}`}>Role ID</InputLabel>
                                <Input id={`role-id-${index}`} {...register(`roles.${index}.roleId`)} />
                                <p>{errors.roles?.[index]?.roleId?.message}</p>
                            </FormControl>
                            <IconButton onClick={() => removeRoles(index)}>
                                <DeleteForever />
                            </IconButton>
                        </div>
                    ))}
                </Stack>
                <Button variant="contained" onClick={() => appendRoles({})}>הוסף תפקיד</Button>
                <br />
                <Button type="submit" variant="contained">הוסף עובד</Button>
            </form>
        </div>
    );
}
