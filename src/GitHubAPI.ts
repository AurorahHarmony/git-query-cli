import axios, { isAxiosError } from 'axios';

/**
 * Helper class for querying the GitHub API
 */
class GitHubAPI {
  private static baseURL: string = 'https://api.github.com';

  /**
   * Gets the metadata of all open pull requests on a repo.
   * @param repoOwner username of the repo owner.
   * @param repoName name of the repo.
   * @returns {object[]} An array of all open pull requests.
   */
  public static async fetchOpenPullRequests(
    repoOwner: string,
    repoName: string
  ): Promise<object[]> {
    try {
      const response = await axios.get<object[]>(
        `${GitHubAPI.baseURL}/repos/${repoOwner}/${repoName}/pulls`,
        {
          params: {
            state: 'open',
          },
          headers: {
            Accept: 'application/vnd.github+json',
          },
        }
      );

      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response?.status === 404) {
          throw new Error('Repo not found.');
        } else {
          throw new Error(
            err.response?.data.message || 'An unknown error occurred.'
          );
        }
      } else {
        throw new Error('An unknown error occurred.');
      }
    }
  }
}

export default GitHubAPI;
