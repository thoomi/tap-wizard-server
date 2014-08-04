////////////////////////////////////////////////////////////////////////////////
/// Main entry point
////////////////////////////////////////////////////////////////////////////////
var GameServer = require('./server/game_server.js');

(function main() {
	try 
	{
		// -----------------------------------------------------------------------------
	    // Create a fresh game server instance
	    // -----------------------------------------------------------------------------
		var gameServer = new GameServer();

		// -----------------------------------------------------------------------------
	    // Call onStartup to setup all components of the server. After all components 
	    // are setup the network component is going to listen for socket events. These
	    // events will be pushed trough to the logic.
	    // -----------------------------------------------------------------------------
		gameServer.onStartup();
	}
	catch(exception) 
	{
		// -----------------------------------------------------------------------------
	    // Log any error the server might throw
	    // -----------------------------------------------------------------------------
		console.error(exception.message);
	}	
})();