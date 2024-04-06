import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addWorker, editWorker } from '../../service/workerServer';
import { FormControl, Input, InputLabel, Radio, RadioGroup, Button, IconButton, Stack, FormControlLabel, Select, MenuItem } from '@mui/material';
import { DeleteForever } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

// קביעת סכמת הטופס באמצעות Yup
const schema = yup.object().shape({
    firstName: yup.string().required('This field is required'),
    lastName: yup.string().required('This field is required'),
    tz: yup.string().required('This field is required'),
    startDate: yup.string().required('This field is required'),
    birthDate: yup.string().required('This field is required'),
    active: yup.boolean(),
    imageURL: yup.string().required('This field is required'),
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
    const roles = useSelector(state => state.roles);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: state
    });

    // עדכון ערכי הטופס על פי הנתונים שנשלחו כ state
    useEffect(() => {
        if (state) {
            Object.keys(state).forEach(key => {
                if (key === "startDate" || key === "birthDate") {
                    setValue(key, moment(state[key]).format('YYYY-MM-DD'));
                }
                else if (key === "roles") {
                    state.roles.forEach((role, index) => {
                        setValue(`roles[${index}].enteringDate`, moment(role.enteringDate).format('YYYY-MM-DD'))
                    })
                }
                else {
                    setValue(key, state[key]);
                }
            });
        }
    }, [state, setValue]);

    // פונקציה שמטפלת בשליחת הטופס
    const onSubmit = (data) => {
        if (state) {
            dispatch(editWorker({ ...data }, navigate))
        }
        else {
            dispatch(addWorker({ ...data }, navigate))
        }
    };

    // שימוש ב Hook של react-hook-form לניהול שדות מסוג array
    const { fields: fieldsRoles, append: appendRoles, remove: removeRoles } = useFieldArray({ control, name: 'roles' });

    return (
        <div className="add-worker-form">
            <p>Add Worker</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    {/* קומפוננטות ה-FormControl לשדות הטופס */}
                    <FormControl variant="standard">
                        <InputLabel htmlFor="first-name">First Name</InputLabel>
                        <Input id="first-name" {...register('firstName')} />
                        <p>{errors.firstName?.message}</p>
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="last-name">Last Name</InputLabel>
                        <Input id="last-name" {...register('lastName')} />
                        <p>{errors.lastName?.message}</p>
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="tz">ID</InputLabel>
                        <Input id="tz" {...register('tz')} />
                        <p>{errors.tz?.message}</p>
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="start-date">Start Date</InputLabel>
                        <Input id="start-date" type="date" {...register('startDate')} />
                        <p>{errors.startDate?.message}</p>
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="birth-date">Birth Date</InputLabel>
                        <Input id="birth-date" type="date" {...register('birthDate')} />
                        <p>{errors.birthDate?.message}</p>
                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="image-url">Image URL</InputLabel>
                        <Input id="image-url" {...register('imageURL')} />
                        <p>{errors.imageURL?.message}</p>
                    </FormControl>
                    <FormControl component="fieldset" variant="standard">
                        <RadioGroup row aria-label="active" {...register('active')}>
                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                    {/* הוספת קומפוננטת ה-Roles עבור ניהול רשימת התפקידים */}
                    {fieldsRoles?.map((role, index) => (
                        <div key={index}>
                            <FormControl variant="standard">
                                <InputLabel htmlFor={`is-management-${index}`}>Is Manager</InputLabel>
                                <RadioGroup row aria-label={`is-management-${index}`} {...register(`roles.${index}.isManagement`)}>
                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                </RadioGroup>
                                <p>{errors.roles?.[index]?.enteringDate?.message}</p>
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel htmlFor={`entering-date-${index}`}>Entering Date</InputLabel>
                                <Input id={`entering-date-${index}`} type="date" {...register(`roles.${index}.enteringDate`)} />
                                <p>{errors.roles?.[index]?.enteringDate?.message}</p>
                            </FormControl>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 185 }}>
                                <InputLabel htmlFor={`role-id-${index}`}>Role</InputLabel>
                                <Select
                                    {...register(`roles.${index}.roleId`, { required: true })}
                                    id={`role-id-${index}`}
                                    label="Role"
                                >
                                    <MenuItem value="">Select Role</MenuItem>
                                    {roles?.map((role) => (
                                        <MenuItem key={role.id} value={role.roleId}>
                                            {role?.name}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </FormControl>
                            {/* כפתור למחיקת התפקיד */}
                            <IconButton onClick={() => removeRoles(index)}>
                                <DeleteForever />
                            </IconButton>
                        </div>
                    ))}
                </Stack>
                {/* כפתור להוספת תפקיד */}
                <Button variant="contained" onClick={() => appendRoles({})}>Add Role</Button>
                <br />
                {/* כפתור לשליחת הטופס */}
                <Button type="submit" variant="contained">Add Worker</Button>
            </form>
        </div>
    );
}
