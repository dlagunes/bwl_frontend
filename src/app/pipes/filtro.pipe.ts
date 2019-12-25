
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})

export class FiltroPipe implements PipeTransform {
  textReton: any;
  transform(
    arreglo: any[],
    texto: string,
    columna: string
  ): any[] {
    try {
      if (texto === undefined || texto === null || texto === '') {
        return arreglo;
      }
      texto = texto.toLowerCase();

      this.textReton = arreglo.filter(item => {
        return item[columna].toLowerCase().includes(texto);
      });
      return this.textReton;
    } catch (error) {
    }
  }
}
