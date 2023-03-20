import React from 'react';
import { useState } from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { toast } from 'react-toastify';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import FadeLoader from 'react-spinners/FadeLoader';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { login } from '../../../Redux/slice/userSlice';
import { loginApi } from '../../../Redux/apiRequest';
import { loading, unLoadding } from '../../../Redux/slice/loadingSlice';

const BACKGROUND = require('../../../assets/image/login_desktop_background.webp');

interface Values {
  email: string;
  password: String;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required!'),
  password: Yup.string()
    .min(6, 'Must be more than 6 characters')
    .required('Password is required!'),
});

const Login = () => {
  const load = useAppSelector((state) => state.loading.value);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLoginFormSubmit = async (values: Values) => {
    try {
      dispatch(loading());
      const response: any = await loginApi(values);

      const { _id, name, email, phone, address, createdAt } = response;

      if (response.message === 'Email or password is incorrect') {
        toast.error('Sai email hoặc mật khẩu!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        dispatch(unLoadding());
      } else if (response.verified === false) {
        toast.error(
          'Tài khoản chưa được xác minh, vui lòng kiểm tra lại email!',
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          }
        );
        dispatch(unLoadding());
      } else {
        toast.success('Đăng nhập thành công!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        dispatch(unLoadding());

        dispatch(login({ _id, name, email, phone, address, createdAt }));
        navigate('/');
      }
    } catch (error) {
      const response = error.response.data;
      console.log(response.message);
    }
  };

  return (
    <Box
      backgroundImage={`url(${BACKGROUND})`}
      bgPosition={'bottom'}
      bgSize='50% auto'
      bgRepeat={'no-repeat'}>
      <Container w={'936px'} m='15px auto 0 auto' p='0 12px'>
        <Breadcrumb fontSize={'13px'} separator='-'>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Đăng nhập</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box
          w={'340px'}
          m='0 auto 20px auto'
          p='20px'
          boxShadow='0 0 8px rgb(0 0 0 / 30%)'
          zIndex={69}
          bg='white'>
          <Flex mt={'15px'} justifyContent='space-between'>
            <Box>
              <Text
                color={'var(--primary)'}
                fontSize={'20px'}
                fontWeight='700'
                textAlign={'left'}>
                Đăng nhập
              </Text>
              <Text
                my='5px'
                fontSize={'14px'}
                color='#9b9b9b'
                textAlign={'start'}>
                Chào bạn quay lại
              </Text>
            </Box>

            <Image
              boxSize={'70px'}
              objectFit='cover'
              textAlign={'center'}
              src={require('../../../assets/image/oldtrade-icon.png')}
            />
          </Flex>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleLoginFormSubmit(values);
              actions.setSubmitting(false);
            }}>
            {(formikProps) => {
              const { isValid } = formikProps;
              return (
                <Form>
                  <VStack my={'20px'}>
                    <Field
                      id='email'
                      name='email'
                      placeholder='Nhập email của bạn'
                      type='email'
                      className='input__field'
                    />
                  </VStack>
                  <VStack my={'20px'} position='relative'>
                    <Field
                      id='password'
                      name='password'
                      placeholder='Nhập mật khẩu của bạn'
                      type={showPassword ? 'text' : 'password'}
                      className='input__field'
                    />
                    <Button
                      variant='ghost'
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                      position='absolute'
                      top={'4px'}
                      w='10px'
                      bg={'none'}
                      color='black'
                      fontSize={'15px'}
                      right={'15px'}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </VStack>
                  {load ? (
                    <Box display={'flex'} justifyContent={'center'} ml='20px'>
                      <FadeLoader
                        color='var(--primary)'
                        height={8}
                        margin={-5}
                        width={3}
                      />
                    </Box>
                  ) : (
                    <></>
                  )}
                  <button
                    type='submit'
                    disabled={!isValid}
                    className='btn__submit'
                    style={{
                      width: '100%',
                    }}>
                    Đăng nhập
                  </button>
                </Form>
              );
            }}
          </Formik>
          <Link to='#'>
            <Text m='10px 5px' fontSize={'13px'} textAlign='center'>
              Bạn đã quên mật khẩu ?
            </Text>
          </Link>
          <Text mt={'30px'} fontSize={'15px'} textAlign='center'>
            Chưa có tài khoản?{' '}
            <Link to={'/register'}>
              <Text as='span'>Đăng ký</Text>
            </Link>
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
