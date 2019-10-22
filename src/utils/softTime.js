let queueList = [ Promise.resolve() ];

export function setSoftApply (target, method, time) {
  const timePromise = new Promise(resolve => setTimeout(resolve, time));
  const originFun = target[method];
  target[method] = () => {
    timePromise.then(originFun.bind(target));
  };
}

export function addTimeQueue (func, time) {
  const lastPromise = queueList[queueList.length - 1];
  queueList.push(new Promise(resolve => {
    lastPromise.then(() => {
      func.apply(null);
      setTimeout(resolve, time);
    });
  }));
}
