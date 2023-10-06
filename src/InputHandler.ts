import readline from 'readline';

/**
 * Helper class to read user input from stdin
 */
class InputHandler {
  /**
   * Create a new readline instance.
   * @returns {readline.Interface} readline instance.
   */
  private static createReader(): readline.Interface {
    return readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  /**
   * Prompt the user to input a string.
   *
   * @param {string} prompt The prompt to display to the user.
   * @returns {Promise<string>} A promise that resolves with the user's input.
   */
  public static getInput(prompt: string): Promise<string> {
    const reader = this.createReader();

    return new Promise((resolve) => {
      reader.question(prompt + ' ', (answer) => {
        resolve(answer);
        reader.close();
      });
    });
  }
}

export default InputHandler;
