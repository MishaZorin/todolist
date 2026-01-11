import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// отобржать колво всех имеющихся дел
// при нажаттии на крестик в заголовке выводить "удалена запись номер ..."
function App() {
  // состояние
  const [taskNumber, setTaskNumber] = useState(3)
  const [isUpdating, setIsUpdating] = useState(false)
  const [taskId, setTaskId] = useState(null)
  const [crossOut, setCrossOut] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const [tabs, setTabs] = useState([
    {
      name: "home"
    },
    {
      name: "sport"
    }
  ])
  const [tasks, setTasks] = useState(
    [
      {
        text: 'wash the dishes',
        tab: 0,
        
      },
      {
        text: 'do the vacuuming',
        tab: 0,
      },
      {
        text: 'do homework',
        tab: 0,
      },
      {
        text: 'push ups',
        tab: 1,
      }
    ]
  )
  const [inputValue, setInputValue] = useState('')



  function handleAddButton() {
    setTasks((t) => {
      // howMuch.innerHTML = "Дел:" + (tasks.length + 1)
      // console.log(tasks.length);
      //  спрэд опероатор берет все элементы t (tasks)
      //  t - массив, копируем все его элементы в новый массив, чтобы не модифицировать исходное состояние
      let nextTasks = [...t]
      if (isUpdating == true) {
        nextTasks[taskId].text = inputValue
        setIsUpdating(false)


      }
      else {
        let newTask = { text: inputValue, tab: activeTab }
        nextTasks.push(newTask)

      }



      return nextTasks

    })
  }
function addNewTab(){
  setTabs((tbs)=>{
    let nextTabs = [...tbs]
    let newTab = {name: "new Tab"}
    nextTabs.push(newTab)
    return nextTabs
    
  })
  
  
}
  function clearAllTasks() {
    setTasks(() => {

      let emptyTasks = []
      return emptyTasks

    })
  }
  function rewriteTask(taskNumber) {
    setTaskId(taskNumber)
    setIsUpdating(true)
    setInputValue(tasks[taskNumber].text)




  }
  function deleteTask(taskNumber) {
    setTaskNumber(taskNumber)
    setTasks((t) => {
      let nextTasks = [...t]
      nextTasks.splice(taskNumber, 1)

      // console.log(taskNumber);

      return nextTasks



    })

  }

  return (
    <>

      <div className='center'>
        <div className='app'>
          <h1>📅ToDo List</h1>
          <div>
            <button onClick={()=>addNewTab()}>+</button>
            {tabs.map((tab,id)=>{
              return <button className={activeTab == id ? 'active-tab' : '' } onClick={()=> setActiveTab(id)}>{tab.name}</button>
            })}

          </div>
          <h2>Дел:{tasks.length}</h2>
          <h3>Удалена запись номер:{taskNumber}</h3>
          <form action="">
            <input type="text" placeholder='Добавить задачу!' value={inputValue} onChange={(event) => {
              // возращает тег, в котором произщшло событие

              setInputValue(event.target.value)
            }} />
            <button id='add' type='button' onClick={() => handleAddButton()}>{isUpdating ? 'Update' : 'Add'}</button>
            <button id='clear' type='button' onClick={() => clearAllTasks()}>Clear all</button>
          </form>

          <ul>
            {
              tasks.filter((el)=>el.tab == activeTab).map((task, taskNumber) => {
                return <li className={crossOut == taskNumber ? 'cross-out' : ''} onClick={()=>setCrossOut(taskNumber)}>{task.text}
                  <button onClick={() => deleteTask(taskNumber)}>❌</button>
                  <button onClick={() => rewriteTask(taskNumber)}>✍️</button>
                </li>
              })
            }
          </ul>

        </div>

      </div>


    </>
  )
}
// 1) создать класс с text decor 
export default App
