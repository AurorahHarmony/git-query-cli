import GitHubAPI from './GitHubAPI';
import InputHandler from './InputHandler';
import fs from 'fs';

class MultitudesCLI {
  /**
   * Starts the CLI
   */
  public static async run() {
    MultitudesCLI.printLogos();

    console.log('Welcome to Multitudes CLI! Let’s process some Github Data!');

    // Ask for the repo owner name.
    const repoOwner = await InputHandler.getValidatedInput(
      'Who is the repo owner? (e.g., microsoft)',
      { minLength: 1 }
    );

    // Ask for the name of the repo.
    let repoName = await InputHandler.getValidatedInput(
      'What is the repo name? (e.g., typescript)',
      { minLength: 1 }
    );

    console.log(`Excellent! Querying ${repoOwner}/${repoName}.`);

    try {
      const pullRequests = await GitHubAPI.fetchOpenPullRequests(
        repoOwner,
        repoName
      );
      console.log(
        `There are ${pullRequests.length} open pull requests in ${repoOwner}/${repoName}`
      );
    } catch (err: any) {
      console.error(err.message);
    }
  }

  /**
   * Print out the ASCII art logos
   */
  private static printLogos(): void {
    try {
      const asciiAury = fs.readFileSync('./assets/asciiaury.ans', 'utf8');
      console.log(asciiAury);
      const itGitsYou = fs.readFileSync('./assets/itgitsyou.ans', 'utf8');
      console.log(itGitsYou);
    } catch (err) {
      // We don't mind if these fail to load.
    }
  }
}

export default MultitudesCLI;
