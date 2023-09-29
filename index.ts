import { Server } from './src/server';
require('dotenv').config()
import './src/config/database';

const server = new Server();
server.start();