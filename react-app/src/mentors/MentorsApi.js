import axios from 'axios';
import API from '../config';

export const readMentorsApi = async (profile) => {
    const response = await axios.get(`${API}/mentors?id=${profile.id}`);
    if (response.status !== 200) {
        throw Error(response.message)
    }
    return response;
};

export const createMentorApi = async (mentor, profile) => {
    const reqBody = {
        mentorId: mentor.id,
        menteeId: profile.id
    };
    const response = await axios.post(`${API}/profile`, reqBody);
    if (response.status !== 201) {
        throw Error(response.message)
    }
    return response;
};

export const getMentors = async (profile) => {
    try {
        const resp = await readMentorsApi(profile);
        console.log(resp);
        return resp.data;
    } catch (error) {
        console.error('Mentors could not be found');
        return undefined;
    }
};

export const addMentor = async (mentor, profile) => {
    try {
        await createMentorApi(mentor, profile)
        return mentor;
      } catch (error) {
        console.error('Could not update profile');
        return undefined;
      }
}