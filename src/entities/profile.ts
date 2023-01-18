import {format, parse} from 'date-fns';

interface Data {
  affiliation_date: string;
  avatar: string;
  budgets: {budget_kind: string; budget_kind_display: string; has: boolean; id: number}[];
  corporate_email: string;
  csys_registration_number: number;
  first_name: string;
  groups: [];
  hourly_rate: number;
  id: number;
  is_cooperative_member: boolean;
  last_name: string;
  name_display: string;
  position_display: {
    code: number;
    description: string;
    id: number;
    position_display: string;
    salary_range: number;
    title: string;
  };
  start_date: string;
  status: string;
  status_display: string;
  user_id: number;
}

export class Profile {
  affiliation_date!: Date;
  avatar!: string;
  budgets!: {budget_kind: string; budget_kind_display: string; has: boolean; id: number}[];
  corporate_email!: string;
  csys_registration_number!: number;
  first_name!: string;
  groups!: [];
  hourly_rate!: number;
  id!: number;
  is_cooperative_member!: boolean;
  last_name!: string;
  name_display!: string;
  position_display!: {
    code: number;
    description: string;
    id: number;
    position_display: string;
    salary_range: number;
    title: string;
  };
  start_date!: Date;
  status!: string;
  status_display!: string;
  user_id!: number;

  constructor(data: Data | undefined = undefined) {
    if (data) {
      this.affiliation_date = parse(data.affiliation_date, 'yyyy-MM-dd', new Date());
      this.avatar = data.avatar;
      this.budgets = data.budgets;
      this.corporate_email = data.corporate_email;
      this.csys_registration_number = data.csys_registration_number;
      this.first_name = data.first_name;
      this.groups = data.groups;
      this.hourly_rate = data.hourly_rate;
      this.id = data.id;
      this.is_cooperative_member = data.is_cooperative_member;
      this.last_name = data.last_name;
      this.name_display = data.name_display;
      this.position_display = data.position_display;
      this.start_date = parse(data.start_date, 'yyyy-MM-dd', new Date());
      this.status = data.status;
      this.status_display = data.status_display;
      this.user_id = data.user_id;
    }
  }

  get start_date_formated(): string {
    if (this.start_date) {
      return format(this.start_date, 'dd/MM/yyyy');
    }
    return '';
  }

  get affiliation_date_formated(): string {
    if (this.affiliation_date) {
      return format(this.affiliation_date, 'dd/MM/yyyy');
    }
    return '';
  }

  get hourly_rate_formated(): string {
    if (this.hourly_rate) {
      return this.hourly_rate.toString().replace('.', ',');
    }
    return '';
  }
}
