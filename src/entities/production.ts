interface TimelineItem {
  id: number;
  check_in: boolean;
  check_in_display: string;
  position: number;
  worktime_clock: Date;
  rectification: null;
  latitude: number;
  longitude: number;
  minimum_break: boolean;
}

interface Solicitation {
  status: 'nao_solicitado';
  status_display: 'Não solicitado(a)';
  request_type: 'hora_extra';
  request_type_display: 'Hora extra';
}

interface DayType {
  day_type: string;
  day_type_display: string;
  status: any;
  status_display: string;
}

interface Production {
  date: Date;
  production: Date;
  balance: {
    solicitation: Solicitation[];
    total_balance: '+00:35';
  };
  paid_leave: any;
  timeline: TimelineItem[];
  day_type?: DayType | null;
}

export type {Production, Solicitation, TimelineItem, DayType};
