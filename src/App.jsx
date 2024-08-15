import { useState } from 'react'
import Canvas from './components/Canvas'
import Add from './components/add/Add'
import cardList from './components/cardList';

function App() {
  const [cardList, setCardList] = useState([]);

  const addCard = (newCard) => {
    setCardList([...cardList, newCard]);
  }

  return (
    <>
     <div className="App">
     <Add onAddCard={addCard}/>
     <Canvas cardList={cardList} />
     </div>
    </>
  )
}

export default App
