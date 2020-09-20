import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import {  View } from 'react-native'
import { Task, useGetTaskQuery } from '../../generated/graphql'
import { Routes } from 'types'
import {Box, Text} from '../../components'

interface Props {
  navigation: StackNavigationProp<Routes, "TaskDetail">;
  route: RouteProp<Routes, "TaskDetail">;
}

const TaskDetail = ({ navigation, route }: Props) => {
    const { id } = route.params

    const { data , loading, error } = useGetTaskQuery({ variables: { id }})

    const [ task, setTask ] = useState<Task>()

    useEffect(() => {
        if(data && !loading && !error) {
            setTask(data.task as Task)
        }
    },[data,loading,error])
    if(!task)
    return <Text variant="header">Loading .... </Text>
    else 
    return (
        <Box flex={1} backgroundColor="mainBackground" paddingHorizontal="l" >
            <Text variant="header">{task.title}</Text>
        </Box>
    )
}

export default TaskDetail
