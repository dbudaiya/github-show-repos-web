import $axios from "~/utils/axios.request";
/**
 * 获取用户所有仓库 | 根据用户名获取所有仓库
 * @param userName 用户名
 */

export const userRepos = (userName: any) => {
  return $axios.request({
    url: `/${userName}/repos`,
    method: "get"
  });
};

