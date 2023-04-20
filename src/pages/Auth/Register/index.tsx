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
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import FadeLoader from 'react-spinners/FadeLoader';
import './Register.styles.scss';

import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { registerApi } from '../../../Redux/apiRequest';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { loading, unLoadding } from '../../../Redux/slice/loadingSlice';

const BACKGROUND = require('../../../assets/image/login_desktop_background.webp');

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  phone: Yup.string()
    .required()
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
      'Phone number is not valid'
    ),
  email: Yup.string().email().required('Email is required!'),
  password: Yup.string()
    .min(6, 'Must be more than 6 characters')
    .required('Password is required!'),
});

const Register = () => {
  const load = useAppSelector((state) => state.loading.value);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleRegisterFormSubmit = async (values: object) => {
    try {
      dispatch(loading());
      const response: any = await registerApi(values);
      const web = `http://${window.location.host}/verify/${response.user._id}`;
      const data: any = {
        to_email: response.user.email,
        html: `<a href="${web}">Click Here</a>`,
      };
      emailjs
        .send('service_vnv5xsp', 'template_qjeivmn', data, 'Qf9ITTrnk9aqrKLBb')
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      toast.success(
        'Đăng ký thành công!, vui lòng kiểm tra email để xác thực tài khoản!',
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
    } catch (error) {
      const response = error.response?.data;
      // console.log('res', response);

      if (response?.message === 'This email already exists') {
        toast.error('Email đã tồn tại!', {
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
      }
      if (response?.message === 'This phone number already exists') {
        toast.error('SĐT đã tồn tại!', {
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
      }
      if (typeof response === 'undefined') {
        toast.error('Waiting for server loading', {
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
      }
    }
  };
  return (
    <Box
      backgroundImage={`url(${BACKGROUND})`}
      bgPosition={'bottom'}
      bgSize='50% auto'
      bgRepeat={'no-repeat'}>
      <Container
        w={'936px'}
        m='15px auto 0 auto'
        p='0 12px'
        className='container'>
        <Breadcrumb fontSize={'13px'} separator='-'>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Đăng ký</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box
          w={'340px'}
          m='0 auto 20px auto'
          p='20px'
          boxShadow='0 0 8px rgb(0 0 0 / 30%)'
          zIndex={69}
          bg='white'
          className='regiser__form'>
          <Flex mt={'15px'} justifyContent='space-between'>
            <Box>
              <Text
                color={'var(--primary)'}
                fontSize={'20px'}
                fontWeight='700'
                textAlign={'left'}>
                Đăng ký
              </Text>
              <Text
                my='5px'
                fontSize={'14px'}
                color='#9b9b9b'
                textAlign={'start'}>
                Tạo tài khoản OldTrade ngay
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
              name: '',
              phone: '',
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleRegisterFormSubmit(values);
              actions.setSubmitting(false);
            }}>
            {(formikProps) => {
              const { isValid } = formikProps;
              return (
                <Form>
                  <VStack h={'40px'} m={'10px 0 20px 0'}>
                    <Field
                      id='name'
                      name='name'
                      placeholder='Nhập tên của bạn'
                      type='text'
                      className='input__field'
                    />
                  </VStack>
                  <VStack my={'20px'}>
                    <Field
                      id='phone'
                      name='phone'
                      placeholder='Nhập SĐT của bạn'
                      type='phone'
                      className='input__field'
                    />
                  </VStack>

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
                      placeholder='Tạo một mật khẩu có ít nhất 6 kí tự'
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
                    Đăng ký
                  </button>
                </Form>
              );
            }}
          </Formik>
          <Text m='10px 5px' fontSize={'13px'} textAlign='center'>
            Bằng việc Đăng ký, bạn đã đồng ý với{' '}
            <Text as={'span'} color={'#1956b8'} cursor='pointer'>
              Điều khoản sử dụng
            </Text>{' '}
            của OldTrade
          </Text>
          <Text mt={'30px'} fontSize={'15px'} textAlign='center'>
            Bạn đã có tài khoản?{' '}
            <Link to={'/login'}>
              <Text as='span'>Đăng nhập</Text>
            </Link>
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
