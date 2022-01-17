import axios from 'axios';
import API from '../config';

export const readMentorsApi = async (profile) => {
    const response = await axios.get(`${API}/mentors?id=${profile.id}`);
    if (response.status !== 200) {
        throw Error(response.message)
    }
    return response;
};

export const getMentors = async (profile) => {
    try {
      const resp = await readMentorsApi(profile);

      return resp;
    } catch (error) {
      console.error('Mentors could not be found');
      return undefined;
    }
};
