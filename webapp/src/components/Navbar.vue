<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 4/1/21, 9:09 AM
  -->

<template>
  <aside>
    <nav class="sidenavbar">
      <ul class="sidenavbar-nav">
        <li class="logo">
          <a href="#" class="sidenav-link">
            <i class="fas fa-book"></i>
            <span class="link-text">OpenClass</span>
          </a>
        </li>
        <li class="sidenav-item">
          <router-link class="sidenav-link" to="/tasks">
            <i class="fas fa-book"></i>
            <span class="link-text">{{ $t('tasks.title') }}</span>
          </router-link>
        </li>
        <li class="sidenav-item">
          <router-link class="sidenav-link" to="/classes">
            <i class="fas fa-graduation-cap"></i>
            <span class="link-text">{{ $t('classes.title') }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>

.sidenavbar {
  position: fixed;
  @apply bg-gray-300 dark:bg-gray-800 transition-all;
}

.sidenavbar-nav {
  @apply list-none p-0 m-0 flex flex-col items-center h-full;
}

.sidenav-item {
  @apply w-full
}

.sidenav-item:last-child {
  @apply mt-auto
}

.sidenav-link {
  @apply
  flex
  items-center
  h-20
  bg-gray-300
  dark:bg-gray-800
  no-underline
  transition
  w-full
  sm:justify-center;
  filter: grayscale(100%) opacity(.7);
}

.sidenav-link:hover, .sidenav-link.router-link-active {
  @apply bg-gray-200 dark:bg-gray-700;
  filter: grayscale(0%) opacity(1);
}

.link-text {
  @apply hidden whitespace-nowrap overflow-hidden;
}

.sidenav-link i {
  min-width: 4rem;
  font-size: 2rem;
  @apply text-center;
}

.logo {
  font-size: 1.5rem;
  letter-spacing: .2ch;
  text-align: center;
  @apply font-bold uppercase text-center text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 w-full;
}

.logo i  {
  transform: rotate(0deg);
  transition: transform 300ms;
}

.sidenavbar:hover .logo i {
  transform: rotate(360deg);
}

@media only screen and (max-width: 640px) {
  .sidenavbar {
    width: 100vw;
    @apply bottom-0 h-20;
  }

  .logo {
    @apply hidden
  }

  .sidenavbar-nav {
    @apply flex-row;
  }

  .sidenav-link {
    justify-content: center;
  }
}

@media only screen and (min-width: 640px) {
  .sidenavbar {
    height: 100vh;
    @apply top-0 w-20;
  }

  .sidenavbar:hover {
    @apply w-64;
  }

  .sidenavbar:hover .link-text {
    @apply inline transition-opacity justify-start;
  }
}

</style>