// ==UserScript==
// @name         LstSim TTS
// @namespace    http://tampermonkey.net/
// @version      2025-07-25
// @description  Spricht Funksprüche in LstSim verbal aus
// @author       Crazycake
// @match        https://lstsim.de/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lstsim.de
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const voices = window.speechSynthesis.getVoices();
    function speak(tts){
    let msg = new SpeechSynthesisUtterance();
        msg.lang= "de";
        msg.text = tts;
        msg.rate = 1.5;
        msg.pitch =Math.floor(Math.random() * 11);
        msg.voice = voices[Math.floor(Math.random() * voices.length)];
        window.speechSynthesis.speak(msg);
    }
    function callback(e){
        for(let mutation of e){
            if(mutation.target instanceof HTMLSpanElement && mutation.target.classList.contains("text") && !mutation.target.classList.contains("nonverbal")){
                speak(mutation.target.innerText);
               }
        }
    }
    const targetNode = document.querySelector("#logpanel .logitems");

    const config = { attributes: false, childList: true, subtree: true };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
})();
