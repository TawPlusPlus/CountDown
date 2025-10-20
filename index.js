
const months = [
    "January", "February", "March", "April","May","June","July","August","September","October","November","December"
    ]
    
const days = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const time = document.querySelectorAll(".time")
const promotion_deadline = document.querySelector(".promotion-date")
const counter_disp = document.querySelector(".counter")

/* const date = new Date(year,month,day,hour,minute,second)
   using the new date constructor we can create a new instance of the date by
   passing these integer value arguments representing different dimensions of time.
   For month its zero indexed, so the value of 1 ctually refers to Feb not January. Same is 
   applicable for the .getDay() getter it returns zero indexed values with Sunday being at zero

*/
let tempDate = []
const give_away_date = new Date(2025,8,23,15,39,10)



/* Now to get these values ie the date year and others we use the .get methods. But since these getters return number 
values, and in our text we need the month names and day names we need to create a months and days array which we can then index
to get the values*/

const year = give_away_date.getFullYear()
const month = months[give_away_date.getMonth()]
const hour = give_away_date.getHours()
const minutes = give_away_date.getMinutes()
const seconds = give_away_date.getSeconds()
const date = give_away_date.getDate()
const day = days[give_away_date.getDay()]

promotion_deadline.textContent = `Promotion Ends On ${day} ${date} ${month} ${year} at ${hour}:${minutes}`

/* So now to work on our count down. Firstly we need to reduce our date to the lowest possible common denominator such that we can 
make the distinction between the two. For example theres not much info we can get in term of getting the difference of the seconds or hours if 
only we took the difference between the days or months or year etc, however we can get the differences of the other top values if we reduce the 
entire date to the lowest possible unit which in our case will be milliseconds. Get the milliseconds for the current date and the milliseconds for the
future date. And then from here convert the milliseconds to seconds, minutes, hours and days etc */


const future_time = give_away_date.getTime() //The get time returns any date in milliseconds 


function getRemainingTime(){

    const current_time = new Date().getTime()
    const timeLeft = future_time - current_time // This will return time dfference in ms
    /*So now that we have our time reduced to ms, we can the from this value firstly get hours by using the 
    logic that a day has so and so number of ms*/

    
    const oneDay = 24*60*60*1000
    const oneHour = 60*60*1000
    const oneMinute = 60*1000 
 
     const days_left = Math.floor(timeLeft/oneDay)
     const hours_left = Math.floor((timeLeft%oneDay) / oneHour)
     const minutes_left = Math.floor((timeLeft%oneHour) / oneMinute)
     const seconds_left = Math.floor((timeLeft%oneMinute) /1000)
 
     const values  = [days_left, hours_left,minutes_left,seconds_left]
     const cat = ["Days", "Hours", "Minutes", "Seconds"]
    

    function format(item){
        if(item < 10){
            return item = `0${item}`
        }
        return item
    }
     time.forEach((value,index)=>{
        value.innerHTML = `<h2>${format(values[index])}<span>${cat[index]}</span></h2>`
     })
     console.log(values)

     if(timeLeft<0){
        clearInterval(countDown)
        counter_disp.innerHTML = `<h1>Sorry But This Offer Has Expired</h1>`

     }
}



/*Now our function works perfectly however you cant really see the time changes unless we reload page. So since our time changes by the second
we can set a setinterval such that the function is called every second*/

let countDown = setInterval(getRemainingTime,1000)
getRemainingTime()

const test = document.querySelector(".test")


