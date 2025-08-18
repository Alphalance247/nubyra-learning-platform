type Tab = {
    label: string;
    count: number;
  };
  
  type TabsProps = {
    selected: string;
    onSelect: (tab: string) => void;
    tabs: Tab[];
  };
  
  export const Tabs: React.FC<TabsProps> = ({ selected, onSelect, tabs }) => {
    return (
      <div className="flex space-x-4 mt-4 mb-5">
        {tabs.map(({ label, count }) => {
          const isActive = selected === label;
          return (
            <button
              key={label}
              onClick={() => onSelect(label)}
              className={`flex items-center justify-center w-full h-[56px] px-3 py-2 gap-1 
                text-sm font-medium rounded-[12px] transition-colors cursor-pointer
                ${isActive 
                  ? 'bg-[#D6C8BA] text-black'
                  : 'bg-gray-100 text-gray-600'
                }`}
            >
              <div className="flex items-center justify-center gap-1">
                <span>{label}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  isActive ? 'bg-white text-black' : 'bg-gray-300 text-gray-700'
                }`}>
                  {count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    );
  };
  