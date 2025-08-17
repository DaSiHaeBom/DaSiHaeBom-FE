// CheckIcon.tsx
import React from 'react';

type CheckIconProps = React.SVGProps<SVGSVGElement> & {
  /** 바탕 원 색상 */
  circleColor?: string;
  /** 체크 표시 색상 */
  checkColor?: string;
  /** width/height를 한 번에 지정 */
  size?: number;
};

const CheckIcon: React.FC<CheckIconProps> = ({
  circleColor = '#F8F3F0',
  checkColor = '#FF6B01',
  width,
  height,
  size,
  ...rest
}) => {
  const computedWidth = size ?? width ?? 100;
  const computedHeight = size ?? height ?? 100;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={computedWidth}
      height={computedHeight}
      viewBox="0 0 100 100"
      fill="none"
      {...rest}
    >
      <circle cx="50" cy="50" r="50" fill={circleColor} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M79.6602 25.8686C80.4497 26.5144 80.9503 27.4473 81.052 28.4622C81.1537 29.477 80.8482 30.4907 80.2026 31.2803L45.5862 73.5892C45.246 74.0051 44.8224 74.3451 44.3427 74.5873C43.863 74.8294 43.3379 74.9684 42.8012 74.9952C42.2645 75.022 41.7282 74.9361 41.2268 74.743C40.7253 74.5498 40.2699 74.2537 39.8899 73.8738L20.6586 54.6425C20.2912 54.2877 19.9982 53.8633 19.7966 53.394C19.5951 52.9248 19.489 52.4201 19.4845 51.9094C19.4801 51.3987 19.5774 50.8922 19.7708 50.4195C19.9642 49.9468 20.2498 49.5174 20.6109 49.1562C20.9721 48.7951 21.4015 48.5095 21.8742 48.3161C22.3469 48.1227 22.8534 48.0254 23.3641 48.0298C23.8748 48.0343 24.3795 48.1404 24.8487 48.3419C25.318 48.5435 25.7424 48.8365 26.0972 49.2039L42.3246 65.4313L74.2486 26.411C74.8943 25.6215 75.8273 25.1209 76.8421 25.0192C77.857 24.9175 78.8707 25.223 79.6602 25.8686Z"
        fill={checkColor}
      />
    </svg>
  );
};

export default React.memo(CheckIcon);
