import {ExpressServer} from '../core/classes/ExpressServer';
import {connectDatabase} from '../core/services/connectDatabase'; 
import config from '../settings/index';
import * as path from 'path';

// Define Server
var server  = new ExpressServer();

// Setup Server
server.setupStatics('/statics', path.join(__dirname, 'statics'));

// Start Server
server.listen(config.server.port).then(function () {
    console.log('Server up at port '+config.server.port);
})