export default defineAppConfig({
  arch: {
    general: {
      locale: 'en',
      title: 'Arch',
      image: 'https://raw.githubusercontent.com/arashsheyda/arch/main/.playground/public/cover.jpg',
      description: 'Arash Sheyda\'s Personal Website',
      keywords: 'Arash Sheyda, Nuxt Arch, personal website',
      favicon: 'https://raw.githubusercontent.com/arashsheyda/arch/main/.playground/public/favicon.ico',
      themeColor: '#ffffff',
      sponsor: 'https://github.com/sponsors/arashsheyda',
    },
    // banner: false,
    banner: {
      image: 'https://raw.githubusercontent.com/arashsheyda/arch/main/.playground/public/images/banner.jpg',
    },
    aside: {
      name: 'Arash Sheyda',
      job: 'Software Developer',
      image: 'https://raw.githubusercontent.com/arashsheyda/arch/main/.playground/public/images/logo.jpg',
      imageHover: 'https://raw.githubusercontent.com/arashsheyda/arch/main/.playground/public/images/logo-hover.jpg',
      email: 'arashi.sheyda@gmail.com',
      company: '@',
      phone: '(587) 447 99 57',
      location: 'Canada',
    },
    footer: {
      copyright: {
        name: 'Arash Sheyda',
      },
      links: [
        // {
        //   title: 'Uses',
        //   url: '/uses',
        // },
        {
          title: 'Goals',
          url: '/goals',
          icon: '🎯',
        },
      ],
      poweredBy: true,
    },
    socials: [
      {
        title: 'Github',
        icon: 'uil:github',
        url: 'https://github.com/arashsheyda',
        color: '#000000',
        target: '_blank',
      },
      {
        title: 'Instgaram',
        icon: 'uil:instagram',
        url: 'https://www.instagram.com/arash.sheyda',
        color: '#e4405f',
        target: '_blank',
      },
      {
        title: 'Twitter',
        icon: 'uil:twitter',
        url: 'https://twitter.com/arash_sheyda',
        color: '#1da1f2',
        target: '_blank',
      },
      {
        title: 'LinkedIn',
        icon: 'uil:linkedin',
        url: 'https://www.linkedin.com/in/arash-sheyda/',
        color: '#0a66c2',
        target: '_blank',
      },
    ],
  },
})
