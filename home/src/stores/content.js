import { writable } from "svelte/store";

const currentTab = writable(null);
export { currentTab };
