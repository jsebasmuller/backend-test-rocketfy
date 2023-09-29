import { Server } from './server';
require('dotenv').config()
import './config/database';

const server = new Server();
server.start();