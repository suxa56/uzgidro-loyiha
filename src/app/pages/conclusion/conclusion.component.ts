import { Component } from '@angular/core';

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.scss']
})
export class ConclusionComponent {
  projects = [
    {gruffNumber: 1,
      archiveNumber: 1,
      executor: 'Ma\'rufov Ma\'ruf',
      date: new Date(2023, 9, 11),
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum, nunc at scelerisque viverra, sem erat ultrices ex, quis imperdiet augue purus non risus. Proin vulputate finibus risus vitae eleifend. Ut eu ipsum ac tellus facilisis dapibus. Duis bibendum cursus ante, at accumsan lorem porta in. Praesent gravida, augue quis finibus tempus, diam nisi faucibus nisi, eu venenatis elit turpis a justo. Morbi suscipit ut est at posuere. Mauris vitae arcu eget nibh fermentum scelerisque. Quisque rhoncus at metus vitae convallis. Vivamus molestie semper diam quis vulputate. Duis placerat maximus ex id ornare. Donec malesuada mollis leo ut commodo. Sed vitae turpis in augue gravida consectetur eu vel velit. Ut ut tellus quis urna tincidunt viverra.'},
    {gruffNumber: 2,
      archiveNumber: 2,
      executor: 'Azamatov Azamat',
      date: new Date(2023, 9, 12),
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum, nunc at scelerisque viverra, sem erat ultrices ex, quis imperdiet augue purus non risus. Proin vulputate finibus risus vitae eleifend. Ut eu ipsum ac tellus facilisis dapibus. Duis bibendum cursus ante, at accumsan lorem porta in. Praesent gravida, augue quis finibus tempus, diam nisi faucibus nisi, eu venenatis elit turpis a justo. Morbi suscipit ut est at posuere. Mauris vitae arcu eget nibh fermentum scelerisque. Quisque rhoncus at metus vitae convallis. Vivamus molestie semper diam quis vulputate. Duis placerat maximus ex id ornare. Donec malesuada mollis leo ut commodo. Sed vitae turpis in augue gravida consectetur eu vel velit. Ut ut tellus quis urna tincidunt viverra.'},
    {gruffNumber: 3,
      archiveNumber: 3,
      executor: 'Nishonov Nishon',
      date: new Date(2023, 9, 13),
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum, nunc at scelerisque viverra, sem erat ultrices ex, quis imperdiet augue purus non risus. Proin vulputate finibus risus vitae eleifend. Ut eu ipsum ac tellus facilisis dapibus. Duis bibendum cursus ante, at accumsan lorem porta in. Praesent gravida, augue quis finibus tempus, diam nisi faucibus nisi, eu venenatis elit turpis a justo. Morbi suscipit ut est at posuere. Mauris vitae arcu eget nibh fermentum scelerisque. Quisque rhoncus at metus vitae convallis. Vivamus molestie semper diam quis vulputate. Duis placerat maximus ex id ornare. Donec malesuada mollis leo ut commodo. Sed vitae turpis in augue gravida consectetur eu vel velit. Ut ut tellus quis urna tincidunt viverra.'},
    {gruffNumber: 4,
      archiveNumber: 4,
      executor: 'Temurov Temur',
      date: new Date(2023, 9, 15),
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum, nunc at scelerisque viverra, sem erat ultrices ex, quis imperdiet augue purus non risus. Proin vulputate finibus risus vitae eleifend. Ut eu ipsum ac tellus facilisis dapibus. Duis bibendum cursus ante, at accumsan lorem porta in. Praesent gravida, augue quis finibus tempus, diam nisi faucibus nisi, eu venenatis elit turpis a justo. Morbi suscipit ut est at posuere. Mauris vitae arcu eget nibh fermentum scelerisque. Quisque rhoncus at metus vitae convallis. Vivamus molestie semper diam quis vulputate. Duis placerat maximus ex id ornare. Donec malesuada mollis leo ut commodo. Sed vitae turpis in augue gravida consectetur eu vel velit. Ut ut tellus quis urna tincidunt viverra.'},
    {gruffNumber: 5,
      archiveNumber: 5,
      executor: 'Umarov Umar',
      date: new Date(2023, 9, 20),
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum, nunc at scelerisque viverra, sem erat ultrices ex, quis imperdiet augue purus non risus. Proin vulputate finibus risus vitae eleifend. Ut eu ipsum ac tellus facilisis dapibus. Duis bibendum cursus ante, at accumsan lorem porta in. Praesent gravida, augue quis finibus tempus, diam nisi faucibus nisi, eu venenatis elit turpis a justo. Morbi suscipit ut est at posuere. Mauris vitae arcu eget nibh fermentum scelerisque. Quisque rhoncus at metus vitae convallis. Vivamus molestie semper diam quis vulputate. Duis placerat maximus ex id ornare. Donec malesuada mollis leo ut commodo. Sed vitae turpis in augue gravida consectetur eu vel velit. Ut ut tellus quis urna tincidunt viverra.'}
  ]
}
