import { CommonModule } from '@angular/common';
import { Component, Signal, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>
    {{count()}}
  </h1>
  <br>
  <button (click)="increment()">+</button>
  <br><br>
  <button (click)="decrement()">-</button>
  <hr>
  <ul>
    <li *ngFor="let r or results()">{{r}}</li>
  </ul>
  `
})
export class AppComponent {
//Signal ile değişikliği zone js den değil manuel olarak veriytoruz bubsayde butun sayfayı render etmek zorunda kalmıyoruz.angular 16 özelliğ ile signal geldi
count=signal(0); // değişiklik olan değerin onune signal yazıyoruz bu sayede anlıyor
// computed,effect
// comuted bir değişkeni bağlamaya yarar, bir değişkeni signal yaptıktan sonra o değişkenle ilgili işleri başka değişkenle bağlarız
countPlus=computed(()=>this.count()+1);
// effect ise 
countEffect=effect(()=>console.log(this.count()+"degisti"));
results=signal<string[]>([])
increment()
{
  // listeti mutate ile güncelleme 
 // this.results.mutate((oldValue)=>oldValue.push('increment'));
  // mutate bir liseyi ve ya objeyi güncelelemek için tasarlanmıştır
 // this.count.mutate((oldValue)=>oldValue+1);
  //this.count.set(0);
  //this.count.set(this.count()+1)
  // 3 tane fonskiyonu var update,mutate,set 
  this.count.update((oldValue)=>oldValue+1);
  this.results.update((oldValue)=>[...oldValue,'increment']);

}
decrement(){
this.count.update((oldValue)=>oldValue-1);
this.results.update((oldValue)=>[...oldValue,'decrement']);
}
}
