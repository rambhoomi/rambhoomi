import { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
}

export default function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon,
  iconColor = 'text-blue-600' 
}: MetricCardProps) {
  const changeConfig = {
    positive: {
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      icon: TrendingUp
    },
    negative: {
      color: 'text-red-600',
      bg: 'bg-red-50',
      icon: TrendingDown
    },
    neutral: {
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      icon: Minus
    }
  }[changeType];

  const TrendIcon = changeConfig.icon;

  // Extract background color based on icon color
  const bgColor = iconColor.includes('blue') ? 'bg-blue-50' : 
                  iconColor.includes('green') ? 'bg-emerald-50' : 
                  iconColor.includes('yellow') ? 'bg-amber-50' : 
                  iconColor.includes('purple') ? 'bg-purple-50' : 
                  iconColor.includes('red') ? 'bg-red-50' : 'bg-gray-50';

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</p>
            <div className={`p-2.5 rounded-xl ${bgColor} group-hover:scale-110 transition-transform duration-300`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
            
            {change && (
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${changeConfig.bg} ${changeConfig.color}`}>
                <TrendIcon className="h-3 w-3 mr-1" />
                {change}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}