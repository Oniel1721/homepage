import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import aptsInterface from 'src/app/interfaces/apts';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {



  apts: aptsInterface[] = [
    {img: '../../../assets/apt-img/links.png', name: "Links", action: ()=>{console.log('asdf')} },
    {img: '../../../assets/apt-img/heart.png', name: "Heart" },
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ]


  draggingElement = null
  indexOfDraggingElement = -1
  children: any = null
  footerText: string = ''




  constructor() { }

  onDrop(e: any) {
    this.setChildren()

    let target = e.target


    if (e.target.className.includes('apt-img')) {
      target = target.parentNode
    }

    let indexOfTarget = this.children.indexOf(target)

    if (indexOfTarget !== -1) {
      let auxiliar = this.apts[this.indexOfDraggingElement]
      this.apts[this.indexOfDraggingElement] = this.apts[indexOfTarget]
      this.apts[indexOfTarget] = auxiliar
    }
    document.querySelector('.dragging')?.classList.remove('dragging')
    document.querySelectorAll('.dragging-over').forEach(el=>el?.classList.remove('dragging-over'))
  }

  private isMouseInside(clientX: number, clientY: number, el: any) {
    let { x, y, height, width } = el.getBoundingClientRect()
    if (el !== this.draggingElement) {
      if ((clientX > x && clientX < x + width) && (clientY > y && clientY < y + height)) {
        return true
      }
    }
    return false
  }

  private getElementWhichIsDraggingOver(clientX: number | any, clientY: number | any) {
    this.setChildren()
    let elementWhichIsDraggingOver: any = null
    this.children.forEach((el: any) => {
      if (!elementWhichIsDraggingOver) {
        if (this.isMouseInside(clientX, clientY, el)) elementWhichIsDraggingOver = el
        el.classList.remove('dragging-over')
      }
    })
    return elementWhichIsDraggingOver
  }

  onDragOver(e: any) {
    e.preventDefault()
    const element = this.getElementWhichIsDraggingOver(e.clientX, e.clientY)
    element?.classList.add('dragging-over')
    // console.log(e)
  }

  onDragStart(e: any) {
    if (e.target.children.length === 0) {
      e.preventDefault()
    }
    else {
      this.setChildren()
      this.draggingElement = e.target
      this.indexOfDraggingElement = this.children.indexOf(e.target)
      e.target.classList.add('dragging')
    }
  }

  onDragEnd(e: any) {
    e.target.classList.remove('dragging')
    this.draggingElement = null
  }

  onMouseOver(e:any){
    this.footerText = e.target.alt
  }

  onMouseOut(e:any){
    this.footerText = ''
  }

  aptDefaultAction(e:any){
    let target = e.target
    if(target.className.includes('apt-img')) target = target.parentNode
    if(target.children.length>0){
      this.footerText += ' does not have action' 
    }
  }

  setChildren() {
    const $homepage: any = document.getElementById("homepage")?.children
    this.children = Array.from($homepage)
    this.children.pop()
  }

  ngOnInit(): void {
    this.setChildren()
  }
}
