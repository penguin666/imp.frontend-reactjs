import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Router, Switch, Route, Link} from "react-router-dom";

import {
    Button, Box,
    Card, CardHeader, CardBody,
    Heading
} from '@chakra-ui/react'

import history from './history';

import PostList from './components/posts/PostList';
import PostCreate from './components/posts/PostCreate';
import PostEdit from './components/posts/PostEdit';

const App = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://backend-local.id/api/posts', {
                    params: {
                        size:1000,
                    }
                });
                if (response.data.status === 'success'){
                    setPosts(response.data.data.data)
                }else{
                    throw new Error(response.data.data.message);
                }
            } catch (error) {
                console.log(error)
            }
        };
        getData();
    }, []);

    return (
        <Router history={history}>
            <Switch>
                <Route exact path={`/`}>
                    <Box sx={{textAlign: 'right'}} my="5" mx={{base: 10, md: 150}}>
                        <Button
                            as={Link}
                            to={`/create`}
                            colorScheme="teal"
                            mr="1" size="md"
                        >
                            Add Post
                        </Button>
                    </Box>
                    <PostList posts={posts} setPosts={setPosts}/>
                </Route>
                <Route path={`/create`}>
                    <Box sx={{textAlign: 'right'}} my="5" mx={{base: 10, md: 150}}>
                        <Button
                            as={Link}
                            to={`/`}
                            colorScheme="red"
                            mr="1" size="md"
                        >
                            Back
                        </Button>
                    </Box>
                    <Card mx={{base: 10, md: 150}}>
                        <CardHeader>
                            <Heading size='md'>Post Create</Heading>
                        </CardHeader>

                        <CardBody>
                            <PostCreate posts={posts} setPosts={setPosts}/>
                        </CardBody>
                    </Card>
                </Route>
                <Route path={`/edit/:id`}>
                    <Box sx={{textAlign: 'right'}} my="5" mx={{base: 10, md: 150}}>
                        <Button
                            as={Link}
                            to={`/`}
                            colorScheme="red"
                            mr="1" size="md"
                        >
                            Back
                        </Button>
                    </Box>
                    <Card mx={{base: 10, md: 150}}>
                        <CardHeader>
                            <Heading size='md'>Post Edit</Heading>
                        </CardHeader>

                        <CardBody>
                            <PostEdit posts={posts} setPosts={setPosts}/>
                        </CardBody>
                    </Card>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;