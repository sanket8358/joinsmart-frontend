import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 600,
    slidesPerView: 1,
    autoplay: true,
    coverflowEffect: {
     
      slideShadows: true,
    },
  };
  constructor() { }

  ngOnInit() { }

}
