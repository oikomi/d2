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
  return (
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
        <div className="flex items-center font-medium text-[var(--color-primary)]">
          {description.includes("尽请等待") ? (
            <span>开发中...</span>
          ) : (
            <>
              <span>立即使用</span>
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
            </>
          )}
        </div>
      </div>
      {/* 简化的底部边框效果 */}
      <div
        className={`absolute right-0 bottom-0 left-0 h-0.5 ${borderColorClass} origin-left scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100`}
      ></div>
    </a>
  );
};
