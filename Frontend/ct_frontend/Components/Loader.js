export default function Loader() {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-offBlack p-6 rounded-lg shadow-lg animate-pulse max-w-md w-full mx-4">
            {/* Avatar and heading placeholder */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-400"></div>
              <div className="flex-1 h-6 bg-gray-400 rounded-md"></div>
            </div>
  
            {/* Large content block placeholder */}
            <div className="w-full h-48 bg-gray-400 rounded-md mb-6"></div>
  
            {/* Button placeholders */}
            <div className="grid grid-cols-3 gap-4">
              <div className="h-10 bg-gray-400 rounded-md"></div>
              <div className="h-10 bg-gray-400 rounded-md"></div>
              <div className="h-10 bg-gray-400 rounded-md"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
  