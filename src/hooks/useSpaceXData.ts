import { useState, useEffect } from 'react';
import { Launch, Rocket, LaunchWithRocket } from '../types/spacex';

const SPACEX_API_BASE = 'https://api.spacexdata.com/v4';

export const useSpaceXData = () => {
  const [launches, setLaunches] = useState<LaunchWithRocket[]>([]);
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch launches and rockets concurrently
        const [launchesResponse, rocketsResponse] = await Promise.all([
          fetch(`${SPACEX_API_BASE}/launches`),
          fetch(`${SPACEX_API_BASE}/rockets`)
        ]);

        if (!launchesResponse.ok || !rocketsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const launchesData: Launch[] = await launchesResponse.json();
        const rocketsData: Rocket[] = await rocketsResponse.json();

        // Create a rocket lookup map
        const rocketMap = new Map(rocketsData.map(rocket => [rocket.id, rocket.name]));

        // Combine launch data with rocket names
        const launchesWithRockets: LaunchWithRocket[] = launchesData.map(launch => ({
          ...launch,
          rocketName: rocketMap.get(launch.rocket) || 'Unknown Rocket'
        }));

        setLaunches(launchesWithRockets.reverse()); // Show newest first
        setRockets(rocketsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { launches, rockets, loading, error };
};