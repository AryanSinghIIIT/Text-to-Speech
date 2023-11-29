import React, {useState, useEffect} from 'react';
import useSpeechSynthesis from './useSpeechSynthesis';
import axios from 'axios';


const SpeechApp = () => {

    const [data,setData] = useState([]);
    const[currentSentence,setCurrentSentence] = useState('');
    const {isPlaying, toggleSpeech} = useSpeechSynthesis(currentSentence);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                const output = response.data.map(user => ({name:user.name, email:user.email}));
                setData(output);

            }catch(error) {
                console.error('Error Fetching data:', error);
            }
        };
            fetchData();
    }, []);

    const handleSentenceClick = (sentence) => {
        setCurrentSentence(sentence);
        toggleSpeech();
    };
    return (
        <div>
          <h1>Text to Speech App</h1>
          <ul>
            {data.map((user, ind) => (
              <li key={ind} onClick={() => handleSentenceClick(`${user.name} - ${user.email}`)}>
                {`${user.name} - ${user.email}`}
              </li>
            ))}
          </ul>
          <button onClick={toggleSpeech}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
      );
      

};

export default SpeechApp;