import { useState, useEffect } from 'react';
import diaryService from './services/diaryService';
import axios from 'axios';

function App() {

  interface Diary {
    id: number;
    date: string;
    weather: "sunny" | "rainy" | "cloudy" | "stormy" | "windy";
    visibility: "great" | "good" | "ok" | "poor";
    comment?: string;
  }

  const [diaries , setDiaries] = useState<Diary []>([])
  const [dates , setDates] = useState('2026-01-01');
  const [weathers , setWeathers] = useState('');
  const [visibilities , setVisibilities] = useState('');
  const [comments , setComments] = useState('');
  const [message , setMessage] = useState('');
  const [notify , setNotify] = useState('');

  
  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries)
    })
  }, [])

  interface ApiErrorItem {
  code: string;
  message: string;
  path: string[];
  [key: string]: unknown;
}

interface ApiErrorResponse {
  error: ApiErrorItem[];
}

const addDiary = async (event: React.SyntheticEvent) => {
  event.preventDefault();
  const newDiary = {
    date: dates,
    weather: weathers,
    visibility: visibilities,
    comment: comments
  }
  try {
    const response = await diaryService.addDiaries(newDiary);
    setDiaries(diaries.concat(response));
    setComments('');
    setDates('');
    setWeathers('');
    setVisibilities('');
    setNotify('Success: New entry added.')
    setTimeout(() => {
      setNotify('')
    }, 5000);
  } catch (error) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      if (error.response?.data.error[0].path[0] === 'weather') {
        setMessage(`Error: Incorrect Weather: ${weathers}`)
        setTimeout(() => {
          setMessage('')
        }, 5000);
      }
      if (error.response?.data.error[0].path[0] === 'date') {
        setMessage(`Error: Incorrect Date: ${dates}`)
        setTimeout(() => {
          setMessage('')
        }, 5000);
      }
      if (error.response?.data.error[0].path[0] === 'visibility') {
        setMessage(`Error: Incorrect Visibility: ${visibilities}`)
        setTimeout(() => {
          setMessage('')
        }, 5000);
      }

} else {
  console.error(error);
}
  }
}

  return (
    <div>
      <h2>Add New Entery</h2>

      {!message && null}
      {message && <h3 style={{color: 'red'}}>{message}</h3>}

      {!notify && null}
      {notify && <h3 style={{color: 'green'}}>{notify}</h3>}

      <form onSubmit={addDiary}>
        <div>
          Date: <input 
         id='date'
         type='date'
         name='date'
         value={dates}
         min='1998-11-21'
         max='2027-01-01'
         onChange={(event) => setDates(event.target.value)}
         />
        </div>
  
        <div>
           
          Weather: <label>sunny  
            <input name='weather' type='radio' value='sunny' checked={weathers === 'sunny'} onChange={(event) => setWeathers(event.target.value)}/>
          </label>
          <label>rainy   
            <input name='weather' type='radio' value='rainy' checked={weathers === 'rainy'} onChange={(event) => setWeathers(event.target.value)}/>
          </label>
          <label>cloudy  
            <input name='weather' type='radio' value='cloudy' checked={weathers === 'cloudy'} onChange={(event) => setWeathers(event.target.value)}/>
          </label>
          <label>stormy   
            <input name='weather' type='radio' value='stormy' checked={weathers === 'stormy'} onChange={(event) => setWeathers(event.target.value)}/>
          </label>
          <label>windy  
            <input name='weather' type='radio' value='windy' checked={weathers === 'windy'} onChange={(event) => setWeathers(event.target.value)}/>
          </label>
          
        </div>
  
        <div>
          
         Visibility: <label>great 
          <input name='visibility' type='radio' value='great' checked={visibilities === 'great'} onChange={(event) => setVisibilities(event.target.value)}/>
         </label>
         <label>good 
          <input name='visibility' type='radio' value='good' checked={visibilities === 'good'} onChange={(event) => setVisibilities(event.target.value)}/>
         </label>
         <label>ok 
          <input name='visibility' type='radio' value='ok' checked={visibilities === 'ok'} onChange={(event) => setVisibilities(event.target.value)}/>
         </label>
         <label>poor 
          <input name='visibility' type='radio' value='poor' checked={visibilities === 'poor'} onChange={(event) => setVisibilities(event.target.value)}/>
         </label>
          
        </div>

        <div>
          Comment(optional): <input id='comment' type='text' placeholder='Comment your thoughts' value={comments} onChange={(event) => setComments(event.target.value)}/>
          
        </div>
 
         <button type='submit'>create</button>
         
      </form>

      <h1>Ilari's Flight Diaries</h1>

      

      {diaries.map(diary => {
        return (
          <div key={diary.id}>
            <h3>Date: {diary.date}</h3>
            <p>Weather: {diary.weather}</p>
            <p>Visibility: {diary.visibility}</p>
            <p>{diary.comment}</p>
          </div>
        )
})}
    </div>

  )
}

export default App
