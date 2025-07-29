import { LucideIcon } from 'lucide-react';

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
  const changeColorClass = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }[changeType];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${changeColorClass}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-blue-50 ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}