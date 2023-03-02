import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Text,
  VStack,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  HStack,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Post.styles.scss';
import { createPostApi } from '../../Redux/apiRequest';
import { toast } from 'react-toastify';
import axiosClient from '../../api/axiosClient';
import { useAppDispatch } from '../../Redux/hooks';
import { unLoadding } from '../../Redux/slice/loadingSlice';

interface Props {
  user: any;
}

const Post: React.FC<Props> = (props) => {
  const { user } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const [previewSource, setPreviewSource] = useState<any[]>([]);
  const [local, setLocal] = useState<any>();
  const [cityId, setCityId] = useState<any>('');
  const [districtId, setDistrictId] = useState<any>('');
  const [wardId, setWardId] = useState<any>('');
  const [addressDetail, setAddressDetail] = useState<any>('');

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(3).required('Required'),
    price: Yup.string()
      .min(4)
      .required()
      .matches(
        /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
        'Price is not valid'
      ),
    description: Yup.string().min(5).required('Email is required!'),
  });

  const handlePostFormSubmit = async (values: object) => {
    try {
      const userId = user._id;
      if (!previewSource) return;
      let imageData: any = await uploadImage(previewSource);
      imageData = imageData.map((item: any) => {
        return { publicId: item.public_id, url: item.url };
      });
      const data = {
        ...values,
        image: imageData,
        userId,
        address: {
          addressDetail: addressDetail,
          city: cityId,
          district: districtId,
          ward: wardId,
        },
      };

      const response: any = await createPostApi(data);
      if (response.success === true) {
        toast.success('Đăng tin thành công!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      const response = error.response.data;
      console.log(response.message);
    }
  };
  useEffect(() => {
    dispatch(unLoadding());
  }, [isLoad]);

  useEffect(() => {
    const getLocalData = async () => {
      try {
        const response = await axiosClient.get(
          'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
        );
        setLocal(response);
      } catch (error) {
        console.log('Failed to local: ', error);
      }
    };
    getLocalData();
  }, []);

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file: any) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource([...previewSource, reader.result]);
    };
  };

  const uploadImage = async (base64EncodedImage: any) => {
    console.log(base64EncodedImage);
    let file;
    try {
      file = await axiosClient.post('/api/upload', {
        file: base64EncodedImage,
      });
      return file;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box bg='#f4f4f4' p='15px 0 35px 0'>
      <Container w='990px' m='0 auto'>
        <Breadcrumb my='10px' fontSize={'13px'} separator='-'>
          <BreadcrumbItem>
            <Link to='/'>Trang chủ</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <Text>Đăng tin</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box bg='white'>
          <Grid
            templateColumns='repeat(6, 1fr)'
            gap={0}
            py='30px'
            textAlign={'start'}>
            <GridItem colSpan={2} px='15px'>
              <Text mb='15px' color='#222' fontWeight={700}>
                Ảnh / video sản phẩm
              </Text>
              <Grid templateColumns='repeat(3, 1fr)' gap={15}>
                <GridItem colSpan={1} overflow='hidden'>
                  <Input
                    className='custom-file-input'
                    type='file'
                    name='image'
                    onChange={handleFileInputChange}
                  />
                </GridItem>
                {previewSource.map((item, index) => (
                  <GridItem key={index}>
                    <Box
                      position='relative'
                      display={'flex'}
                      m='auto 2px'
                      border={'1px solid #ddd'}
                      justifyContent='center'
                      alignItems={'center'}>
                      <Image
                        src={item}
                        alt='image'
                        w={'72px'}
                        h='78px'
                        px='4px'
                        objectFit='cover'
                      />
                      <Icon
                        as={FaTimes}
                        onClick={(e) => {
                          previewSource.splice(index, 1);
                          setIsLoad(!isLoad);
                        }}
                        position='absolute'
                        top='-9px'
                        right='-11px'
                        p='5px'
                        bg='black'
                        color='white'
                        borderRadius={'50%'}
                        fontSize='20px'
                        cursor={'pointer'}
                      />
                    </Box>
                  </GridItem>
                ))}
                {/* {imageList.map((url: string, index: number) => (
                  <GridItem colSpan={1} key={index}>
                    <Flex
                      position='relative'
                      border={'1px solid #ddd'}
                      justifyContent='center'
                      m='auto 0'
                      alignItems={'center'}>
                      <Image boxSize='68px' objectFit={'cover'} src={url} />
                      <Icon
                        as={FaTimes}
                        position='absolute'
                        top='-9px'
                        right='-11px'
                        p='5px'
                        bg='black'
                        color='white'
                        borderRadius={'50%'}
                        fontSize='20px'
                      />
                    </Flex>
                  </GridItem>
                ))} */}
              </Grid>
            </GridItem>
            <GridItem colSpan={4} px='30px' h='100%'>
              <Formik
                initialValues={{
                  title: '',
                  price: '',
                  description: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                  handlePostFormSubmit(values);
                  actions.setSubmitting(false);
                }}>
                {(formikProps) => {
                  const { isValid } = formikProps;
                  return (
                    <Form>
                      <VStack h={'40px'} m={'10px 0 20px 0'}>
                        <Field
                          as='select'
                          id='category'
                          name='category'
                          // type='text'
                          className='input__field'
                          required>
                          <option value='' disabled selected>
                            Danh mục
                          </option>
                          <option value='Bất động sản'>Bất động sản</option>
                          <option value='Xe cộ'>Xe cộ</option>
                          <option value='Đồ điện tử'>Đồ điện tử</option>
                          <option value='Tủ lanh, máy lạnh, máy giặt'>
                            Tủ lanh, máy lạnh, máy giặt
                          </option>
                          <option value='Đồ dùng văn phòng, công nông nghiệp'>
                            Đồ dùng văn phòng, công nông nghiệp
                          </option>
                          <option value='Đồ gia dụng, nội thất, cây cảnh'>
                            Đồ gia dụng, nội thất, cây cảnh
                          </option>
                          <option value='Mẹ và bé'>Mẹ và bé</option>
                          <option value='Thời trang, đồ dùng cá nhân'>
                            Thời trang, đồ dùng cá nhân
                          </option>
                          <option value='Việc làm'>Việc làm</option>
                          <option value='Thú cưng'>Thú cưng</option>

                          <option value='Giải trí, thể thao, sở thích'>
                            <option value='Đồ ăn, thực phẩm và các loại khác'>
                              Đồ ăn, thực phẩm và các loại khác
                            </option>
                            Giải trí, thể thao, sở thích
                          </option>
                          <option value='Dịch vụ, du lịch'>
                            Dịch vụ, du lịch
                          </option>
                        </Field>
                      </VStack>
                      <VStack h={'40px'} m={'10px 0 20px 0'}>
                        <Field
                          id='title'
                          name='title'
                          placeholder='Tiêu đề *'
                          type='text'
                          className='input__field'
                        />
                      </VStack>
                      <VStack my={'20px'}>
                        <Field
                          id='price'
                          name='price'
                          placeholder='Giá'
                          type='text'
                          className='input__field'
                        />
                      </VStack>
                      <VStack my={'20px'}>
                        <Field
                          id='description'
                          name='description'
                          placeholder='Mô tả chi tiết'
                          type='description'
                          className='input__field'
                        />
                      </VStack>
                      <HStack justifyContent={'space-between'}>
                        <select
                          id='city'
                          name='city'
                          className='select__field'
                          onChange={(e: any) => {
                            setCityId(e.target.value);
                          }}
                          required>
                          <option value='' disabled selected>
                            Chọn tỉnh thành
                          </option>
                          {local?.map((item: any, index: number) => (
                            <option key={index} value={item.Name}>
                              {item.Name}
                            </option>
                          ))}
                        </select>
                        <select
                          id='district'
                          name='district'
                          className='select__field'
                          onChange={(e: any) => {
                            setDistrictId(e.target.value);
                          }}
                          required>
                          <option value='' disabled selected>
                            Chọn quận huyện
                          </option>
                          {local?.map((item: any) => {
                            if (item.Name === cityId) {
                              return item?.Districts?.map(
                                (district: any, index: number) => {
                                  return (
                                    <option key={index} value={district.Name}>
                                      {district.Name}
                                    </option>
                                  );
                                }
                              );
                            }
                          })}
                        </select>
                        <select
                          id='ward'
                          name='ward'
                          className='select__field'
                          onChange={(e: any) => {
                            setWardId(e.target.value);
                          }}
                          required>
                          <option value='' disabled selected>
                            Chọn phường xã
                          </option>
                          {local?.map((item: any) => {
                            if (item.Name === cityId) {
                              return item?.Districts?.map((district: any) => {
                                if (district.Name === districtId) {
                                  return district?.Wards.map(
                                    (ward: any, index: number) => {
                                      return (
                                        <option key={index} value={ward.Name}>
                                          {ward.Name}
                                        </option>
                                      );
                                    }
                                  );
                                }
                              });
                            }
                          })}
                        </select>
                      </HStack>
                      <VStack my={'20px'}>
                        <Input
                          className='input__field'
                          id='addressDetail'
                          placeholder='Địa chỉ cụ thể'
                          onChange={(e) => setAddressDetail(e.target.value)}
                          // value={values.addressDetail}
                          focusBorderColor='black'
                          bg={'white'}
                          required
                        />
                      </VStack>
                      <Flex>
                        <button
                          type='submit'
                          disabled={!isValid}
                          className='btn__submit'>
                          Đăng tin
                        </button>
                        <Box mx='5px'></Box>
                        <Button
                          w='50%'
                          bg={'white'}
                          color='var(--primary)'
                          border={'1px solid var(--primary)'}
                          fontWeight={700}
                          _hover={{
                            bg: '#e0e0e0',
                          }}
                          onClick={() => navigate('/')}>
                          Quay lại
                        </Button>
                      </Flex>
                    </Form>
                  );
                }}
              </Formik>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Post;
