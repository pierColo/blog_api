import pino from "pino";
import pretty from "pino-pretty";

let stream = pretty({
	colorize: true,
	sync: true,
});
const logger = pino(
	{
		timestamp: pino.stdTimeFunctions.isoTime,
	},
	stream
);

export default logger;
