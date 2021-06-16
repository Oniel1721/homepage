import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() { }

  title="HOMEPAGE"
  date=""
  lastMinute=0

  private addZeroToDate(value:number):string{
    return `${value<10?'0':''}${value}`
  }

  private getDayOftheWeekTemplate(value:number):string{
    if(value === 0) return "SUN"
    if(value === 1) return "MON"
    if(value === 2) return "TUE"
    if(value === 3) return "WED"
    if(value === 4) return "THU"
    if(value === 5) return "FRI"
    if(value === 6) return "SAT"

    return "ERROR"
  }

  

  setDate(){
    if(new Date().getMinutes() !== this.lastMinute){
      let currentDate:Date = new Date(),
      dayOfTheWeek:number = currentDate.getDay(),
      dayOfTheMonth:number = currentDate.getDate(),
      month:number = currentDate.getMonth() + 1,
      year:number = currentDate.getFullYear(),
      hour:number = currentDate.getHours(),
      minutes:number = currentDate.getMinutes()
  
      this.lastMinute = minutes
  
      let dayOfTheWeekTemplate:string = this.getDayOftheWeekTemplate(dayOfTheWeek),
      dayOfTheMonthTemplate:string = this.addZeroToDate(dayOfTheMonth),
      monthTemplate:string = this.addZeroToDate(month),
      yearTemplate:string = year.toString(),
      hourTemplate:string = this.addZeroToDate(hour>12?hour-12:hour),
      minutesTemplate:string = this.addZeroToDate(minutes),
      AMPMTemplate:string = hour<12?"AM":"PM"
  
      this.date = `${dayOfTheWeekTemplate} ${dayOfTheMonthTemplate}-${monthTemplate}-${yearTemplate} ${hourTemplate}:${minutesTemplate}${AMPMTemplate}`
    }
  }

  ngOnInit(): void {
    setInterval(()=>{
      this.setDate()
    }, 1000)
  }
}
