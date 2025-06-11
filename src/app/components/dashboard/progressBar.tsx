type ProgressBarProps = {
    percent: number;
  };
  
  export const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => (
    <div className="w-full bg-gray-200 h-2 rounded">
      <div
        className="bg-yellow-700 h-2 rounded transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
  