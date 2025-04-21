import { Component } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import { LoaderComponent } from '../../component/loader/loader.component';

@Component({
  selector: 'app-orders',
  imports: [FooterComponent,LoaderComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  isLoaded: boolean = false;
  tableData: any;
  option: string = 'orders';

  onOption(option: string) {
    this.option = option;
  }

}
