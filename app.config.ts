export default defineAppConfig({
  arch: {
    baseUrl: 'https://arashsheyda.me',
    image: '/public/cover.jpg',
    favicon: '/public/favicon.ico',
    title: 'Arash Sheyda',
    description: 'Arash Sheyda - Full Stack Developer',
    keywords: 'Arash Sheyda, Full Stack Developer',
    banner: {
      image: '/public/assets/images/banner.jpg'
    },
    info: {
      image: '/public/assets/images/logo.jpg',
      hoverImage: '/public/assets/images/logo.jpg',
      name: 'Arash Sheyda',
      job: 'Full Stack Developer',
      email: 'info@arashshyeda.com',
      phone: '+1 (732) 807-5358',
      company: '',
      location: 'Alberta, CA',
    },
    footer: {
      copyright: 'Arash Sheyda',
      links: [
        {
          title: '🎯 Goals',
          url: '/goals'
        }
      ]
    },
    socials: [
      {
        name: 'Github',
        icon: 'uil:github',
        url: 'https://github.com/arashsheyda',
        color: '#000000',
        target: '_blank'
      },
      {
        name: 'Instgaram',
        icon: 'uil:instagram',
        url: 'https://www.instagram.com/arash.sheyda',
        color: '#e4405f',
        target: '_blank'
      },
      {
        name: 'Twitter',
        icon: 'uil:twitter',
        url: 'https://twitter.com/arash_sheyda',
        color: '#1da1f2',
        target: '_blank'
      }
    ],
  }
})
