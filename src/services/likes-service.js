import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const api = axios.create({
  withCredentials: true
});

/**
 * The below service is used to find all tuits likes by the user.
 * @param userId
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findAllTuitsLikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/likes`)
        .then(response => response.data);

/**
 * The below service is used to find all users who liked the tuit..
 * @param userId
 * @returns {Promise<AxiosResponse<any>>}
 */
export const findAllUsersThatLikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/likes`)
        .then(response => response.data);

/**
 * The below service is used to crreate likes.
 * @param userId
 * @returns {Promise<AxiosResponse<any>>}
 */
export const userLikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);
