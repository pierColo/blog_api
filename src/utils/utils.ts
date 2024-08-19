export const formatResponse = ({
	status,
	message,
	data,
}: {
	status: number;
	message: string;
	data?: unknown;
}) => {
	return {
		status,
		message,
		data,
	};
};
