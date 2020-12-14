const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&APPID=d9982eef08bfbc7da6291195b5d5ce11';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const zipCode =  document.getElementById('zip').value;
const feel =  document.getElementById('feelings').value;
let d = new Date();
const myDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();

if (!zipCode){
  alert('Enter zip code');
}else{
getData(baseURL,zipCode, apiKey)

.then ((data) => {
    postData('/add', {date:myDate, temp:data.main.temp, feel})
})

.then(
updateUI()
)
}
}
const getData = async (baseURL, zipCode, key)=>{

  const request = await fetch(baseURL+zipCode+apiKey)
  try {

    const data = await request.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

const postData = async (url = '', allData = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },       
      body: JSON.stringify(allData), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  };

  const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const finalData = await request.json();
      console.log(finalData);
      document.getElementById('date').innerHTML = finalData.date;
      document.getElementById('temp').innerHTML = finalData.temp;
      document.getElementById('content').innerHTML = finalData.feel;

    }catch(error){
      console.log("error", error);
    }
  }