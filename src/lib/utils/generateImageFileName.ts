export function generateImageFileName(name: string) {
	const ext = name.split('.')[name.split('.').length - 1];
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let counter = 0;
	let result = '';
	while (counter < name.length) {
		result += characters.charAt(Math.floor(Math.random() * name.length));
		counter += 1;
	}
	return result + ext;
}
