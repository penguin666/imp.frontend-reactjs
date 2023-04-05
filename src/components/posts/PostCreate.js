import React from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form';

import {
    Input,
    Button,
    Stack,
    FormControl,
    FormErrorMessage,
    FormLabel
} from '@chakra-ui/react'

import history from '../../history';

const PostCreate = ({posts, setPosts}) => {
    const {handleSubmit, register, formState: { errors, isSubmitting }} = useForm();

    const onSubmit = async (formValues) => {
        try{
            const response = await axios.post('http://backend-local.id/api/posts', formValues);
            if(response.data.status === 'success'){

                if (!posts.some(post => post.id === response.data.data.id)){
                    setPosts([...posts, response.data.data]);
                }

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
                        Save
                    </Button>
                </div>
            </Stack>
        </form>
    );
};

export default PostCreate;