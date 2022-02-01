import { writable } from 'svelte/store';

export const token = writable(localStorage.getItem('jwt-drawing-puffles-access'));
export const refresh = writable(localStorage.getItem('jwt-drawing-puffles-refresh'));
