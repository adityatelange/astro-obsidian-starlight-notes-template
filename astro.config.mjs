// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import starlightThemeObsidian from 'starlight-theme-obsidian';
import { createStarlightObsidianPlugin } from 'starlight-obsidian';

const [vault1_StarlightObsidian, vault1_ObsidianSidebarGroup] = createStarlightObsidianPlugin()
const [vault2_StarlightObsidian, vault2_ObsidianSidebarGroup] = createStarlightObsidianPlugin()

// https://astro.build/config
export default defineConfig({
	site: 'https://adityatelange.github.io/astro-obsidian-starlight-notes-template/',
	base: '/astro-obsidian-starlight-notes-template',
	integrations: [
		starlight({
			title: 'My Notes',
			social: [
				{
					icon: 'github', label: 'GitHub', href: 'https://github.com/adityatelange/astro-obsidian-starlight-notes-template',
				}
			],
			customCss: [
				// Relative path to your custom CSS file
				'./src/styles/custom.css',
			],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				vault1_ObsidianSidebarGroup,
				vault2_ObsidianSidebarGroup
			],
			plugins: [
				// Set theme
				starlightThemeObsidian(),
				// Generate the Obsidian vault pages.
				vault1_StarlightObsidian({
					vault: 'obsidian-vaults/vault1',
					output: 'notes-vault1',
					sidebar: { label: 'Vault One', collapsedFolders: true },
				}),
				vault2_StarlightObsidian({
					vault: 'obsidian-vaults/vault2',
					output: 'notes-vault2',
					sidebar: { label: 'Vault Two', collapsedFolders: true },
				}),
			]
		}),
	],
});
