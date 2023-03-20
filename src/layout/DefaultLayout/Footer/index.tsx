import React from 'react';
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';
import { FaFacebookSquare, FaYoutubeSquare, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box borderTop={'2px solid #F4F4F4'}>
      <Container w={'960px'} m='15px auto 0 auto' p='0 12px'>
        <Grid templateColumns='repeat(4, 1fr)' gap={6} textAlign={'start'}>
          <GridItem>
            <Text
              my={'15px'}
              textTransform={'uppercase'}
              fontWeight='bold'
              fontSize='15px'
              color={'#333'}>
              TẢI ỨNG DỤNG OLDTRADE
            </Text>
            <Flex>
              <Image
                src={require('../../../assets/image/chotot_qr.webp')}
                boxSize={'80px'}
              />
              <Box ml={'10px'}>
                <Image
                  src={require('../../../assets/image/ios-tag.svg').default}
                  w={'100px'}
                  mb='10px'
                />
                <Image
                  src={require('../../../assets/image/android-tag.svg').default}
                  w={'100px'}
                />
              </Box>
            </Flex>
          </GridItem>
          <GridItem>
            <Text
              my={'15px'}
              textTransform={'uppercase'}
              fontWeight='bold'
              fontSize='15px'
              color={'#333'}>
              HỖ TRỢ KHÁCH HÀNG
            </Text>
            <Box color={'#777777db'} fontSize='14px' fontWeight={'500'}>
              <Text my='10px' fontWeight={400}>
                Trung tâm trợ giúp
              </Text>
              <Text my='10px' fontWeight={400}>
                An toàn mua bán
              </Text>
              <Text my='10px' fontWeight={400}>
                Quy định cần biết
              </Text>
              <Text my='10px' fontWeight={400}>
                Quy chế quyền riêng tư
              </Text>
              <Text my='10px' fontWeight={400}>
                Liên hệ hỗ trợ
              </Text>
            </Box>
          </GridItem>
          <GridItem>
            <Text
              my={'15px'}
              textTransform={'uppercase'}
              fontWeight='bold'
              fontSize='15px'
              color={'#333'}>
              VỀ OLDTRADE
            </Text>
            <Box color={'#777777db'} fontSize='14px' fontWeight={'500'}>
              <Text my='10px' fontWeight={400}>
                Giới thiệu
              </Text>
              <Text my='10px' fontWeight={400}>
                Tuyển dụng
              </Text>
              <Text my='10px' fontWeight={400}>
                Truyền thông
              </Text>
              <Text my='10px' fontWeight={400}>
                Blog
              </Text>
            </Box>
          </GridItem>
          <GridItem>
            <Text
              my={'15px'}
              textTransform={'uppercase'}
              fontWeight='bold'
              fontSize='15px'
              color={'#333'}>
              LIÊN KẾT
            </Text>
            <Flex>
              <Icon
                as={FaFacebookSquare}
                color='#38699f'
                fontSize={'30px'}
                mr='10px'
              />
              <Icon
                as={FaYoutubeSquare}
                color='#ff0a28'
                fontSize={'30px'}
                mr='10px'
              />
              <Icon
                as={FaLinkedin}
                color='#0a66c2'
                fontSize={'30px'}
                mr='10px'
              />
            </Flex>
            <Text
              my={'10px'}
              textTransform={'uppercase'}
              fontWeight='bold'
              fontSize='15px'
              color={'#333'}>
              CHỨNG NHẬN
            </Text>
            <Image
              src={require('../../../assets/image/certificate.webp')}
              alt='certificate'
            />
          </GridItem>
        </Grid>
      </Container>
      <Box
        mt='20px'
        p='25px 0 40px 0'
        fontSize={'13px'}
        color='#8C8C8C'
        borderTop={'2px solid #F4F4F4'}
        textAlign='center'>
        <Text m={'2px 0'}>
          CÔNG TY TNHH OLDTRADE - Người đại diện theo pháp luật: Lê Minh Sơn;
          GPDKKD: 0312120782 do sở KH & ĐT TP.HCM cấp ngày 11/01/2013;
        </Text>
        <Text m={'2px 0'}>
          GPMXH: 17/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 15/01/2019
          - Chịu trách nhiệm nội dung: Lê Minh Sơn. Chính sách sử dụng
        </Text>
        <Text m={'2px 0'}>
          Địa chỉ: Số 2 Ngô Đức Kế, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí
          Minh, Việt Nam; Email: trogiup@oldtrade.vn - Tổng đài CSKH: 19003003
          (1.000đ/phút)
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
