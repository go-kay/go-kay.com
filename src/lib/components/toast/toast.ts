import { writable } from 'svelte/store';

type ToastType = 'error' | 'warning' | 'success';

interface Toast {
	id: number;
	title?: string;
	description?: string;
	type: ToastType;
	duration: number;
	close: () => void;
}

let id = 1;
export const toasts = writable<Toast[]>([]);
export const toast = ({
	title,
	description,
	type = 'success',
	duration = 3000
}: {
	title?: string;
	description?: string;
	type?: ToastType;
	duration?: number;
}) => {
	const newToastId = id;
	id += 1;
	toasts.update((ts) => [
		{
			id: newToastId,
			title: title ?? type,
			description,
			type,
			duration,
			close: () => {
				toasts.update((ts) => ts.filter((t) => t.id !== newToastId));
			}
		},
		...ts
	]);
	setTimeout(() => {
		toasts.update((ts) => ts.filter((t) => t.id !== newToastId));
	}, duration);
};
