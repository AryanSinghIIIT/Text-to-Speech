import { useEffect,useState } from "react"; 

const useSpeechSynthesis = (text,ssml) => {

    const[isPlaying, setIsPlaying] = useState(false);
    const[speech, setSpeech] = useState(false);

        useEffect(() =>{

            if(!window.speechSynthesis){
                console.error('Speech synthesis noit supported');
                return;
            }

            const utterance = new SpeechSynthesisUtterance();

            utterance.text = text;
            if(ssml) {
                utterance.ssml = ssml;
            }

     setSpeech(utterance);
 
    },[text,ssml]);

    useEffect(() => {


        if(speech){
            if(isPlaying) {
                window.speechSynthesis.speak(speech);
            }else {
                window.speechSynthesis.cancel();
            }
        }
    },[isPlaying,speech]);

    const toggleSpeech = () => {
        setIsPlaying(!isPlaying);
    }

    return{
        isPlaying,
        toggleSpeech,
    }

}

export default  useSpeechSynthesis;
