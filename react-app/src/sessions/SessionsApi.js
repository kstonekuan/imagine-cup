import axios from 'axios';
import API from '../config';

export const readSessionsApi = async (profile) => {
    const response = await axios.get(`${API}/sessions?id=${profile.id}`);
    if (response.status !== 200) {
        throw Error(response.message)
    }
    return response;
};

export const createSessionApi = async (session) => {
    session.timeslot = session.timeslot.toISOString().slice(0, 19).replace('T', ' ')
    if (!session.lengthMinutes) session.lengthMinutes = 30;

    const response = await axios.post(`${API}/sessions`, session);
    if (response.status !== 201) {
        throw Error(response.message)
    }
    return response;
};

export const updateSessionApi = async (session) => {
    session.timeslot = session.timeslot.toISOString().slice(0, 19).replace('T', ' ')
    if (!session.lengthMinutes) session.lengthMinutes = 30;

    const response = await axios.put(`${API}/sessions/${session.id}`, session);
    if (response.status !== 200) {
        throw Error(response.message)
    }
    return response;
};

export const deleteSessionApi = async (session) => {
    const response = await axios.delete(`${API}/sessions/${session.id}`);
    if (response.status !== 200) {
        throw Error(response.message)
    }
    return response;
};

export const getSessions = async (profile) => {
    try {
        if (!profile) return undefined;

        const resp = await readSessionsApi(profile);
        console.log(resp);
        return resp.data;
    } catch (error) {
        console.error(error);
        console.error('Sessions could not be found');
        return undefined;
    }
};

export const addSession = async (session, profile) => {
    try {
        await createSessionApi(session, profile);
        return session;
      } catch (error) {
        console.error(error);
        console.error('Could not add session');
        return undefined;
      }
}

export const updateSession = async (session) => {
    try {
        await updateSessionApi(session);
        return session;
      } catch (error) {
        console.error(error);
        console.error('Could not update session');
        return undefined;
      }
}

export const removeSession = async (session) => {
    try {
        await deleteSessionApi(session);
        return session
    } catch (error) {
        console.error(error);
        console.error('Could not remove session');
        return undefined;
    }
}