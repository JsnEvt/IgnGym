import { HistoryDTO } from './HistoryDTO';

export type HistoryByDayDTO = {
  title: string;
  data: HistoryDTO[]
}

//houve uma separacao do em dois historicos para separar nas SECTIONS
//na construcao do componente.