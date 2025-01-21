import { Component, inject } from '@angular/core';
import { JuntaAndaluciaService } from '../../services/junta-andalucia.service';
import { IInstalacionMuseistica } from '../../interfaces/iinstalacion-museistica';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-museos-andalucia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './museos-andalucia.component.html',
  styleUrl: './museos-andalucia.component.css'
})
export class MuseosAndaluciaComponent {
  private juntaAndaluciaService = inject(JuntaAndaluciaService);
  public cargando : boolean = false;
  public museos : IInstalacionMuseistica[] = [];
  public museosFiltrados : IInstalacionMuseistica[] = [];
  public provincia : string = "";

  buscar() {
    console.log("Buscando...", this.provincia);
    if (this.provincia === "") {
      this.museosFiltrados = this.museos;
    } else {
      this.museosFiltrados = 
        this.museos.filter(museo => 
          museo.province.toUpperCase().includes(this.provincia.toUpperCase()));
    }
  }

  cargarDatos() {
    this.cargando = true;
    this.juntaAndaluciaService.getMuseos().subscribe(
      {
        next: (retorno: IInstalacionMuseistica[]) => {
          this.museos = retorno;
          this.museosFiltrados = retorno;
        },
        error: (error: HttpErrorResponse) => {
          //error es de tipo HttpErrorResponse
          console.log("Error name :" + error.name);
          console.log("Error message:" + error.message);
          console.log("Error error:" + error.error);
          console.log("Error ok:" + error.ok);
        },
        complete: () => {
          console.log("Complete");
          this.cargando = false;
        }
      });
  }

}
