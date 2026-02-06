import React from 'react';
import { cn } from '@/lib/utils';
import { RiskLevel } from '@/types/insurance';

interface RiskScoreGaugeProps {
  score: number;
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

export const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({
  score,
  level,
  size = 'md',
  showLabel = true,
  animated = true,
}) => {
  const sizeConfig = {
    sm: { outer: 80, stroke: 8, fontSize: 'text-lg' },
    md: { outer: 120, stroke: 10, fontSize: 'text-2xl' },
    lg: { outer: 160, stroke: 12, fontSize: 'text-4xl' },
  };

  const config = sizeConfig[size];
  const radius = (config.outer - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const levelConfig = {
    low: {
      color: 'text-risk-low',
      stroke: 'stroke-risk-low',
      bg: 'stroke-risk-low/20',
      label: 'Low Risk',
    },
    medium: {
      color: 'text-risk-medium',
      stroke: 'stroke-risk-medium',
      bg: 'stroke-risk-medium/20',
      label: 'Medium Risk',
    },
    high: {
      color: 'text-risk-high',
      stroke: 'stroke-risk-high',
      bg: 'stroke-risk-high/20',
      label: 'High Risk',
    },
  };

  const currentLevel = levelConfig[level];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: config.outer, height: config.outer }}>
        <svg
          width={config.outer}
          height={config.outer}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={config.outer / 2}
            cy={config.outer / 2}
            r={radius}
            fill="none"
            strokeWidth={config.stroke}
            className={currentLevel.bg}
          />
          {/* Progress circle */}
          <circle
            cx={config.outer / 2}
            cy={config.outer / 2}
            r={radius}
            fill="none"
            strokeWidth={config.stroke}
            strokeLinecap="round"
            className={cn(currentLevel.stroke, animated && 'transition-all duration-1000 ease-out')}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: animated ? strokeDashoffset : 0,
            }}
          />
        </svg>
        {/* Score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('font-display font-bold', config.fontSize, currentLevel.color)}>
            {score}
          </span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      {showLabel && (
        <span className={cn('text-sm font-medium', currentLevel.color)}>
          {currentLevel.label}
        </span>
      )}
    </div>
  );
};
