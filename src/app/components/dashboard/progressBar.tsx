type ProgressBarProps = {
    percent: number;
  };
  
  export const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => (
    <div className="w-[453px] h-[66px] py-[12px] border-t border-[#CECECE] flex flex-col justify-center space-y-[8px] mt-2">
      <div className="text-sm font-medium text-gray-700">{percent}% Complete</div>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="bg-yellow-700 h-3 rounded transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
  