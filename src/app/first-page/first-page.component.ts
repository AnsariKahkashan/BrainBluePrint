import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const sections = document.querySelectorAll('section');
    const nav = document.querySelector('nav');
    const navHeight = nav?.getBoundingClientRect().height || 0;

    const curPos = window.pageYOffset;

    sections.forEach(section => {
      const top = section.getBoundingClientRect().top - navHeight;
      const bottom = top + section.getBoundingClientRect().height;

      const sectionId = section.getAttribute('id');

      if (curPos >= top && curPos <= bottom) {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }
}