import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Show, VStack, useStatStyles } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
// import { unstable_HistoryRouter } from 'react-router-dom';
 import {useHistory} from "react-router-dom"

function Signup() {
    const [show,setShow]=  useState(false)
   const [name,setname]=  useState()
    const [email,setemail]=  useState()
     const [confirmpassword,setconfirmpassword]=  useState()
      const [password,setpassword]=  useState()
       const [pic,setpic]=  useState()
      const [loading, setLoading]=useState(false)
      const [picLoading, setPicLoading] = useState(false);
       const toast = useToast()
     const history= useHistory();


       const handleClick =()=>setShow(!show);

             const submitHandler=async()=>{
        setLoading(true);
        if(!name || !email || !password || !confirmpassword){
          toast({
          title: 'Please Fill all the Feilds!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position:"bottom",
        });
        setPicLoading(false);
        return;
        }
        
         if(password !== confirmpassword){
          toast({
          title: 'Passwords Do Not Match',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position:"bottom",
        });
        return;
        }
        try {
            const config={
                headers:{
                    "Content-type":"application/json",
                },
            };
            const {data }=await axios.post("/api/user",{name,email,password,pic},
            config
            );
          toast({
          title: 'Registration Successful',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position:"bottom",
        });
        localStorage.setItem("userInfo",JSON.stringify(data));
        setLoading(false);
        history.push("/chats");   
        } catch (error) {
          toast({
          title: 'Error Occured!',
          description:error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position:"bottom",
        });
        setPicLoading(false);
        }

       }

       const postDetails=(pics)=>{
          setLoading(true);
          if(pics === undefined){
          toast({
          title: 'Please Select an Image!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position:"bottom",
        });
        return;
          }
          if(pics.type==="image/jpeg" || pics.type==="image/png "|| pics.type === "image/jpg "){
            const data =new FormData();
            data.append("file",pics);
            data.append("upload_preset","Tak-Tok");
            data.append("cloud_name","ashutoshmishra0");
            fetch("https://api.cloudinary.com/v1_1/ashutoshmishra0/image/upload",{
                method:'post',
                body:data,
            }).then((res)=>res.json())
            .then(data => {
                setpic(data.url.toString());
                console.log(data.url.toString());
                setLoading(false);   
            })
            .catch((err)=>{
                console.log(err);
                setLoading(false); 

            });
          } else{
          toast({
          title: 'Please Select an Image!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position:"bottom",
        });
        setPicLoading(false);
        return;
          }
       };

 

  return (
    <VStack spacing="5px" color="black">


        <FormControl id='first-name' isRequired >
            <FormLabel>Name </FormLabel>
            <Input placeholder='Enter Your Name'
            onChange={(e)=>setname(e.target.value)}
            ></Input>
        </FormControl>

        <FormControl id='email' isRequired >
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter Your Email'
            onChange={(e)=>setemail(e.target.value)}
            ></Input>
        </FormControl>

        <FormControl id='password' isRequired >
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
            type={show ? "text" :"password"} placeholder='Enter Your Password'
            onChange={(e)=>setpassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick} >
                {
                    show ? "Hide" : "Show"
                }
                </Button>
            </InputRightElement>
            </InputGroup>
          
        </FormControl>

          <FormControl id='password' isRequired >
            <FormLabel>Conform password</FormLabel>
            <InputGroup>
                <Input
            type={show ? "text" :"password"} placeholder='Enter Your Password'
            onChange={(e)=>setconfirmpassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick} >
                {
                    show ? "Hide" : "Show"
                }
                </Button>
            </InputRightElement>
            </InputGroup>
          
        </FormControl>

        <FormControl id='pic' isRequired >
            <FormLabel>Uplode Your Picture </FormLabel>
            <Input 
            type='file'
            p={1.5}
            accept='image/*'
            onChange={(e)=>postDetails(e.target.files[0])}
            ></Input>
        </FormControl>

        <Button
           colorScheme='blue'
           width="100%"
           style={{marginTop:15}}
           onClick={submitHandler}
           isLoading={loading}
        >Sign Up</Button>

    </VStack>
  );
};

export default Signup;