const input = document.querySelector("#city");
const button = document.querySelector("#submit");
const weatherBox = document.querySelector("#weatherBox");

const API_KEY = "";

button.addEventListener("click", async () => {
  //input의 값을 가져와서 도시이름으로 url에 넣는다.
  const city = input.value;

  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    /*console.log(res);*/

    //res에서 원하는 값 가져오기
    const { main, description, icon } = res.data.weather[0];
    const temp = Math.round(res.data.main.temp - 273.15);
    const name = res.data.name;
    const max_temp = Math.round(res.data.main.temp_max - 273.15);
    const min_temp = Math.round(res.data.main.temp_min - 273.15);

    //사용자에게 보여주기
    weatherBox.innerHTML = `
      <div class="name">도시 이름: ${name}</div>
      <img class="icon" src="http://openweathermap.org/img/w/${icon}.png">
      <div class="main">현재 날씨: ${main}</div>
      <div class="description">날씨 설명: ${description}</div>
      <div class="temp">현재 온도: ${temp}°C</div>
      <div class="max_t">최고 온도: ${max_temp}°C</div>
      <div class="max_t">최소 온도: ${min_temp}°C</div>
    `;
  } catch (error) {
    console.log(error);
  }
});
/*여기서 lon과 lat에 해당하는 도시들 날씨 확인하기*/ 
const input1 = document.querySelector("#lat");
const input2 = document.querySelector('#lon')
const insert = document.querySelector("#insert");
const weatherBox2 = document.querySelector("#weatherBox2");
const weatherBox3 = document.querySelector("#weatherBox3");

insert.addEventListener("click", async () => {
  //input의 값을 가져와서 도시이름으로 url에 넣는다.
  const lat = input1.value;
  const lon = input2.value;

  try {
    const res2 = await axios.get(
      `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=${2}&appid=${API_KEY}`
    );
    
    const name2 = res2.data.list[0].name;
    const main2= res2.data.list[0].weather[0].main;
    const temp2 = Math.round(res2.data.list[0].main.temp - 273.15);
    weatherBox2.innerHTML = `
      <div class="name">도시 이름: ${name2}</div>
      <div class="main">현재 날씨: ${main2}</div>
      <div class="temp">현재 온도: ${temp2}°C</div>
    `;
    const name1 = res2.data.list[1].name;
    const main1= res2.data.list[1].weather[0].main;
    const temp1 = Math.round(res2.data.list[1].main.temp - 273.15);
    weatherBox3.innerHTML = `
      <div class="name">도시 이름: ${name1}</div>
      <div class="main">현재 날씨: ${main1}</div>
      <div class="temp">현재 온도: ${temp1}°C</div>
    `;
    

  } catch (error) {
    console.log(error);
  }
});