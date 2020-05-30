const sleep = (delay) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

const asyncGenerator =  async function* () {
  let i = 0;
  while (i < 10) {
    await sleep(1000);
    yield i++;
  }
};

const run = async () => {
  console.log("start");
  for await (s of asyncGenerator()) {
    console.log("snore", s);
  }
  console.log("stop");
};

run();
