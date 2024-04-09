
export default function TestScript() {
  
  const testList = [
    {id: 1, _net: -1000},
    {id: 2, _net: -500},
    {id: 3, _net: -500},
    {id: 4, _net: -100},
    {id: 5, _net: 350},
    {id: 6, _net: 500},
    {id: 7, _net: 1250},
  ]

  let isDone = false;
  let count = 0;
  while(!isDone) {
    var sortedList = testList.sort((a, b) => a._net - b._net)
    const minValue = sortedList[0]._net;
    const maxValue = sortedList[sortedList.length - 1]._net;
    
    sortedList[0] = {...sortedList[0], _net: minValue + maxValue < 0 ? minValue + maxValue : 0}
    sortedList[sortedList.length - 1] = {...sortedList[sortedList.length - 1], _net: minValue + maxValue < 0 ? 0 : minValue + maxValue}
    
    isDone = count >= 100 ? true : false;
    isDone = minValue === 0 && maxValue === 0 ? true : false
    count += 1
    console.log(sortedList, count)
  }
  const outLists = []
  
  return (
    <div className="flex gap-2 justify-center p-4">
      {sortedList?.map(item => <span key={Math.random()}>{`${item._net}, `}</span>)}
    </div>
  )
}
