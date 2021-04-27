//Creates an object that allows logging with multiple loggers through the "log"
//command. The parameters are not necessary, and will default to using a single
//console logger with an Info level. More loggers can be added manually.
function LogSystem(minLevel, logger)
{
	var myself = this;

	this.loggers = [];

	this.addLogger = function(logger, minLevel)
	{
		minLevel = minLevel || LogSystem.InfoLevel;
		logger = logger || LogSystem.ConsoleLogger;
		myself.loggers.push({ "minLevel" : minLevel, "logger" : logger});
	};

	this.addLogger(logger, minLevel);

	this.log = function(message, level)
	{
		level = level || LogSystem.InfoLevel;
		for(var i = 0; i < myself.loggers.length; i++)
		{
			if(myself.loggers[i].logger && level >= Number(myself.loggers[i].minLevel))
				myself.loggers[i].logger(message, level);
		}
	};
}

//Levels of log messages. All systems must use these values.
LogSystem.TraceLevel = 10;
LogSystem.DebugLevel = 20;
LogSystem.InfoLevel = 30;
LogSystem.WarningLevel = 40;
LogSystem.ErrorLevel = 50;
LogSystem.CriticalLevel = 60;

//Represents the simple console logger.
LogSystem.ConsoleLogger = function(message)
{
	if(window.console && window.console.log)
		console.log(message);
};

//Creates a logger that appends html elements to the given parent.
LogSystem.CreateWindowLogger = function(parentElement)
{
	return function(message, level)
	{
		var messageElement = document.createElement('p');
		messageElement.className = "log level" + level;
		messageElement.innerHTML = message;
		parentElement.appendChild(messageElement); 
	};
};

//Systems which don't use their own logger can simply use this one.
//Anybody can configure it.
LogSystem.RootLogger = new LogSystem();

