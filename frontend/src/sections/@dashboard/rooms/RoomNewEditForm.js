import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../../../middlewares/axios';

const ALLOWED_FIELDS = ['name', 'capacity', 'widtyh', 'height'];

export default function RoomNewEditForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const RoomSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name required'),
    capacity: Yup.number().min(0, 'Negative values not allowed!').required('Capacity required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      capacity: ''
    },
    validationSchema: RoomSchema,
    onSubmit: async ({ name, capacity }) => {
      // Trim and Capitalize name
      name = name
        .trim()
        .toLowerCase()
        .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

      const res = await instance({
        method: id ? 'PATCH' : 'POST',
        url: `/api/rooms/${id || ''}`,
        data: {
          name,
          capacity
        }
      });

      if (res.status > 299) enqueueSnackbar(res.data.message, { variant: 'error' });
      else {
        enqueueSnackbar(`Room ${id ? 'Edited' : 'Added'}!`, { variant: 'success' });
        navigate('/dashboard/rooms', { replace: true });
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  useEffect(() => {
    const fetchRoom = async (id) => {
      const { data } = await instance(`/api/rooms/${id}`);

      const room = data.data;

      ALLOWED_FIELDS.forEach((field) => {
        if (field in room) setFieldValue(field, room[field]);
      });
    };

    if (id) fetchRoom(id);
  }, [id, setFieldValue]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Card>
            <CardHeader title="Room Name" />
            <CardContent>
              <TextField
                fullWidth
                label="Room Name"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Capacity"
              subheader="The following field indicates the maximum number of people which are allowed to be at the same time in this room."
            />
            <CardContent>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  type="number"
                  fullWidth
                  label="Capacity"
                  {...getFieldProps('capacity')}
                  error={Boolean(touched.capacity && errors.capacity)}
                  helperText={touched.capacity && errors.capacity}
                />
              </Stack>
            </CardContent>
          </Card>

          <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting} style={{ maxWidth: 150 }}>
            Save
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
