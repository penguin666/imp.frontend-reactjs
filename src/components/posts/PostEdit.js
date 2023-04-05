import React, {useEffect} from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { useParams } from "react-router-dom";

import {
    Input,
    Button,
    Stack,
    FormControl,
    FormErrorMessage,
    FormLabel
} from '@chakra-ui/react'

import history from '../../history';

const PostEdit = ({posts, setPosts}) => {
    const {handleSubmit, register, setValue, formState: { errors, isSubmitting }} = useForm();
    let { id } = useParams();

    useEffect(() => {
        const getPost = async (id) => {
            try {
                const response = await axios.get(`http://backend-local.id/api/posts/${id}`);
                if (response.data.status === 'success'){
                    const data = response.data.data;
                    setValue('title', data.title);
                    setValue('description', data.description);
                }else{
                    throw new Error(response.data.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getPost(id);
    }, [id, setValue]);

    const onSubmit = async (formValues) => {
        try{
            const response = await axios.put(`http://backend-local.id/api/posts/${id}`, formValues);
            if(response.data.status === 'success'){
                setPosts(posts.map(post => (
                    post.id === response.data.data.id ? {...post, title:response.data.data.title, description:response.data.data.description} : post
                )));

                history.push('/');
            }else if(response.data.status === 'fail' || response.data.status === 'error'){
                throw new Error(response.data.data.message);
            }
        }catch (error){
            console.log(error)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
                spacing={4}
            >
                <FormControl isInvalid={errors.title}>
                    <FormLabel>Title</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter the title..."
                        {...register('title', {
                            required: 'Please enter the title',
                            minLength: { value: 3, message: 'Minimum 3 characters' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.title && errors.title.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.description}>
                    <FormLabel>Description</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter the description..."
                        {...register('description', {
                            required: 'Please enter the description',
                            minLength: { value: 3, message: 'Minimum 3 characters' },
                        })}
                    />
                    <FormErrorMessage>
                        {errors.description && errors.description.message}
                    </FormErrorMessage>
                </FormControl>
                <div>
                    <Button
                        isLoading={isSubmitting}
                        type="submit"
                        variant="solid"
                        colorScheme="teal"
                    >
                        Update
                    </Button>
                </div>
            </Stack>
        </form>
    );
};

export default PostEdit;