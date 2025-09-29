import { Search, Calendar, Filter, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  showSuccessfulOnly: boolean;
  setShowSuccessfulOnly: (show: boolean) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
  availableYears: string[];
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedYear,
  setSelectedYear,
  showSuccessfulOnly,
  setShowSuccessfulOnly,
  showFavoritesOnly,
  setShowFavoritesOnly,
  availableYears
}) => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 rounded-full" />
            <Input
              placeholder="Search by mission name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Year Filter */}
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-40" data-testid="year-select">
                  <SelectValue placeholder="All years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All years</SelectItem>
                  {availableYears.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>


            </div>

            {/* Success Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Switch
                id="successful-only"
                checked={showSuccessfulOnly}
                onCheckedChange={setShowSuccessfulOnly}
              />
              <Label htmlFor="successful-only" className="text-sm">
                Successful only
              </Label>
            </div>

            {/* Favorites Filter */}
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <Switch
                id="favorites-only"
                checked={showFavoritesOnly}
                onCheckedChange={setShowFavoritesOnly}
              />
              <Label htmlFor="favorites-only" className="text-sm">
                Show favorites
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};