import axios from 'axios';
import { BASE_URL } from '../config';

export function registerUserAPI(user) {    
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/register`, user)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err)
        });
    });
}

export function loginUserAPI(user) {    
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/login`, user)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err)
        });
    });
}

export function loginUserWithBiometricsAPI(user) {    
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/loginWithBiometrics`, user)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err)
        });
    });
}

export function confirmPIN(userData) {    
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/users/confirmPIN`, userData)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err)
        });
    });
}

export function verifyOTP(otpData) {    
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/auth/verifyOTP`, otpData)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err)
        });
    });
}

export function verifyPhone(userData) {    
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_URL}/auth/sendOTP`, userData)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err)
        });
    });
}

export function editUser(userData, userId) {    
    return new Promise((resolve, reject) => {
        axios.patch(`${BASE_URL}/users/update/${userId}`, userData)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err)
        });
    });
}