import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InsuranceProduct } from '@/types/insurance';
import { CarIcon, HomeIcon, BusinessIcon, GadgetIcon, PlaneIcon, ShieldIcon } from './icons/InsuranceIcons';
import { cn } from '@/lib/utils';

interface InsuranceProductCardProps {
  product: InsuranceProduct;
  isSelected?: boolean;
  onClick?: () => void;
}

const iconMap = {
  motor: CarIcon,
  property: HomeIcon,
  sme: BusinessIcon,
  gadget: GadgetIcon,
  travel: PlaneIcon,
  micro: ShieldIcon,
};

const colorMap = {
  motor: 'from-blue-500 to-cyan-500',
  property: 'from-emerald-500 to-teal-500',
  sme: 'from-purple-500 to-indigo-500',
  gadget: 'from-orange-500 to-amber-500',
  travel: 'from-sky-500 to-blue-500',
  micro: 'from-pink-500 to-rose-500',
};

export const InsuranceProductCard: React.FC<InsuranceProductCardProps> = ({
  product,
  isSelected = false,
  onClick,
}) => {
  const Icon = iconMap[product.id];
  const gradientClass = colorMap[product.id];

  return (
    <Card
      variant={isSelected ? 'glass' : 'interactive'}
      className={cn(
        'cursor-pointer overflow-hidden group',
        isSelected && 'ring-2 ring-primary shadow-glow'
      )}
      onClick={onClick}
    >
      <CardContent className="p-0">
        {/* Gradient header */}
        <div className={cn('h-24 bg-gradient-to-r relative overflow-hidden', gradientClass)}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/10 rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-8 h-8 text-white" />
            </div>
          </div>
          {isSelected && (
            <div className="absolute top-3 right-3">
              <Badge variant="success" className="bg-white text-success font-semibold">
                Selected
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground">{product.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          </div>

          {/* Coverage examples */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1.5">Coverage includes:</p>
            <div className="flex flex-wrap gap-1.5">
              {product.coverageExamples.slice(0, 3).map((example, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {example}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-muted-foreground">Starting from</span>
              <div>
                <span className="font-display font-bold text-lg text-foreground">
                  ₦{product.minPremium.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">/month</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
