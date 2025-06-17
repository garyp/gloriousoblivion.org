// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.gloriousoblivion.org',
  trailingSlash: "always",
  integrations: [mdx(), sitemap()],

  redirects: {
    '/feeds/posts/default': '/blog/atom.xml',
    '/feeds/posts/default?alt=rss': '/blog/rss.xml',
    '/2009/12/t-mobile-g1-requires-data-to-make-calls': '/blog/2009/12/t-mobile-g1-requires-data-to-make-calls',
    '/2010/03/distributed-version-control-syste': '/blog/2010/03/distributed-version-control-syste',
    '/2010/02/nexus-one-hardware-key-shortcuts': '/blog/2010/02/nexus-one-hardware-key-shortcuts',
    '/2007/07/kid-nation': '/blog/2007/07/kid-nation',
    '/2008/12/creating-myopenidcom-ssl-certificate-to': '/blog/2008/12/creating-myopenidcom-ssl-certificate-to',
    '/2007/10/6to4-ipv6-on-osx-104-is-no-go': '/blog/2007/10/6to4-ipv6-on-osx-104-is-no-go',
    '/2009/06/numbers-everyone-should-know': '/blog/2009/06/numbers-everyone-should-know',
    '/2010/01/getting-gnome-to-recognize-your-nexus': '/blog/2010/01/getting-gnome-to-recognize-your-nexus',
    '/2010/03/running-windows-production-activation': '/blog/2010/03/running-windows-production-activation',
    '/2008/02/nokia-e51-os-x-t-mobile': '/blog/2008/02/nokia-e51-os-x-t-mobile',
    '/2010/12/running-dell-omsa-63-under-debian-lenny': '/blog/2010/12/running-dell-omsa-63-under-debian-lenny',
    '/2009/05/getting-out-of-full-screen-citrix': '/blog/2009/05/getting-out-of-full-screen-citrix',
    '/2011/03/running-dell-omsa-65-under-debian-lenny': '/blog/2011/03/running-dell-omsa-65-under-debian-lenny',
    '/2010/05/t-mobile-and-800-numbers': '/blog/2010/05/t-mobile-and-800-numbers',
    '/2008/03/flying-in-europe': '/blog/2008/03/flying-in-europe',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
