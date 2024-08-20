import pg from 'pg'
import configs from '../config/parameters'
const { Client } = pg

const client = new Client({connectionString:configs.DATABASE_URL})

export default client 