import axios from 'axios';
import API from '../config';

export const readMenteesApi = async (profile) => {
    const response = await axios.get(`${API}/connections?id=${profile.id}&isMentor=true`);
    if (response.status !== 200) {
        throw Error(response.message)
    }
    return response;
};

export const createMenteeApi = async (mentee, profile) => {
    const reqBody = {
        mentorId: profile.id,
        menteeId: mentee.id
    };
    const response = await axios.post(`${API}/connections`, reqBody);
    if (response.status !== 201) {
        throw Error(response.message)
    }
    return response;
};

export const updateMenteeApi = async (mentee, isActive) => {
    const reqBody = {
        isActive: isActive
    };
    const response = await axios.put(`${API}/connections/${mentee.connectionId}`, reqBody);
    if (response.status !== 200) {
        throw Error(response.message)
    }
    return response;
};

export const getMentees = async (profile) => {
    try {
        const resp = await readMenteesApi(profile);
        console.log(resp);
        return resp.data;
    } catch (error) {
        console.error('Mentors could not be found');
        return undefined;
    }
};

export const addMentee = async (mentee, profile) => {
    try {
        await createMenteeApi(mentee, profile);
        return mentee;
      } catch (error) {
        console.error('Could not add mentor');
        return undefined;
      }
}

export const removeMentee = async (mentee) => {
    try {
        await updateMenteeApi(mentee, false);
        return mentee
    } catch (error) {
        console.error('Could not remove mentor');
        return undefined;
    }
}