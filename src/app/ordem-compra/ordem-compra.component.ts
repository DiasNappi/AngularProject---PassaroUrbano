import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { OrdemCompraService } from "../ordem-compra.service";
import { Pedido } from "../shared/pedido.model";

@Component({
  selector: "app-ordem-compra",
  templateUrl: "./ordem-compra.component.html",
  styleUrls: ["./ordem-compra.component.css"],
  providers: [OrdemCompraService],
})
export class OrdemCompraComponent implements OnInit {
  public idPedidoCompra: number;

  public formulario: FormGroup = new FormGroup({
    endereco: new FormControl(null, [
      Validators.required,
      Validators.maxLength(120),
      Validators.minLength(3),
    ]),
    complemento: new FormControl(null),
    numero: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(1),
    ]),
    formaPagamento: new FormControl(null, [Validators.required]),
  });

  constructor(private ordemCompraService: OrdemCompraService) {}

  ngOnInit() {}

  public confirmarCompra(): void {
    if (this.formulario.status === "INVALID") {
      this.formulario.get("endereco").markAsTouched();
      this.formulario.get("numero").markAsTouched();
      this.formulario.get("formaPagamento").markAsTouched();
    } else {
      let pedido: Pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.complemento,
        this.formulario.value.numero,
        this.formulario.value.formaPagamento
      );
      this.ordemCompraService
        .efetivarCompra(pedido)
        .subscribe((idPedido: number) => {
          this.idPedidoCompra = idPedido;
          console.log(this.idPedidoCompra);
        });
    }
  }
}
