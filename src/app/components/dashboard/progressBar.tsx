type ProgressBarProps = {
  percent: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => (
  <div className="w-full max-w-lg h-auto py-3 border-t border-gray-300 flex flex-col justify-center space-y-2 mt-4">
    <div className="text-sm font-medium text-gray-700">{percent}% Complete</div>
    <div className="w-full bg-gray-200 h-2 rounded">
      <div
        className="bg-yellow-700 h-2 rounded transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);