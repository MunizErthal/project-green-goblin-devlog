import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importa o locale em português

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string | Date, locale: string): string {
    // Define o locale com base no parâmetro recebido
    moment.locale(locale === 'pt' ? 'pt-br' : 'en');

    const data = moment(value);
    const agora = moment();

    if (agora.diff(data, 'months') < 1) {
      return data.fromNow(); // Ex: "3 dias atrás" (PT) ou "3 days ago" (EN)
    }

    return locale === 'pt' ? data.format('DD/MM/YYYY') : data.format('MM/DD/YYYY'); // Ajuste no formato da data
  }
}