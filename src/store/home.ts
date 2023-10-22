import { createStore } from './index';

interface Home {
	createTopic: boolean;
}

export const homeStore = createStore<Home>('home', {
	createTopic: false
});

export const toggleCreateTopicSlideOver = (open?: boolean) => {
	homeStore.update((prev) => ({
		...prev,
		createTopic: open !== undefined ? open : !prev.createTopic
	}));
};
