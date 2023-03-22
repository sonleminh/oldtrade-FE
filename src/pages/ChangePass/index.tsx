import React, { useState } from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { changePassApi } from '../../Redux/apiRequest';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
  userId: string;
}

const ChangePass: React.FC<Props> = (props) => {
  const { userId } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setNewShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(6, 'Must be more than 6 characters')
      .required('Password is required!'),
    newPassword: Yup.string()
      .min(6, 'Must be more than 6 characters')
      .required('Password is required!'),
  });

  const handleChangePassFormSubmit = async (values: any) => {
    if (values.currentPassword === values.confirmNewPassword) {
      setError('Mật khẩu mới phải khác với mật khẩu hiện tại');
    } else if (values.newPassword !== values.confirmNewPassword) {
      setError('Mật khẩu mới không trùng khớp nhau');
    } else {
      const { currentPassword, newPassword } = values;
      const data = { currentPassword, newPassword };
      try {
        await changePassApi(userId, data);
        setError('');
        toast.success('Đổi mật khẩu thành công!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        navigate(-1);
      } catch (error) {
        setError('Mật khẩu hiện tại không đúng');
        console.log(error);
      }
    }
  };
  return (
    <React.Fragment>
      <Container w={'936px'} m='15px auto 0 auto' p='0 12px'>
        <Breadcrumb fontSize={'13px'} separator='-'>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Đổi mật khẩu</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box
          w={'340px'}
          m='0 auto 20px auto'
          p='20px'
          boxShadow='0 0 8px rgb(0 0 0 / 30%)'
          zIndex={69}
          bg='white'>
          <Text
            mt={'15px'}
            color={'var(--primary)'}
            fontSize={'20px'}
            fontWeight='700'
            textAlign={'center'}>
            Đổi mật khẩu
          </Text>
          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmNewPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleChangePassFormSubmit(values);
              actions.setSubmitting(false);
            }}>
            {(formikProps) => {
              const { isValid } = formikProps;
              return (
                <Form>
                  <VStack my={'20px'} position='relative'>
                    <Field
                      id='currentPassword'
                      name='currentPassword'
                      placeholder='Nhập mật khẩu cũ'
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
                  <VStack my={'20px'} position='relative'>
                    <Field
                      id='newPassword'
                      name='newPassword'
                      placeholder='Nhập mật khẩu mới'
                      type={showNewPassword ? 'text' : 'password'}
                      className='input__field'
                    />
                    <Button
                      variant='ghost'
                      onClick={() =>
                        setNewShowPassword(
                          (showNewPassword) => !showNewPassword
                        )
                      }
                      position='absolute'
                      top={'4px'}
                      w='10px'
                      bg={'none'}
                      color='black'
                      fontSize={'15px'}
                      right={'15px'}>
                      {showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </VStack>
                  <VStack mt={'20px'} position='relative'>
                    <Field
                      id='confirmNewPassword'
                      name='confirmNewPassword'
                      placeholder='Nhập lại mật khẩu mới'
                      className='input__field'
                      type='password'
                    />
                  </VStack>
                  <Text
                    my='10px'
                    textAlign={'center'}
                    fontSize='13px'
                    color='red'>
                    {error}
                  </Text>
                  {/* {load ? (
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
                  )} */}
                  <Flex pt='10px' gap='7'>
                    <Button
                      w='50%'
                      bg='none'
                      color='var(--primary)'
                      fontWeight={'700'}
                      border={'1px solid var(--primary)'}
                      onClick={() => {
                        navigate(-1);
                      }}>
                      Quay lại
                    </Button>
                    <button
                      type='submit'
                      disabled={!isValid}
                      className='btn__submit'
                      style={{
                        width: '50%',
                      }}>
                      Lưu
                    </button>
                  </Flex>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default ChangePass;
