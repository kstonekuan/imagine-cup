import axios from 'axios';
import API from '../config';

export const updateProfileApi = async (profile) => {
    const response = await axios.put(`${API}/profile/${profile.id}`, profile);
    if (response.status !== 200) {
        throw Error(response.message)
    }
    return response;
};

export const createProfileApi = async (profile) => {
    const response = await axios.post(`${API}/profile`, profile);
    if (response.status !== 201) {
        throw Error(response.message)
    }
    return response;
};

export const readProfileApi = async (profile) => {
    const response = await axios.get(`${API}/profile?providerId=${profile.providerId}&provider=${profile.provider}`);
    if (response.status !== 200 && response.status !== 404) {
        throw Error(response.message)
    }
    return response;
};

export const getProfile = async () => {
    try {
      const authResponse = await fetch('/.auth/me');
      const payload = await authResponse.json();
      let profile = {
        provider: payload.clientPrincipal.identityProvider,
        providerId: payload.clientPrincipal.userId 
      };

      const readProfileResponse = await readProfileApi(profile)
      if (readProfileResponse.status === 200) {
        profile = {...profile, ...readProfileResponse.data};
      } else if (readProfileResponse.status === 404) {
        const createProfileResponse = await createProfileApi(profile)
        profile = {...profile, ...createProfileResponse.data};
      }

      return profile;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
};

export const updateProfile = async (profile) => {
    try {
      const response = await updateProfileApi(profile)
      profile = {...profile, ...response.data};
      return profile;
    } catch (error) {
      console.error('Could not update profile');
      return undefined;
    }
};