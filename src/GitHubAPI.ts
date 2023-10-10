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
    const pullRequests: object[] = [];

    let page = 1;
    const perPage = 100;
    while (true) {
      try {
        const response = await axios.get<object[]>(
          `${GitHubAPI.baseURL}/repos/${repoOwner}/${repoName}/pulls`,
          {
            params: {
              state: 'open',
              page: page,
              per_page: perPage,
            },
            headers: {
              Accept: 'application/vnd.github+json',
            },
          }
        );

        pullRequests.push(...response.data);

        if (response.data.length < perPage) {
          // There are no more pages
          break;
        }

        page++;
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

    return pullRequests;
  }
}

export default GitHubAPI;
