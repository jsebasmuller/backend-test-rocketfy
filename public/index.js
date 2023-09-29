"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
require('dotenv').config();
require("./config/database");
const server = new server_1.Server();
server.start();
//# sourceMappingURL=index.js.map