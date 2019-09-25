import axios from 'axios';
import { getToken } from "./services/auth";

const token = getToken();

const simpleRestProvider = (tokenForce) => axios.create({
    baseURL: 'https://painel-projetos-api.herokuapp.com',
    timeout: 10000,
    headers: { "Authorization": `Basic ${tokenForce || token}` }
});


export default simpleRestProvider;