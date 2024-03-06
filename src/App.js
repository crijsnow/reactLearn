import {createContext, useContext, useEffect, useRef, useState} from 'react'

import './styles/app.css'
import {useToggle} from './useFunction/useToggle'


const baseURL='http://geek.itheima.net/v1_0/channels'
const Context1=createContext()
const list=[{id:1,name:'水晶'},{id:2,name:'黑曜石'},{id:3,name:'绿柱石'}]
const flag=false
const loading=true

//通过外部其他函数来实现复杂条件渲染
const mapnumber=1
const map={
  0:()=><div>这是0的情况</div>,
  1:()=><div>这是1的情况</div>,
  2:()=><div>这是2的情况</div>
}
//点击事件函数
const click=(name,e)=>{
  console.log('触发点击事件',e.clientX,e.clientY,name);
}
//子组件
function Lalala(props){
  return (
    <div className='block1'>这里是子组件lalala{props.set}
      <div>{props.children}</div>
    </div>
  )
}
//兄弟通讯
function A(props){
  const [atr_1,setAtr_1]=useState(0)
  const set=(value)=>{
    setAtr_1(value)
    props.onGet(value)
  }
  return (
    <div className='block1'>
      <input value={atr_1} onInput={(e)=>set(e.target.value)}></input>
    </div>
    )
  }
function B(props){
  const atr_2=props.onSet
  const text=useContext(Context1)
  console.log(props);
  return (
    <div className='block1'>
      <div>{atr_2} {text}</div>
    </div>
  )
}
  
function App() {
  const [atr_main,setAtr_main]=useState(0)
  const [count,setState]=useState(0)
  //v-model
  const [text,setext]=useState('')
  const testref=useRef(null)
  const showRef=()=>{
    console.log(testref);
  }
  //测试useEffect
  const [list1,setList1]=useState([])
  useEffect(()=>{
    const getlist=async()=>{
      const res=await fetch(baseURL)
      const json=await res.json()
      setList1(json.data.channels)
    }
    if(!list1.length){
      getlist()
    }
  })

  const changelist1=()=>{
    const new_list=list1.filter(ele=>ele.id>20)
    setList1(new_list)
  }
  const {value,toggle}=useToggle()

  return (
    <div >
     {/* 使用引号表示字符串 */
      'test'
     }
     <ul>
      {/* 测试ul/li和map */}
        {list.map(item=><li key={item.id}>{item.name}</li>)}
      </ul>
      <span>{/* 测试条件渲染 */} {flag && <span>使用flag和&&的条件渲染</span>}
        {loading ?<span>使用？：的条件渲染</span>:<span>失败</span>}
      </span>
      {/* 测试复杂条件渲染,别忘了调用*/}
      {map[mapnumber]()}
      <button onClick={(e)=>click('测试用传值',e)} >点击事件</button>
      <button onClick={()=>setState(count+1)} >{count}</button>
      {/*v-model*/}
      <br></br>
      <input value={text} onInput={(e)=>setext(e.target.value)}></input>
      <div ref={testref}>text:{text}</div>
      <button onClick={showRef}>showRef</button>
      <Lalala set={text}><span>测试类插槽</span></Lalala>
      {/* 兄弟通讯 */}
      <Context1.Provider value={text}>
        <A onGet={setAtr_main}></A>
        <B onSet={atr_main}></B>
      </Context1.Provider>
      <button onClick={toggle}>toggle</button>
      { value && <div>
          <ul>
            {list1.map(ele=><li key={ele.id}>{ele.name}</li>)}
          </ul>
          <button onClick={changelist1}>change-list1</button>
        </div>
      }
    </div>
  );
}

export default App;
