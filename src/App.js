import {useEffect, useState} from "react";
import './index.scss';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

function Result({correct}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"  alt='alt'/>
      <h2>Вы отгадали {correct} ответа из {questions.length}</h2>
      <button><a href="/">Попробовать снова</a></button>
    </div>
  );
}

function Game({title, variants, currentIndex, nextQ}) {
  return (
    <>
      <div className="progress">
        <div style={{width: (Math.ceil(100*currentIndex/questions.length) + '%' )}} className="progress__inner"/>
      </div>
      <h1>{title}</h1>
      <ul>
        {variants.map((el, index) => {
          return <li onClick={() => nextQ(index)} key={index}>{el}</li>
        })}
      </ul>
    </>
  );
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentQ, setCurrentQ] = useState(questions[currentIndex-1]);
  const [finish, setFinish] = useState(false);
  const [correct, setCorrect] = useState(0);

  const nextQ = (el) => {
    if (currentQ.correct === el) {
      setCorrect(correct + 1);
    }

    currentIndex === questions.length ?
      setFinish(true)
      :
      setCurrentIndex(currentIndex + 1);
      setCurrentQ(questions[currentIndex]);
  }

  return (
    <div className="App">
      {finish ?
        <Result correct={correct}/>
        :
        <Game {...currentQ} nextQ={nextQ} currentIndex={currentIndex}/>
      }
    </div>
  );
}

export default App;
