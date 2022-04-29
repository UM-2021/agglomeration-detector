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
    capacity: Yup.number().min(0, 'Negative values not allowed!').required('Capacity required'),
    width: Yup.number().min(0, 'Negative values not allowed!').required('Width required'),
    length: Yup.number().min(0, 'Negative values not allowed!').required('Length required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      capacity: '',
      width: '',
      length: ''
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
              title="Dimensions"
              subheader="The width and length of the room will be used to calculate the air quality."
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

                <TextField
                  fullWidth
                  type="number"
                  label="Width"
                  {...getFieldProps('width')}
                  error={Boolean(touched.width && errors.width)}
                  helperText={touched.width && errors.width}
                />

                <TextField
                  fullWidth
                  type="number"
                  label="Length"
                  {...getFieldProps('length')}
                  error={Boolean(touched.length && errors.length)}
                  helperText={touched.length && errors.length}
                />
              </Stack>
            </CardContent>
          </Card>

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            style={{ maxWidth: 150 }}
          >
            Save
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
