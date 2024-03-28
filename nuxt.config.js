import tailwindTypography from '@tailwindcss/typography';

module.exports = {
  /*
  ** Headers of the page
  */
  publicRuntimeConfig: {
    shop_id: 1453, // id sklepu na vishop
    description: "ShizeBox.pl - to twoja najlepsza sieć serwerów gier!", // opis serwera
    address: "shizebox.pl",  // adres serwera
    primaryColor: "#5600D9",  // kolor główny
    gradientColor: "#6500FF",  // daj tutaj lekko jaśniejszy niż główny - kolor używany w środku gradientów,
    showProductName: true,  // czy pokazywać nazwy produktów w sklepie
    socialMedia: [  // social media serwera
      {
        "name": "Discord",
        "icon": "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg",
        "link": "https://discord.gg/mcstarbox-pl-973982725851729970"
      },
      {
        "name": "TikTok",
        "icon": "https://i.imgur.com/w8CLcAH.png",
        "link": "https://www.tiktok.com/@janeklilianek2"
      },
    ],
    administration: [  // administracja serwera, jeżeli nie chcesz to usuń ją z index.vue
      // opisy opcjonalne ale warto dać jakieś krótkie (max kilka słów) - lepiej to wygląda
      {name: "NinjaLilian3k", rank: "Właściciel", color: "#E64848", description: "Głowny właściciel serwera :)"},
      {name: "xAntiszek", rank: "Właściciel", color: "#E64848", description: "Najlepszy developer i właściciel w jednym"},
      {name: "swyzy2", rank: "Właściciel", color: "#E64848", description: "Prawa ręka właściciela"},
      {name: "pincz3u", rank: "Zarząd", color: "#FFD700", description: "Zarząd serwer ShizeBOX.pl"}
    ]
  },
  head: {
    title: 'ShizeBOX.pl - sklep',  // tytuł strony
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'ShizeBOX.pl - sklep' }  // opis strony dla wyszukiwarek i discorda
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://i.imgur.com/5PgEzLe.png' },  // ikona strony, podmień ją w folderze static
      { rel: 'stylesheet ', href: 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap'}
    ]
  },
  /*
  ** Poniższa konfiguracja jest dla bardziej zaawansowanych użytkowników, nie ma tam nic ciekawego
  */
  server: {
    host: '0.0.0.0'
  },
  css: [
    '@/assets/css/main.css'
  ],
  plugins: [
      { src: "~/plugins/price.js"}
  ],
  buildModules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    config: {
        plugins: [tailwindTypography],
        theme: {
          extend: {
            typography: {
              DEFAULT:  {
                css: {
                  color: '#ececec',
                  h1: {
                      color: '#ececec'
                  },
                  h2: {
                      color: '#ececec'
                  },
                  h3: {
                      color: '#ececec'
                  },
                  h4: {
                      color: '#ececec'
                  },
                  h5: {
                      color: '#ececec'
                  },
                  h6: {
                      color: '#ececec'
                  },
                  strong: {
                      color: '#ececec'
                  },
                  blockquote: {
                    color: '#ececec'
                  },
                  code: {
                      color: '#ececec'
                  },
                  figcaption: {
                      color: '#ececec'
                  }
                }
              }
            }
          }
        }
    }
  },
  modules: [
    "vue-toastification/nuxt"
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

