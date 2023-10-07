import GitHubAPI from './GitHubAPI';
import InputHandler from './InputHandler';

class MultitudesCLI {
  /**
   * Starts the CLI
   */
  public static async run() {
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
}

export default MultitudesCLI;
