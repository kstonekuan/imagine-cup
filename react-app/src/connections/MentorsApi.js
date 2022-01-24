import axios from 'axios';
import API from '../config';

export const readMentorsApi = async (profile) => {
    const response = await axios.get(`${API}/connections?id=${profile.id}&isMentor=false`);
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
    const response = await axios.post(`${API}/connections`, reqBody);
    if (response.status !== 201) {
        throw Error(response.message)
    }
    return response;
};

export const updateMentorApi = async (mentor, isActive) => {
    const reqBody = {
        isActive: isActive
    };
    const response = await axios.put(`${API}/connections/${mentor.connectionId}`, reqBody);
    if (response.status !== 200) {
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
        await createMentorApi(mentor, profile);
        return mentor;
      } catch (error) {
        console.error('Could not add mentor');
        return undefined;
      }
}

export const removeMentor = async (mentor) => {
    try {
        await updateMentorApi(mentor, false);
        return mentor
    } catch (error) {
        console.error('Could not remove mentor');
        return undefined;
    }
}