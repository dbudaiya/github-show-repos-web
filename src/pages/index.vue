<script setup lang="ts">
import { useMessage } from "naive-ui";
import { userRepos } from "~/api/repos";
import Item from "./item.vue";
const router = useRouter();
window.$message = useMessage();

const username = $ref("dbudaiya");
let user_repos_data = reactive([]);
let data = reactive([{ count: 1 }]);
async function getUserRepos() {
  let { data } = await userRepos(username);
  user_repos_data.push(...data);
}
onMounted(() => {
  getUserRepos();
});
const go = () => {
  if (username) router.push(`/hi/${encodeURIComponent(username)}`);
};
</script>

<template>
  <div>
    <div i-carbon:server-dns text-4xl inline-block />
    <p>
      <a
        rel="noreferrer"
        href="https://github.com/antfu/vitesse-lite"
        target="_blank"
      >
        github-show-repos
      </a>
    </p>
    <p>
      <em text-sm op75>输入用户名可查询所有公共仓库</em>
    </p>
    <div py-4 />

    <input
      id="input"
      v-model="username"
      placeholder="input search user"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    />

    <div>
      <button class="m-3 text-sm btn" :disabled="!username" @click="go">
        Go
      </button>
    </div>
    <div v-for="(item, key) in user_repos_data" :key="key">
      <Item :data="item" />
    </div>
  </div>
</template>
