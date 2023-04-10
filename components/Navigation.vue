<template>
  <nav class="col-span-full flex items-center justify-between">
    <a data-cy="homeButton" class="branding cursor-pointer" @click="$router.push('/')">
      <img src="../assets/imgs/logo.svg" alt="" />
    </a>
    <div class="justify-items-end">
      <ul class="flex gap-4 ">
        <button id="theme-toggle" @click="mode" data-cy="light/dark" data-tooltip-target="tooltip-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
          <svg id="theme-toggle-dark-icon" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
          <svg id="theme-toggle-light-icon" class="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  data () {
    return {
      scrollPosition: null,
      mobile: false,
      mobileNav: null,
      windowWidth: null,
    }
  },
  methods: {
    mode () {
      var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
      var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
      if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          themeToggleLightIcon.classList.remove('hidden');
      } else {
          themeToggleDarkIcon.classList.remove('hidden');
      }
      var themeToggleBtn = document.getElementById('theme-toggle');
      themeToggleBtn.addEventListener('click', function() {
          // toggle icons inside button
          themeToggleDarkIcon.classList.toggle('hidden');
          themeToggleLightIcon.classList.toggle('hidden');
          // if set via local storage previously
          if (localStorage.getItem('color-theme')) {
              if (localStorage.getItem('color-theme') === 'light') {
                  document.documentElement.classList.add('dark');
                  localStorage.setItem('color-theme', 'dark');
              } else {
                  document.documentElement.classList.remove('dark');
                  localStorage.setItem('color-theme', 'light');
              }
          // if NOT set via local storage previously
          } else {
              if (document.documentElement.classList.contains('dark')) {
                  document.documentElement.classList.remove('dark');
                  localStorage.setItem('color-theme', 'light');
              } else {
                  document.documentElement.classList.add('dark');
                  localStorage.setItem('color-theme', 'dark');
              }
          }
          
      });
    }
  }
};
</script>

<style lang="scss">
  header{
    background-color: #FFFEFC;
    z-index: 99;
    padding: 0px 64px;
    width: 100%;
    position: fixed;
    transition: .5s ease all;
    color: #111111;
    display: block;
    nav: {
      position: relative;
      display: flex;
      flex-direction: row;
      padding: 12px 0;
      transition: .5s ease all;
      width: 90%;
      margin: 0 auto;
      // @media (min-width: 1140px) {
      //   max-width: 1140px;
      // }
    } 
    ul, .link {
      font-weight: 500;
      color: #111111;
      list-style: none;
      text-decoration: none;
    }
    li {
      text-transform: uppercase;
      padding: 8px;
      font-size: 14px;
    }
    .link {
      font-size: 14px;
      transition: .5s ease all;
      padding-bottom: 4px;
      border-bottom: 1px solid transition;
    }
    &:hover {
      color: green;
      border-color: orangered;
    }
    
    // .branding {
    //   display: flex;
    //   margin-top: 32px;
    //   align-items: center;
    //   img {
    //     width: 50 px;
    //     transition: .5s ease all;
    //   }
    // }
    .navigation {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }
    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;
      i {
        cursor: pointer;
        font-size: 24px;
        transition: .5s ease all;
      }
    }
    .icon-active{
      transform: rotate(90deg);
    }
  }
</style>