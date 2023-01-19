import {Batida} from './batida';

class Ponto {
  private listaBatidas: Array<Batida>;

  constructor(batidas: Array<Batida>) {
    this.listaBatidas = batidas;
  }

  get batidas(): Array<Batida> {
    return this.listaBatidas;
  }

  public baterPonto(pausa: boolean = false): void {
    const newBatida: Batida = {
      id: this.listaBatidas.length + 1,
      check_in: true,
      check_in_display: 'teste',
      latitude: 0,
      longitude: 0,
      minimum_break: pausa,
      position: 99,
      rectification: {status: '', status_display: ''},
      worktime_clock: new Date(),
    };
    this.listaBatidas.push(newBatida);
  }

  public addPonto(batida: Batida): void {
    this.listaBatidas.unshift(batida);
  }

  public limparPontos(): void {
    this.listaBatidas = [];
  }
}

export {Ponto};
