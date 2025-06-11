type TabsProps = {
    selected: string;
    onSelect: (tab: string) => void;
  };
  
  const tabLabels = ["Registered Course", "Completed Course", "Postponed Course"];
  
  export const Tabs: React.FC<TabsProps> = ({ selected, onSelect }) => (
    <div className="flex space-x-4 mt-4">
      {tabLabels.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className={`px-4 py-2 rounded ${
            selected === tab ? "bg-yellow-700 text-white" : "bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
  