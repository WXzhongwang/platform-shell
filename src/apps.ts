/**
 * 子应用注册表。
 * 骨架阶段为静态默认值；生产环境由 Nacos 配置中心动态下发（支持不停机上下线），
 * 本文件仅保留兜底配置与类型定义。
 */
export interface MicroAppEntry {
  /** 子应用名（与 package name 一致） */
  name: string;
  /** 子应用访问地址（dev/prod 环境不同） */
  entry: string;
  /** 激活路由前缀 */
  activeRule: string;
  /** 挂载容器 id */
  container: string;
}

const DEV_PORTAL_ENTRY = '//localhost:8101';

export const defaultApps: MicroAppEntry[] = [
  {
    name: 'app-portal',
    entry: DEV_PORTAL_ENTRY,
    activeRule: '/portal',
    container: '#subapp-container',
  },
];

/**
 * TODO: 启动时调用 auth-service/org-user-service 拉取
 * 「按权限过滤后的注册表」（Nacos 全量注册表 × 用户菜单权限）。
 */
export async function fetchApps(): Promise<MicroAppEntry[]> {
  return defaultApps;
}
