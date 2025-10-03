let isRuning = false;

self.onmessage = function(event){
    if(isRuning) return

    isRuning = true;

    const state = event.data
    const {activeTask, secondsRemaing} = state

    const endDate = activeTask.startDate + secondsRemaing * 1000;

    function tick(){
        const now = Date.now();
        const countDownSeconds = Math.floor((endDate - now) / 1000)

        self.postMessage(countDownSeconds + 1)

        setTimeout(tick, 1000)
    }

    tick()

}