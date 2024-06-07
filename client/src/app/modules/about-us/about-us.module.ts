import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';

@NgModule({
  declarations: [AboutUsComponent, FaqComponent],
  imports: [CommonModule, AboutUsRoutingModule],
})
export class AboutUsModule {}
