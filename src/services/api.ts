// Пример использования
// import { useQuery } from "@tanstack/react-query";

// const {data, isLoading, isError, isSuccess} = useQuery({queryFn: () => getAllCourses(), queryKey: ['courses', 'all']})
import axios from "axios";

const baseUrl = 'https://sky-fitness-pro-2f260-default-rtdb.asia-southeast1.firebasedatabase.app/';

export const getAllCourses = async () => {
    try {
        const response = await axios.get(`${baseUrl}courses.json`)
        return  response.data;
    } catch (error) {
        return error;
    }
}

export const getCourseById = async (id:string) => {
    try {
        const response = await axios.get(`${baseUrl}courses/${id}.json`)
        console.log(response.data)
        return  response.data;
    } catch (error) {
        return error;
    }
}

export const getAllWorkouts = async () => {
    try {
        const response = await axios.get(`${baseUrl}workouts.json`)
        console.log(response.data)
        return  response.data;
    } catch (error) {
        return error;
    }
}

export const getWorkoutById = async (id:string) => {
    try {
        const response = await axios.get(`${baseUrl}workouts/${id}.json`)
        console.log(response.data)
        return  response.data;
    } catch (error) {
        return error;
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${baseUrl}users.json`)
        return  response.data;
    } catch (error) {
        return error;
    }
}