import React from 'react';
import { Box, Flex, Image, Text, Icon } from '@chakra-ui/react';
import { BsDot } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import moment from 'moment';

interface Props {
  item: any;
}

const PostCard: React.FC<Props> = (props) => {
  const { item } = props;
  return (
    <div>
      <Link to={`post/${item._id}`}>
        <Box p={'13px'}>
          <Image
            src={item.image[0]?.url}
            alt='icon'
            boxSize='166px'
            borderRadius={'2px'}
            objectFit='cover'
          />
          <Text
            maxW='166px'
            h={'36px'}
            m='5px auto'
            overflow={'hidden'}
            textOverflow='ellipsis'
            lineHeight={'18px'}
            textAlign={'start'}
            fontSize={'14px'}
            color='#222'>
            {item.title}
          </Text>
          <Text
            textAlign={'start'}
            color='#d0021b'
            fontSize={'15px'}
            fontWeight='700'>
            {item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ
          </Text>
          <Flex
            m={'10px 0'}
            fontSize={'10px'}
            color={'#9b9b9b'}
            alignItems='center'>
            <Image src='user-icon.svg' alt='icon' w={'16px'} />
            <Icon as={BsDot} fontSize='10px' />
            <Text>{moment(item.createdAt).fromNow()}</Text>
            <Icon as={BsDot} fontSize='10px' />
            <Text>{item?.address?.city}</Text>
          </Flex>
        </Box>
      </Link>
    </div>
  );
};

export default PostCard;
