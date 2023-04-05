import React from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";

import {
    Card, CardHeader, CardBody,
    Heading, Stack, Box, StackDivider, Text,
    Button, ButtonGroup, Flex, Spacer
} from '@chakra-ui/react'

const PostList = ({posts, setPosts}) => {

    const onDeleteClick = async (id) => {
        try {
            const response = await axios.delete(`http://backend-local.id/api/posts/${id}`);

            if(response.data.status === 'success'){
                const newPosts = posts.filter((post) => post.id !== id);
                setPosts(newPosts);
            }else if(response.data.status === 'fail' || response.data.status === 'error'){
                throw new Error(response.data.data.message);
            }
        }catch (error){
            console.log(error);
        }
    };

    return (
        <Card mx={{base:10, md:150}}>
            <CardHeader>
                <Heading size='md'>Post List</Heading>
            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    {posts.map(post => (
                        <Box key={post.id}>
                            <Flex direction={'row'}>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        {post.title}
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {post.description}
                                    </Text>
                                </Box>
                                <Spacer />
                                <ButtonGroup gap='2'>
                                    <Button
                                        as={Link}
                                        to={`edit/${post.id}`}
                                        colorScheme="yellow"
                                        mr="1" size="md"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        colorScheme="red"
                                        size="md"
                                        onClick={()=>onDeleteClick(post.id)}
                                    >Delete</Button>
                                </ButtonGroup>
                            </Flex>
                        </Box>
                    ))}
                </Stack>
            </CardBody>
        </Card>
    )
};

export default PostList;