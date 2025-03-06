
const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500 mb-4"></div>
      <p className="text-muted-foreground">Loading donations...</p>
    </div>
  );
};

export default LoadingState;
