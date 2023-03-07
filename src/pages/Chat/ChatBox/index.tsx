// import { Box, Button, Flex, Icon, Input, Text } from '@chakra-ui/react';
// import { FaUserCircle, FaPlusCircle } from 'react-icons/fa';
// import { AiOutlineSend } from 'react-icons/ai';

// import React, { useEffect, useRef, useState } from 'react';
// import Message from '../Message';
// import { getMessagesApi, sendMessageApi } from '../../../Redux/apiRequest';
// import { io } from 'socket.io-client';

// interface Props {
//   friend: any;
//   messages: any;
//   user: any;
//   handeSendMessage: any;
//   handleKeyDown: any;
// }

// const ChatBox: React.FC<Props> = (props) => {
//   const { user, friend, messages, handeSendMessage, handleKeyDown } = props;
//   const [newMessage, setNewMessage] = useState<any>();

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const scrollRef: any = useRef();
//   return (
//     <div>
//       <Flex
//         mr='5px'
//         p='15px'
//         alignItems={'center'}
//         borderBottom='1px solid #ececec'>
//         <Icon as={FaUserCircle} m='0 10px 0 5px' p='0' fontSize='30px' />
//         <Flex flexDirection={'column'}>
//           <Text fontSize={'15px'} fontWeight={'600'}>
//             {friend?.name}
//           </Text>
//           <Text fontSize={'12px'}>Đang hoạt động</Text>
//         </Flex>
//       </Flex>
//       <Box h='500px' pt='20px' overflowY={'scroll'}>
//         {messages?.map((item: any, index: number) => (
//           <div ref={scrollRef} key={index}>
//             <Message message={item} own={item?.sender === user._id} />
//           </div>
//         ))}
//       </Box>
//       <Flex p='10px 10px' alignItems={'center'}>
//         <Icon as={FaPlusCircle} m='0 10px 0 5px' p='0' fontSize='20px' />
//         <Input
//           placeholder='Nhập tin nhắn'
//           w='100%'
//           h='30px'
//           px='10px'
//           border='none'
//           borderRadius={'20px'}
//           outline='none'
//           bg='#f4f4f4'
//           onKeyDown={handleKeyDown}
//           onChange={(e) => setNewMessage(e.target.value)}
//           value={newMessage}
//         />
//         <Button
//           onClick={(e) => handeSendMessage(e)}
//           bg='none'
//           color={newMessage ? 'var(--primary)' : '#333'}
//           transition='transform 0.2s'
//           _hover={{
//             bg: 'none',
//             transform: 'scale(1.2)',
//           }}>
//           <Icon as={AiOutlineSend} m='0 10px 0 5px' p='0' fontSize='20px' />
//         </Button>
//       </Flex>
//     </div>
//   );
// };

// export default ChatBox;

import React from 'react';

const index = () => {
  return <div>index</div>;
};

export default index;
