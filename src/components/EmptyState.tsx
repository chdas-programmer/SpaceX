import { Search, Star, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  type: 'search' | 'favorites' | 'error';
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, message }) => {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <Search className="h-12 w-12 text-muted-foreground" />;
      case 'favorites':
        return <Star className="h-12 w-12 text-muted-foreground" />;
      default:
        return <Rocket className="h-12 w-12 text-muted-foreground" />;
    }
  };

  const getMessage = () => {
    if (message) return message;
    
    switch (type) {
      case 'search':
        return 'No missions found matching your search criteria.';
      case 'favorites':
        return 'No favorite missions yet. Star some missions to see them here!';
      default:
        return 'No missions available.';
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        {getIcon()}
        <h3 className="mt-4 text-lg font-semibold">No Results</h3>
        <p className="mt-2 text-muted-foreground">{getMessage()}</p>
      </CardContent>
    </Card>
  );
};