import { Flex, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';

interface Props {
  message: any;
  own: boolean;
}

const Message: React.FC<Props> = (props) => {
  const { message, own } = props;
  return (
    <>
      {own ? (
        <Flex justifyContent={'end'}>
          <Flex
            maxW='65%'
            m='15px 10px'
            p='10px 12px'
            bg='#f4f4f4'
            borderRadius={'8px'}
            flexDirection='column'
            textAlign='right'>
            <Text mb='5px' color='#222' fontSize={'15px'}>
              {message?.text}
            </Text>
            <Text fontSize={'12px'} color='#bdc1c9'>
              {moment(message?.createdAt).fromNow()}
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Flex>
          <Flex
            maxW='65%'
            m='15px 10px'
            p='10px 12px'
            bg='#f4f4f4'
            borderRadius={'8px'}
            flexDirection='column'>
            <Text mb='5px' color='#222' fontSize={'15px'}>
              {message?.text}
            </Text>
            <Text fontSize={'12px'} color='#bdc1c9'>
              {moment(message?.createdAt).fromNow()}
            </Text>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default Message;
