import { defineConfig } from 'vitepress'

import { quickstartSidebar, referenceSidebar, guidesSidebar, conceptsSidebar } from './sidebars'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cyware",
  titleTemplate: "Documentation",
  description: "Official Cyware Documentation",

  srcDir: 'src',
  appearance: "force-dark",
  sitemap: {
    hostname: "https://docs.cyware.khulnasoft.com"
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ["script", { "data-api": "/stats/event", src: "/stats/script.js", "defer":"", "data-domain":"docs.cyware.khulnasoft.com" }]
  ],
  ignoreDeadLinks: "localhostLinks",

  themeConfig: {
    logo: {
      src: '/logo.png',
      "no-shadow": true,
    },

    search: {
      provider: 'local',
    },

    nav: [
      { text: 'Quickstart', link: '/quickstart/' },
      { text: 'Guides', link: '/guides/' },
      { text: 'Reference', link: '/reference/' },
      { text: 'Concepts', link: '/concepts/' },
      { text: 'FAQ', link: '/faq' },
      { text: "Report a Bug", link: "/report_bug" }
    ],

    sidebar: {
        '/quickstart/': quickstartSidebar,
        '/reference/': referenceSidebar,
        '/guides/': guidesSidebar,
        '/concepts/': conceptsSidebar,
    },

    socialLinks: [
      { icon: 'discord', link: 'https://links.cyware.khulnasoft.com/discord' },
      { icon: 'twitter', link: 'https://twitter.com/cywareio' },
      { icon: 'github', link: 'https://github.com/cyware/cyware' },
    ]
  }
})
