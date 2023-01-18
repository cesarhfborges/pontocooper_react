export interface Profile {
  affiliation_date: string; //'2021-02-01'
  avatar: string; // 'https://image.flaticon.com/icons/svg/747/747376.svg'
  budgets: {budget_kind: string; budget_kind_display: string; has: boolean; id: number}[];
  //   [
  //   {budget_kind: 'verba_preposto'; budget_kind_display: 'Verba preposto'; has: false; id: 2},
  //   {budget_kind: 'verba_lider'; budget_kind_display: 'Verba líder'; has: false; id: 1},
  // ];
  corporate_email: string; // 'cesar.borges@coopersystem.com.br'
  csys_registration_number: number; // 1173
  first_name: string; // 'Cesar'
  groups: []; // no data
  hourly_rate: string; // '95.68'
  id: number; // 232
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
  start_date: string; // '2021-02-08'
  status: string; // 'ativo'
  status_display: string; // 'Ativo(a)'
  user_id: number; // 232
}
