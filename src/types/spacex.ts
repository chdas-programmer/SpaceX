export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  details: string | null;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    wikipedia: string | null;
    webcast: string | null;
  };
  rocket: string;
  flight_number: number;
}

export interface Rocket {
  id: string;
  name: string;
  description: string;
}

export interface LaunchWithRocket extends Launch {
  rocketName: string;
}