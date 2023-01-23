interface Batida {
  id: number;
  check_in: boolean;
  check_in_display: string;
  position: number;
  worktime_clock: Date;
  latitude: number;
  longitude: number;
  minimum_break: boolean;
  rectification?: {
    status: string;
    status_display: string;
  };
}

interface Working {
  had_minimum_break: boolean;
  timeline: Batida[];
  worked: string;
  working: boolean;
}

export type {Batida, Working};
