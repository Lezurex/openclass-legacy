<!--
  - Copyright (c) 2021 Lenny Angst. All rights reserved.
  - For more information about the license read the LICENSE file at the root of this repo.
  - Written for Project: openclass
  - Last modified: 3/30/21, 6:06 PM
  -->

<template>
  <aside>
    <nav
        class="fixed bg-gray-300 dark:bg-gray-800 transition-all sm:-bottom-0 sm:w-full sm:h-20 md:top-0 md:w-20 md:h-full sidenavbar">
      <ul class="list-none p-0 m-0 flex flex-nowrap items-center h-full sm:flex-row">
        <li class="sidenav-item">
          <router-link class="sidenav-link" to="/tasks">
            <span class="link-text">{{ $t('pages.tasks') }}</span>
            <i class="fas fa-book"></i>
          </router-link>
        </li>
        <li class="sidenav-item">
          <router-link class="sidenav-link" to="/classes">
            <span class="link-text">{{ $t('pages.tasks') }}</span>
            <i class="fas fa-book"></i>
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
  @apply hidden ml-4;
}

@media only screen and (min-width: 640px) {
  .sidenavbar {
    flex-direction: column!important;
  }

  .sidenavbar:hover {
    @apply w-64;
  }

  .sidenavbar:hover .link-text {
    @apply inline transition-opacity;
  }
}

</style>