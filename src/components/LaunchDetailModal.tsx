import { ExternalLink, Calendar, Rocket, Info, Youtube, Globe } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LaunchWithRocket } from '../types/spacex';

interface LaunchDetailModalProps {
  launch: LaunchWithRocket;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LaunchDetailModal: React.FC<LaunchDetailModalProps> = ({
  launch,
  open,
  onOpenChange
}) => {
  const launchDate = new Date(launch.date_utc);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{launch.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Mission Patch */}
          <div className="flex justify-center">
            {launch.links.patch.large || launch.links.patch.small ? (
              <img
                src={launch.links.patch.large || launch.links.patch.small || ''}
                alt={`${launch.name} patch`}
                className="w-32 h-32 object-contain rounded-lg bg-muted p-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                <Rocket className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Launch Date</div>
                <div className="font-medium">
                  {launchDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="text-sm text-muted-foreground">
                  {launchDate.toLocaleTimeString('en-US', {
                    timeZoneName: 'short'
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Rocket className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Rocket</div>
                <div className="font-medium">{launch.rocketName}</div>
                <div className="text-sm text-muted-foreground">
                  Flight #{launch.flight_number}
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-center">
            <Badge
              variant={
                launch.success === true 
                  ? 'default' 
                  : launch.success === false 
                  ? 'destructive' 
                  : 'secondary'
              }
              className="text-lg px-4 py-2"
            >
              {launch.success === true 
                ? 'Mission Successful' 
                : launch.success === false 
                ? 'Mission Failed' 
                : 'Mission Status Unknown'}
            </Badge>
          </div>

          <Separator />

          {/* Mission Details */}
          {launch.details && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Info className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Mission Details</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {launch.details}
              </p>
            </div>
          )}

          {/* Links */}
          {(launch.links.wikipedia || launch.links.webcast) && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <ExternalLink className="h-5 w-5" />
                <span>External Links</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {launch.links.wikipedia && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a
                      href={launch.links.wikipedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <Globe className="h-4 w-4" />
                      <span>Wikipedia</span>
                    </a>
                  </Button>
                )}
                {launch.links.webcast && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a
                      href={launch.links.webcast}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <Youtube className="h-4 w-4" />
                      <span>Watch Launch</span>
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};