export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Client Side',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/axios.client.js',
    },
    {
      src: '~/plugins/vuelidate.js',
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [

    '@nuxtjs/axios', '@nuxtjs/auth-next',

     [
        'nuxt-fontawesome', { // <font-awesome-icon :icon="['fab', 'linkedin']"/>
          imports: [
            {
              set: '@fortawesome/free-solid-svg-icons',
              icons: ['fas']
            },
            {
              set: '@fortawesome/free-regular-svg-icons',
              icons: ['far']
            },
            {
              set:'@fortawesome/free-brands-svg-icons',
              icons: ['fab']
            }
          ]
        }
     ],

     [ 'nuxt-tailvue', 
     { 
         all: true, 
        //  toast: { 
        //      defaultProps: { 
        //          timeout: 10,
        //          progress: false,
        //          classToast: 'bg-red-600'
        //      } 
        //  } 
     }
    ],
  ],

  axios: {
    baseURL: 'https://apiagent.cikatechdev.fun/api/v1'
  },
  proxy:{
    
  },

  // router: {
  //   middlware:['auth']
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
