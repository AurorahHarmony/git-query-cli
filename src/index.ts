import InputHandler from './InputHandler';

(async () => {
  const repoOwner = await InputHandler.getInput('Who is the repo owner?');
  const repoName = await InputHandler.getInput('What is the repo name?');

  console.log(`Excellent! Querying ${repoOwner}/${repoName}`);
})();
