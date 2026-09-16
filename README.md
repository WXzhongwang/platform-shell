# platform-shell

企业内部平台**前端基座（微前端基建）**，React + qiankun，不含业务。

## 职责
- SSO 认证集成（token 管理，注入所有子应用）
- 主框架：全局布局（侧边菜单/顶部栏/多 Tab）、一级路由分发
- 子应用注册中心：注册表由 Nacos 动态下发（name / entry / activeRule），支持不停机上下线
- 公共能力：依赖共享（单例）、统一请求封装（全走网关）、埋点监控、沙箱隔离

## 相关仓库
platform-shared（公共包）· app-portal（首个子应用）· org-user-service（组织底座）

> 架构详见企业平台架构设计文档 v1.3（7 仓方案）