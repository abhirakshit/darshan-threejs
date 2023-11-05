import { NuxtAwesomeAppConfig } from './app.config'

export default defineNuxtSchema({
  appConfig: {
    awesome: {
      name: 'Darshan',
      description:
        '',
      project: {
        links: {
          github: 'https://github.com/abhirakshit/darshan-threejs',
        },
      },
      layout: {
        page: {
          navbar: {
            menus: [],
          },
        },
        footer: {
          year: 2023,
        },
        welcome: {
          title: 'Darshan Astro',
          disableInfoReplaceIndexInWelcomePage: true,
        },
      },
      author: {
        name: 'Abhishek Rakshit',
        links: {
          github: 'https://github.com/abhirakshit/',
          // medium: 'https://viandwi24.medium.com',
          // website: 'https://viandwi24.site',
        },
      },
    } as NuxtAwesomeAppConfig,
  },
})
