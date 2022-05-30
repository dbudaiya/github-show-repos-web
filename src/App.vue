<template>
  <n-message-provider closable max="4" placement="top-left" >
    <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
      <router-view />
      <Footer />
    </main>
  </n-message-provider>
</template>
