interface MapCardProps {
  title: string;
  location: string;
  department: string;
  handler: string;
  backgroundImage: string;
}

export function MapCard({ title, location, department, handler, backgroundImage }: MapCardProps) {
  return (
    <div className="col-span-3 row-span-2 @container">
      <div 
        className="bg-cover bg-center flex min-h-full flex-1 flex-col justify-between p-6 rounded-2xl"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      >
        <div className="flex justify-between items-start">
          <div className="bg-background-alt rounded-lg shadow-md p-4 w-96">
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <div className="flex items-center text-sm text-text-secondary mb-4">
              <span className="material-symbols-outlined text-status-error mr-2">location_on</span>
              <span>{location}</span>
            </div>
            <div className="flex items-center text-sm text-text-secondary mb-4">
              <span className="material-symbols-outlined text-status-info mr-2">apartment</span>
              <span>Assigned to: {department}</span>
            </div>
            <div className="flex items-center text-sm text-text-secondary">
              <span className="material-symbols-outlined text-status-success mr-2">person</span>
              <span>Handler: {handler}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="flex size-10 items-center justify-center rounded-lg bg-background-alt shadow-md hover:shadow-lg transition-shadow">
              <span className="material-symbols-outlined">add</span>
            </button>
            <button className="flex size-10 items-center justify-center rounded-lg bg-background-alt shadow-md hover:shadow-lg transition-shadow">
              <span className="material-symbols-outlined">remove</span>
            </button>
            <button className="flex size-10 items-center justify-center rounded-lg bg-background-alt shadow-md hover:shadow-lg transition-shadow mt-2">
              <span className="material-symbols-outlined">navigation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}