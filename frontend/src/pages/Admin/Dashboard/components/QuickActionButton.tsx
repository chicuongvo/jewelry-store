import { Link } from "react-router";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface QuickActionButtonProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  link: string;
}

export default function QuickActionButton({
  title,
  description,
  icon: Icon,
  color,
  link,
}: QuickActionButtonProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
    amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
    rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-100",
  };

  return (
    <button className="group p-4 text-left rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
      <Link to={link}>
        <div
          className={`w-10 h-10 rounded-lg ${
            colorClasses[color as keyof typeof colorClasses]
          } flex items-center justify-center mb-3`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-medium text-gray-900 group-hover:text-gray-700">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </Link>
    </button>
  );
}
