import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	base: '/dev-doodles/',
	envPrefix: 'APP_',
	plugins: [react()],
});
