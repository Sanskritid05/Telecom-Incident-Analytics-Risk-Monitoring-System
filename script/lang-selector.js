document.getElementById("lang-select").addEventListener
("change", function(event) {
    console.log(event);
    console.log (event.target);
    console.log(event.target.value);
    console.log(document.documentElement);
    
let language = event.target.value;
document.documentElement.lang = language;

let heading = document.getElementById("heading");
let text = document.getElementById("text");

if (language === "en"){
    heading.textContent = "Hello Users";
    text.textContent = "Welcome to the World of CSS";
    heading.style.color = "blue";
    text.style.color = "blue";
}
else if(language === "hin"){
    heading.textContent = "नमस्ते उपयोगकर्तागण";
    text.textContent = "सीएसएस की दुनिया में आपका स्वागत है";
    heading.style.color = "red";
    text.style.color = "red";
   }
else if(language === "kan"){
    heading.textContent = "ನಮಸ್ಕಾರ ಬಳಕೆದಾರರು";
    text.textContent = "CSS ಪ್ರಪಂಚಕ್ಕೆ ಸುಸ್ವಾಗತ.";
    heading.style.color = "goldenrod";
    text.style.color = "goldenrod";
    }
else{
    heading.textContent = "안녕하세요 사용자 여러분";
    text.textContent = "CSS 세계에 오신 것을 환영합니다";
    heading.style.color = "green";
    text.style.color = "green";
    
    
}
});