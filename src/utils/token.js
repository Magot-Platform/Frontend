import api from '../utils/api';

export const getTokenBalance = async (chain, address, contractAddress) => {

    const body = { chain, address, contractAddress };

    try {
        const res = await api.post('/token/balance', body);

        return res.data;
    } catch (err) {
        const errors = err.response.data.errors;
        console.log("errors",errors)
    }
};