import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { getUserApi } from '../../Redux/apiRequest';

interface Props {
  user: any;
  conversation: any;
}

const Conversation: React.FC<Props> = (props) => {
  const [friend, setFriend] = useState<any>();
  const { user, conversation } = props;

  useEffect(() => {
    const friendId = conversation.members.find((m: any) => m !== user._id);
    const getFriend = async () => {
      try {
        const response: any = await getUserApi(friendId);
        setFriend(response);
      } catch (error) {
        console.log('Failed to get user: ', error);
      }
    };
    getFriend();
  }, []);

  return (
    <Flex
      mr='5px'
      p='10px'
      alignItems={'center'}
      borderBottom='1px solid #ececec'>
      <Icon as={FaUserCircle} m='0 10px 0 5px' p='0' fontSize='40px' />
      <Flex flexDirection={'column'}>
        <Flex alignItems={'center'}>
          <Text>{friend?.name}</Text>
          <Text mx='5px'>-</Text>
          <Text fontSize={'13px'}>2 ngay truoc</Text>
        </Flex>
        <Text mt='7px'>Okie nhanaha</Text>
      </Flex>
    </Flex>
  );
};

export default Conversation;
