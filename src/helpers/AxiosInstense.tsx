import axios from "axios";

const selected_boutique: any = (JSON.parse(localStorage.getItem('selectedBoutique') || '{}'));

const user: any = (JSON.parse(localStorage.getItem('user') || '{}'))

export const AxiosInstense = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        currentBoutique: selected_boutique?.id,
        currentUser: user?.id,
    }
})