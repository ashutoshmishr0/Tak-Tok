import React, { useEffect } from 'react'
import {Container,Box,Text,Tabs,TabList, TabPanel,TabPanels,Tab, Flex} from "@chakra-ui/react";
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
// import { unstable_HistoryRouter } from 'react-router-dom';
import { useHistory } from 'react-router';

const Homepage = () => {

    const history= useHistory();
    
    useEffect(()=>{
        const user =JSON.parse(localStorage.getItem("userInfo"));
        

        if(user) history.push("/chats");
            
        
    },[history]);

  return (
  <Container maxW="xl" centerContent>
    <Box 
    display="flex"
    justifyContent="center"
    p={3}
    bg="white"
    w="100%"
    m="40px 0px 15px 0px"
    borderRadius="lg"
    borderWidth="1px"
    >

       <Text 
       fontSize="4xl"
       fontFamily="Work sans"
       color="black"
       as='b'
       > Tak-Tok </Text>
    </Box>


    <Box
     bg="white"
     w="100%"
     p={4}
     borderRadius="lg"
     borderWidth="1px"
     color="black"
    >
        
        <Tabs variant='soft-rounded' color="black">
  <TabList mb="1em">
    <Tab w="50%">Login</Tab>
    <Tab w="50%">Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
     <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>

    </Box>
  </Container>
  )
}

export default Homepage;
