import React from "react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgClass: string;
  iconTextClass: string;
  borderColorClass: string;
  href: string;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon,
  iconBgClass,
  iconTextClass,
  borderColorClass,
  href,
}) => {
  // 根据是否为开发中状态决定使用a标签还是div标签
  const isDevelopment = description.includes("尽请等待");

  return (
    <>
      {isDevelopment ? (
        <div className="group relative rounded-xl border border-[var(--color-gray)]/30 bg-[var(--color-card-bg)] opacity-90 transition-colors duration-200">
          {/* 锁图标作为视觉指示器 */}
            <div className="absolute right-4 top-4 z-10 rounded-full bg-[var(--color-gray)]/20 p-1 text-[var(--color-gray)]">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          <div className="p-6">
            <div
              className={`mb-4 inline-block rounded-lg p-3 ${iconBgClass} ${iconTextClass} opacity-80`}
            >
              {icon}
            </div>
            <h3 className="mb-2 text-xl font-bold text-[var(--color-text)] opacity-80">
              {title}
            </h3>
            <p
              className="mb-4 text-[var(--color-text-secondary)] opacity-80"
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
            <div className="flex items-center font-medium">
              <span className="text-[var(--color-gray)] opacity-90">开发中</span>
            </div>
          </div>
          {/* 简化的底部边框效果 - 开发中状态不显示悬停效果 */}
          <div
              className="absolute right-0 bottom-0 left-0 h-0.5 bg-[var(--color-gray)]/30 origin-left scale-x-0 transform"
            ></div>
        </div>
      ) : (
        <a
          href={href}
          className="group relative rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-card-bg)] transition-colors duration-200 hover:bg-[var(--color-bg-light)]"
        >
          <div className="p-6">
            <div
              className={`mb-4 inline-block rounded-lg p-3 ${iconBgClass} ${iconTextClass}`}
            >
              {icon}
            </div>
            <h3 className="mb-2 text-xl font-bold text-[var(--color-text)] transition-colors duration-200 group-hover:text-[var(--color-primary)]">
              {title}
            </h3>
            <p
              className="mb-4 text-[var(--color-text-secondary)]"
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
            <div className="flex items-center font-medium">
              <span className="text-[var(--color-primary)]">立即使用</span>
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
          {/* 简化的底部边框效果 */}
          <div
            className={`absolute right-0 bottom-0 left-0 h-0.5 ${borderColorClass} origin-left scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100`}
          ></div>
        </a>
      )}
    </>
  );
};
