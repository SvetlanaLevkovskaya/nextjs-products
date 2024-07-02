import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  email: yup.string().required('Почта обязательна'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(7, 'Пароль должен быть не менее 7 символов'),
})
