export function setSoftApply (target, method, time) {
  const timePromise = new Promise(resolve => setTimeout(resolve, time));
  const originFun = target[method];
  target[method] = () => {
    timePromise.then(originFun.bind(target));
  };
}