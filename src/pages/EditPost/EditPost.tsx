import {
  Box,
  Container,
  Grid,
  GridItem,
  Image,
  Input,
  Text,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  VStack,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { editPostApi, getPostApi } from '../../Redux/apiRequest';
import axiosClient from '../../api/axiosClient';
import { toast } from 'react-toastify';
import '../Post/Post.styles.scss';

interface Props {
  post: any;
}

const EditPostForm: React.FC<Props> = (props) => {
  const [isLoad, setIsLoad] = useState(false);
  const [cityId, setCityId] = useState<any>('');
  const [local, setLocal] = useState<any>();
  const [districtId, setDistrictId] = useState<any>('');
  const [wardId, setWardId] = useState<any>('');
  const [addressDetail, setAddressDetail] = useState<any>('');
  const { post } = props;
  const { id } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(3).required('Required'),
    price: Yup.string()
      .required()
      .matches(
        /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
        'Price is not valid'
      ),
    description: Yup.string().min(5).required('Email is required!'),
  });

  const onFormSubmit = async (formData: any) => {
    try {
      if (!previewSource) return;
      let imageData: any = await uploadImage(previewSource);
      imageData = imageData.map((item: any) => {
        return { publicId: item.public_id, url: item.url };
      });
      const data = {
        ...formData,
        image: imageData,
        address: {
          addressDetail: addressDetail,
          city: cityId,
          district: districtId,
          ward: wardId,
        },
      };
      const response: any = await editPostApi(id, data);
      console.log(response);
      if (response.message === 'Update post successfully') {
        toast.success('S???a tin th??nh c??ng!', {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [previewSource, setPreviewSource] = useState<any[]>(post.image);

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

  const convertToBase64 = (url: string) => {
    return fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        return new Promise(function (resolve) {
          var reader = new FileReader();
          reader.onloadend = function () {
            resolve(reader.result);
          };
          reader.readAsDataURL(blob);
        });
      });
  };

  useEffect(() => {
    const updatePrepare = async () => {
      const promise = post.image.map(async (item: any) => {
        return await convertToBase64(item.url).then((response) => response);
      });
      let images = await Promise.all(promise);
      setPreviewSource(images);
    };
    updatePrepare();
  }, []);

  useEffect(() => {
    const getLocalData = async () => {
      try {
        const response = await axiosClient.get(
          'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
        );
        setLocal(response);
        setAddressDetail(post.address.addressDetail);
      } catch (error) {
        console.log('Failed to local: ', error);
      }
    };
    getLocalData();
  }, []);

  return (
    <Box bg='#f4f4f4' p='15px 0 35px 0'>
      <Container w='990px' m='0 auto'>
        <Breadcrumb my='10px' fontSize={'13px'} separator='-'>
          <BreadcrumbItem>
            <Link to='/'>Trang ch???</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <Text>S???a tin</Text>
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
                ???nh / video s???n ph???m
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
              </Grid>
            </GridItem>
            <GridItem colSpan={4} px='30px'>
              <Formik
                initialValues={post}
                validationSchema={validationSchema}
                onSubmit={onFormSubmit}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <VStack h={'40px'} m={'10px 0 20px 0'}>
                      <Field
                        as='select'
                        id='category'
                        name='category'
                        className='input__field'
                        required
                        defaultValue={post.category}>
                        <option value='B???t ?????ng s???n'>B???t ?????ng s???n</option>
                        <option value='Xe c???'>Xe c???</option>
                        <option value='????? ??i???n t???'>????? ??i???n t???</option>
                        <option value='T??? lanh, m??y l???nh, m??y gi???t'>
                          T??? lanh, m??y l???nh, m??y gi???t
                        </option>
                        <option value='????? d??ng v??n ph??ng, c??ng n??ng nghi???p'>
                          ????? d??ng v??n ph??ng, c??ng n??ng nghi???p
                        </option>
                        <option value='????? gia d???ng, n???i th???t, c??y c???nh'>
                          ????? gia d???ng, n???i th???t, c??y c???nh
                        </option>
                        <option value='M??? v?? b??'>M??? v?? b??</option>
                        <option value='Th???i trang, ????? d??ng c?? nh??n'>
                          Th???i trang, ????? d??ng c?? nh??n
                        </option>
                        <option value='Vi???c l??m'>Vi???c l??m</option>
                        <option value='Th?? c??ng'>Th?? c??ng</option>

                        <option value='Gi???i tr??, th??? thao, s??? th??ch'>
                          <option value='????? ??n, th???c ph???m v?? c??c lo???i kh??c'>
                            ????? ??n, th???c ph???m v?? c??c lo???i kh??c
                          </option>
                          Gi???i tr??, th??? thao, s??? th??ch
                        </option>
                        <option value='D???ch v???, du l???ch'>
                          D???ch v???, du l???ch
                        </option>
                      </Field>
                    </VStack>
                    <VStack h={'40px'} m={'10px 0 20px 0'}>
                      <Field
                        className='input__field'
                        id='title'
                        name='title'
                        placeholder='Title'
                        value={values.title}
                        onChange={handleChange}
                      />
                    </VStack>
                    <VStack my={'20px'}>
                      <Field
                        className='input__field'
                        id='price'
                        name='price'
                        placeholder='price'
                        value={values.price}
                        onChange={handleChange}
                      />
                    </VStack>
                    <VStack my={'20px'}>
                      <Field
                        className='input__field'
                        id='description'
                        name='description'
                        placeholder='description'
                        value={values.description}
                        onChange={handleChange}
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
                        <option value={''} disabled selected>
                          {post?.address.city}
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
                        <option value={''} disabled selected>
                          {post.address?.district}
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
                        <option value={''} disabled selected>
                          {post.address?.ward}
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
                        placeholder='?????a ch??? c??? th???'
                        onChange={(e) => setAddressDetail(e.target.value)}
                        focusBorderColor='black'
                        bg={'white'}
                        value={addressDetail}
                        required
                      />
                    </VStack>
                    <Flex>
                      <Button w='50%' onClick={() => handleSubmit()}>
                        L??u tin
                      </Button>
                      <Box mx='5px'></Box>
                      <Button
                        w='50%'
                        p='8px'
                        bg={'white'}
                        color='var(--primary)'
                        border={'1px solid var(--primary)'}
                        fontWeight={700}
                        _hover={{
                          bg: '#e0e0e0',
                        }}
                        onClick={() => navigate('/')}>
                        Quay l???i
                      </Button>
                    </Flex>
                  </>
                )}
              </Formik>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

// export default EditPost;

function EditPost() {
  const [post, setPost] = useState<object>({});
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response: any = await getPostApi(id);
        setPost(response);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, [id]);
  console.log(post);

  return (
    <>
      <Box>
        <Box>
          {Object.keys(post).length > 0 && <EditPostForm post={post} />}
        </Box>
      </Box>
    </>
  );
}

export default EditPost;
