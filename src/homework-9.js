//with keyword
async function testAsync() {
    return 'Hello!'
}
testAsync().then(value => console.log(value))

//with timeout
function testAsyncTimeout() {
    return new Promise(resolve => setTimeout(() => resolve('Hello'), 2000))
}
testAsyncTimeout().then(value => console.log(value))

//with Promise
function testAsyncTwo() {
    return new Promise(resolve => resolve('Hello!'))
}
testAsyncTwo().then(value => console.log(value))

//turn synchronous function into asynchronous
async function testAsyncThree() {
    const result = await testAsyncTimeout()
    return result
}
testAsyncThree().then(value => console.log(value))


function ask(question, yes, no) {
    if (confirm(question)) yes();
    else no();
  }
  
  ask(
    "Ви згодні?",
    function() { alert("Ви погодились."); },
    function() { alert("Ви скасували виконання."); }
  );
