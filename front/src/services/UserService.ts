
import axios from 'axios';

const BASE_URL = "http://localhost:3000/api/"

export interface User {
    id: number;
    email: string;
    password: string;
    degree: string;
    englishLevel: string;
    name: string;
    skills: string[];
    experience: string;
    location: string;
    desiredSalary: string;
    updatedAt: string;
    createdAt: string;
}

export interface LastReq {
    id: number;
    userId: number;
    query: string;
    stats: string;
    createdAt: string;
    updatedAt: string;
}

const UserService = {
    isLoggedIn: () => {
        const token = localStorage.getItem('Authorization');
        if (token) {
            const tokenPayload = parseToken(token);
            const currentTime = Date.now() / 1000; // Convert to seconds

            // Check if token is expired
            if (tokenPayload.exp && tokenPayload.exp < currentTime) {
                return false;
            }

            // Add token to axios headers for authenticated requests
            axios.defaults.headers.common['Authorization'] = token;

            return true;
        }

        return false;
    },

    logout: () => {
        localStorage.removeItem('Authorization');
        delete axios.defaults.headers.common['Authorization'];
    },

    getToken: () => {
        const token = localStorage.getItem('Authorization');
        if (token) {
            return token.split(' ');
        }
        return ''
    },

    getUserData: async () => {
        let user: User = emptyUser()
        await axios.get(`${BASE_URL}user`)
            .then(response => {
                user = parseUserToGet(response.data.user)
                return user;
            })
            .catch(error => {
                console.error('Failed to fetch user data:', error);
                return {}
            });
        return user
    },

    getUserLastReqsData: async () => {
        let lastReqs: LastReq[] = [];
        await axios.get(`${BASE_URL}user/reqs`)
            .then(response => {
                lastReqs = response.data.lastReqs
                return lastReqs;
            })
            .catch(error => {
                console.error('Failed to fetch user last reqs data:', error);
                return {}
            });
        console.log(lastReqs)

        return lastReqs
    },

    update: async (user: User) => {
        if (user.id == -1) return emptyUser()
        await axios.put(`${BASE_URL}user`, { user: formUserToSend(user) })
            .then(response => {
                user = parseUserToGet(response.data.updatedUser)
                return user;
            })
            .catch(error => {
                console.error('Failed to fetch user data:', error);
                return {}
            });
        return user
    }
};

export const emptyUser = (): User => ({
    id: -1,
    degree: '',
    email: '',
    password: '',
    name: '',
    englishLevel: '',
    skills: [],
    experience: '',
    updatedAt: '',
    createdAt: '',
    location: '',
    desiredSalary: ''
});

const formUserToSend = (user: User) => ({
    ...user,
    skills: formStringFromArr(user.skills ?? [])
});

const parseUserToGet = (user: any) => ({
    ...user,
    skills: user.skills?.split(';').filter((value: string) => value.trim() !== "") ?? [],
});

const formStringFromArr = (arr: string[]) => {
    let finalStr = ''
    arr.forEach(element => {
        finalStr += `;${element}`
    });
    return finalStr
}

const parseToken = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );
    return JSON.parse(jsonPayload);
};

export default UserService