// 移除可能不存在的导入
import { ToolCard } from "@/app/_components/ToolCard";
import LeftSidebar from "@/app/_components/LeftSidebar";

export default function Home() {
  return (
    <main className="min-h-screen text-[var(--color-text)]">
      {/* 头部区域 */}
      <header className="border-opacity-50 sticky top-0 z-10 border-b border-[var(--color-primary)]/20 bg-[var(--color-bg-dark)]/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <div className="relative">
              <img
                src="/xdream-logo.svg"
                alt="XDream Logo"
                className="h-12 w-12 object-contain"
              />
              <div className="absolute -inset-1 -z-10 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-30 blur-sm"></div>
            </div>
            <h1 className="group relative text-2xl font-bold text-[var(--color-primary)]">
              XDream研发平台
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] transition-all duration-300 group-hover:w-full"></span>
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="relative">
                  首页
                </a>
              </li>
              <li>
                <a href="#" className="relative">
                  文档
                </a>
              </li>
              <li>
                <a href="#" className="relative">
                  关于我们
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* 主内容区域 - 包含左侧导航和主内容 */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* 左侧导航栏 */}
          <LeftSidebar />
          
          {/* 主要内容区域 */}
          <div className="flex-1">
            {/* 平台介绍 */}
            <section className="mb-16 text-center">
              <div className="relative inline-block">
                <h2 className="relative z-10 mb-6 text-4xl font-bold text-[var(--color-primary)]">
                  欢迎使用XDream研发平台
                </h2>
                <div className="absolute right-0 -bottom-2 left-0 h-3 rounded-full bg-[var(--color-primary)]/20 blur-xl"></div>
              </div>
              <p className="mx-auto max-w-3xl text-lg text-[var(--color-text-secondary)]">
                一站式开发工具集合，为您提供高效、便捷的研发体验。
                包含代码平台、文件服务、项目管理等多种工具，助力团队协作与项目开发。
              </p>
            </section>

            {/* 基础平台区域 */}
            <section className="mb-16">
              <div className="relative mx-auto mb-8 inline-block">
                <h3 className="relative z-10 text-center text-2xl font-semibold text-[var(--color-primary)]">
                  基础平台
                </h3>
                <div className="absolute right-0 -bottom-2 left-0 h-2 rounded-full bg-[var(--color-primary)]/30 blur-md"></div>
              </div>
              <div
                id="basic-tools-grid"
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {/* 代码平台工具卡 */}
                <ToolCard
                  title="Code平台"
                  description="在线代码管理平台，支持多人协作开发和版本控制。"
                  icon={
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  }
                  iconBgClass="bg-[var(--color-primary)]/10"
                  iconTextClass="text-[var(--color-primary)]"
                  borderColorClass="bg-[var(--color-primary)]"
                  href="http://code.xdreamdev.com/"
                />

                {/* 文件服务平台工具卡 */}
                <ToolCard
                  title="文件服务平台"
                  description="提供安全可靠的文件存储、共享和管理服务，支持多种文件格式。"
                  icon={
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  }
                  iconBgClass="bg-[var(--color-primary)]/10"
                  iconTextClass="text-[var(--color-primary)]"
                  borderColorClass="bg-[var(--color-primary)]"
                  href="http://file.xdreamdev.com/"
                />

                {/* 研发Wiki工具卡 */}
                <ToolCard
                  title="研发Wiki"
                  description="团队知识库和文档中心，支持版本管理。"
                  icon={
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  }
                  iconBgClass="bg-[var(--color-primary)]/10"
                  iconTextClass="text-[var(--color-primary)]"
                  borderColorClass="bg-[var(--color-primary)]"
                  href="https://tcnwhpxcbxef.feishu.cn/wiki/R2PvwnfWbiOPp0k3rUQck7Jzn8Z"
                />

                {/* 项目管理平台工具卡 */}
                <ToolCard
                  title="项目管理平台"
                  description="敏捷项目管理工具，支持任务跟踪、进度管理和团队协作。（尽请等待）"
                  icon={
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  }
                  iconBgClass="bg-[var(--color-primary)]/10"
                  iconTextClass="text-[var(--color-primary)]"
                  borderColorClass="bg-[var(--color-primary)]"
                  href="#"
                />

                {/* 测试平台工具卡 */}
                <ToolCard
                  title="测试平台"
                  description="自动化测试和质量管理平台，提高测试效率和软件质量。（尽请等待）"
                  icon={
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  }
                  iconBgClass="bg-[var(--color-primary)]/10"
                  iconTextClass="text-[var(--color-primary)]"
                  borderColorClass="bg-[var(--color-primary)]"
                  href="#"
                />

                {/* CI/CD平台工具卡 */}
                <ToolCard
                  title="CI/CD平台"
                  description="持续集成和持续部署平台，自动化构建、测试和部署流程。（尽请等待）"
                  icon={
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  }
                  iconBgClass="bg-[var(--color-primary)]/10"
                  iconTextClass="text-[var(--color-primary)]"
                  borderColorClass="bg-[var(--color-primary)]"
                  href="#"
                />

                {/* 监控平台工具卡 */}
                <ToolCard
                  title="监控平台"
                  description="系统监控和告警平台，实时监控应用性能和服务状态。（尽请等待）"
                  icon={
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  }
                  iconBgClass="bg-[var(--color-primary)]/10"
                  iconTextClass="text-[var(--color-primary)]"
                  borderColorClass="bg-[var(--color-primary)]"
                  href="#"
                />
              </div>
            </section>

            {/* 业务平台区域 */}
            <section className="mb-16">
              <div className="relative mx-auto mb-8 inline-block">
                <h3 className="relative z-10 text-center text-2xl font-semibold text-[var(--color-primary)]">
                  业务平台
                </h3>
                <div className="absolute right-0 -bottom-2 left-0 h-2 rounded-full bg-[var(--color-primary)]/30 blur-md"></div>
              </div>
              <div
                id="business-tools-grid"
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {/* 特征管理平台工具卡 */}
                <ToolCard
                  title="特征管理平台"
                  description="处理机器人输入数据，加工特征，作为策略决策。（尽请等待）"
                  icon={
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  }
                  iconBgClass="bg-[var(--color-primary)]/10"
                  iconTextClass="text-[var(--color-primary)]"
                  borderColorClass="bg-[var(--color-primary)]"
                  href="#"
                />

                {/* 策略管理平台工具卡 */}
                <ToolCard
                  title="策略管理平台"
                  description="业务规则和策略管理平台，支持动态策略配置和实时生效。（尽请等待）"
                  icon={
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  }
                  iconBgClass="bg-[var(--color-primary)]/10"
                  iconTextClass="text-[var(--color-primary)]"
                  borderColorClass="bg-[var(--color-primary)]"
                  href="#"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
      
      {/* 底部区域 */}
      <footer className="border-t border-[var(--color-primary)]/20 bg-[var(--color-bg-dark)]/80 py-8">
        <div className="container mx-auto px-4 text-center text-[var(--color-text-secondary)]">
          <p className="relative inline-block">
            &copy; {new Date().getFullYear()} XDream研发平台. 保留所有权利.
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--color-primary)] to-transparent transition-all duration-500 group-hover:w-full"></span>
          </p>
        </div>
      </footer>
    </main>
  );
}
